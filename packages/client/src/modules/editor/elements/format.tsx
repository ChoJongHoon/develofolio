import OpenColor from 'open-color'
import { Editor, Text, Transforms } from 'slate'
import { RenderLeafProps } from 'slate-react'
import { useStyletron } from 'styletron-react'
import { CustomText, LeafFormat } from '~/modules/editor/custom-types'

export const toggleFormat = (editor: Editor, format: LeafFormat) => {
	const isActive = isFormatActive(editor, format)
	Transforms.setNodes(
		editor,
		{ [format]: isActive ? null : true },
		{ match: Text.isText, split: true }
	)
}

export const isFormatActive = (editor: Editor, format: keyof CustomText) => {
	const [match] = Editor.nodes(editor, {
		match: (n) => Text.isText(n) && n[format] === true,
		mode: 'all',
	})
	return Boolean(match)
}

export const getSelectedText = (editor: Editor) => {
	const [match] = Editor.nodes<CustomText>(editor, {
		match: (n) => Text.isText(n),
		mode: 'all',
	})

	return match ? match[0] : undefined
}

export const CustomLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
	const [css] = useStyletron()
	if (leaf.bold) children = <strong>{children}</strong>
	if (leaf.italic) children = <em>{children}</em>
	if (leaf.code) children = <code>{children}</code>
	if (leaf.color)
		children = (
			<span
				className={css({
					color: OpenColor[leaf.color][6],
				})}
			>
				{children}
			</span>
		)
	if (leaf.highlight) {
		children = (
			<span
				className={css({
					backgroundColor: OpenColor[leaf.highlight][6],
				})}
			>
				{children}
			</span>
		)
	}
	if (leaf.link) {
		children = (
			<a
				href={leaf.link}
				target="_blank"
				rel="noreferrer"
				className={css({
					cursor: 'pointer',
					color: OpenColor.gray[7],
				})}
			>
				{children}
			</a>
		)
	}

	return <span {...attributes}>{children}</span>
}

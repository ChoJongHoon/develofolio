import OpenColor from 'open-color'
import { RenderLeafProps } from 'slate-react'
import { useStyletron } from 'styletron-react'

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

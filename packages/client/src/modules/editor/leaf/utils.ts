import { Editor, Text, Transforms } from 'slate'
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

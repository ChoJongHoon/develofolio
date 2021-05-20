import { Editor } from 'slate'

export const withLogo = (editor: Editor) => {
	const { isInline, isVoid } = editor

	editor.isInline = (element) =>
		element.type === 'logo' ? true : isInline(element)

	editor.isVoid = (element) =>
		element.type === 'logo' ? true : isVoid(element)

	return editor
}

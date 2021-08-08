import { Editor, Transforms } from 'slate'
import { generateParagraphElement } from './elements/paragraph'

export const withEditor = (editor: Editor) => {
	const { normalizeNode } = editor

	editor.normalizeNode = (entry) => {
		const lastBlock = editor.children[editor.children.length - 1]

		if (Editor.isBlock(editor, lastBlock) && lastBlock.type !== 'paragraph') {
			Transforms.insertNodes(editor, generateParagraphElement(), {
				at: [editor.children.length],
			})
		}

		normalizeNode(entry)
	}

	return editor
}

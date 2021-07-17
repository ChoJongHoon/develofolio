import { Editor, Path, Transforms } from 'slate'
import { EMPTY_PARAGRAPH } from './elements/paragraph'

export const withEditor = (editor: Editor) => {
	const { normalizeNode } = editor

	editor.normalizeNode = (entry) => {
		const lastBlock = editor.children[editor.children.length - 1]

		if (Editor.isBlock(editor, lastBlock) && lastBlock.type !== 'paragraph') {
			Transforms.insertNodes(editor, EMPTY_PARAGRAPH, {
				at: [editor.children.length],
			})
		}

		normalizeNode(entry)
	}

	return editor
}

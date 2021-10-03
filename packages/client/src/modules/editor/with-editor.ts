import { cloneDeep, defaults } from 'lodash'
import { nanoid } from 'nanoid'
import { Editor, Transforms } from 'slate'
import { generateParagraphElement } from './elements/paragraph'
import { someNode } from './utils/some-node'

export const withEditor = (editor: Editor) => {
	const { normalizeNode, apply } = editor

	editor.normalizeNode = (entry) => {
		const lastBlock = editor.children[editor.children.length - 1]

		// 마지막 블럭은 항상 paragraph 로 설정
		if (Editor.isBlock(editor, lastBlock) && lastBlock.type !== 'paragraph') {
			Transforms.insertNodes(editor, generateParagraphElement(), {
				at: [editor.children.length],
			})
			return
		}

		normalizeNode(entry)
	}

	editor.apply = (operation) => {
		if (operation.type === 'insert_node') {
			// clone to be able to write (read-only)
			const node = cloneDeep(operation.node)

			defaults(node, { id: nanoid() })

			return apply({
				...operation,
				node,
			})
		}

		if (operation.type === 'split_node') {
			const node = operation.properties

			let id = 'id' in node ? node.id : undefined

			/**
			 * Create a new id if:
			 * - the id in the new node is already being used in the editor or,
			 * - the node has no id
			 */
			if (
				id === undefined ||
				someNode(editor, {
					match: (n) => Editor.isBlock(editor, n) && n.id === id,
					at: [],
				})
			) {
				id = nanoid()
			}

			return apply({
				...operation,
				properties: {
					...operation.properties,
					id,
				},
			})
		}

		return apply(operation)
	}

	return editor
}

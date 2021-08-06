import cloneDeep from 'lodash/cloneDeep'
import { Editor } from 'slate'
import { nanoid } from 'nanoid'
import { someNode } from '../utils/some-node'
import { defaults } from 'lodash'

/**
 * Enables support for inserting nodes with an id key.
 */
export const withNodeId = (editor: Editor) => {
	const { apply } = editor

	const idPropsCreator = () => ({ key: nanoid() })

	editor.apply = (operation) => {
		if (operation.type === 'insert_node') {
			// clone to be able to write (read-only)
			const node = cloneDeep(operation.node)

			defaults(node, idPropsCreator())

			return apply({
				...operation,
				node,
			})
		}

		if (operation.type === 'split_node') {
			const node = operation.properties

			let id = 'key' in node ? node.key : undefined

			/**
			 * Create a new id if:
			 * - the id in the new node is already being used in the editor or,
			 * - the node has no id
			 */
			if (
				id === undefined ||
				someNode(editor, {
					match: (n) => Editor.isBlock(editor, n) && n.key === id,
					at: [],
				})
			) {
				id = nanoid()
			}

			return apply({
				...operation,
				properties: {
					...operation.properties,
					key: id,
				},
			})
		}

		return apply(operation)
	}

	return editor
}

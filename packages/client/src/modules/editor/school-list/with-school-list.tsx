import { Descendant, Editor, Element, Point, Range, Transforms } from 'slate'
import { CustomElement } from '../custom-types'

export const withSchoolList = (editor: Editor) => {
	const { insertBreak, deleteBackward, normalizeNode } = editor

	editor.normalizeNode = ([node, path]) => {
		if (Editor.isBlock(editor, node)) {
			if (node.type === 'school-list') {
				if (
					node.children.length === 0 ||
					node.children.findIndex(
						(child) => child.type !== 'school-list-item'
					) !== -1
				) {
					Transforms.removeNodes(editor, { at: path })
				}
			}
			if (node.type === 'school-list-item') {
				if (
					node.children.length !== 3 ||
					node.children[0].type !== 'school-list-item-name' ||
					node.children[1].type !== 'school-list-item-description' ||
					node.children[2].type !== 'school-list-item-period'
				) {
					Transforms.removeNodes(editor, { at: path })
				}
			}
		}

		normalizeNode([node, path])
	}

	editor.deleteBackward = (...args) => {
		const { selection } = editor

		if (selection && Range.isCollapsed(selection)) {
			const match = Editor.above<CustomElement>(editor, {
				match: (n) => Editor.isBlock(editor, n),
			})

			if (match) {
				const [block, path] = match
				const start = Editor.start(editor, path)

				if (
					Point.equals(selection.anchor, start) &&
					(block.type === 'school-list-item-name' ||
						block.type === 'school-list-item-description' ||
						block.type === 'school-list-item-period')
				) {
					return
				}
			}

			deleteBackward(...args)
		}
	}

	/**
	 * Enter키 누르면 다음 줄로 이동
	 */
	editor.insertBreak = () => {
		const { selection } = editor

		if (selection) {
			const match = Editor.above(editor, {
				match: (n) =>
					Editor.isBlock(editor, n) && n.type === 'school-list-item',
			})

			if (match) {
				Transforms.move(editor, { distance: 1, unit: 'line' })
				return
			}
		}

		insertBreak()
	}
	return editor
}

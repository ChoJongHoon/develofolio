import { Editor, Node, Point, Range, Text, Transforms } from 'slate'
import { CustomElement } from '../custom-types'
import { generateSchoolListItemMajorElement } from './school-list-item-major'
import { generateSchoolListItemNameElement } from './school-list-item-name'

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
					return
				}
			}
			if (node.type === 'school-list-item') {
				// name 이 없으면 추가
				if (node.children.length < 1) {
					Transforms.insertNodes(editor, generateSchoolListItemNameElement(), {
						at: [...path, 0],
					})
					return
				}
				// name 이 아니면 name 으로 수정
				if (node.children[0].type !== 'school-list-item-name') {
					Transforms.setNodes(
						editor,
						{ type: 'school-list-item-name' },
						{ at: [...path, 0] }
					)
					return
				}

				// major 가 없으면 추가
				if (node.children.length < 2) {
					Transforms.insertNodes(editor, generateSchoolListItemMajorElement(), {
						at: [...path, 1],
					})
					return
				}
				// major 가 아니면 major 로 수정
				if (node.children[1].type !== 'school-list-item-major') {
					Transforms.setNodes(
						editor,
						{ type: 'school-list-item-major' },
						{ at: [...path, 1] }
					)
					return
				}

				// period 가 없으면 추가
				if (node.children.length < 3) {
					Transforms.insertNodes(editor, generateSchoolListItemMajorElement(), {
						at: [...path, 2],
					})
					return
				}
				// major 가 아니면 major 로 수정
				if (node.children[2].type !== 'school-list-item-period') {
					Transforms.setNodes(
						editor,
						{ type: 'school-list-item-period' },
						{ at: [...path, 2] }
					)
					return
				}
				// children 이 3개 초과로 생기지 않도록 방지
				if (node.children.length > 3) {
					Transforms.mergeNodes(editor, {
						at: [...path, 3],
					})
					return
				}
			}

			// children 에는 텍스트만 허용
			if (
				node.type === 'school-list-item-name' ||
				node.type === 'school-list-item-major' ||
				node.type === 'school-list-item-period'
			) {
				for (const [child, childPath] of Node.children(editor, path)) {
					if (!Text.isText(child)) {
						Transforms.unwrapNodes(editor, { at: childPath })
						return
					}
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
						block.type === 'school-list-item-major' ||
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

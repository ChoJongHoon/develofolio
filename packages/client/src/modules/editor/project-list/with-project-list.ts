import { Editor, Element, Node, Point, Range, Text, Transforms } from 'slate'
import { CustomElement } from '../custom-types'
import { generateProjectListItemDescriptionElement } from './project-list-item-description'
import { generateProjectListItemNameElement } from './project-list-item-name'

const PROJECT_LIST_CHILD_TYPES: CustomElement['type'][] = [
	'project-list-item-name',
	'project-list-item-description',
]

export const withProjectList = (editor: Editor) => {
	const { deleteBackward, insertBreak, normalizeNode } = editor

	editor.normalizeNode = (entry) => {
		const [node, path] = entry
		if (Editor.isBlock(editor, node)) {
			if (node.type === 'project-list-item') {
				// name 이 없으면 추가
				if (node.children.length < 1) {
					Transforms.insertNodes(editor, generateProjectListItemNameElement(), {
						at: [...path, 0],
					})
					return
				}
				// name 이 아니면 name 으로 수정
				if (node.children[0].type !== 'project-list-item-name') {
					Transforms.setNodes(
						editor,
						{ type: 'project-list-item-name' },
						{ at: [...path, 0] }
					)
					return
				}

				// description 이 없으면 추가
				if (node.children.length < 2) {
					Transforms.insertNodes(
						editor,
						generateProjectListItemDescriptionElement(),
						{
							at: [...path, 1],
						}
					)
					return
				}
				// description 이 아니면 description 으로 수정
				if (node.children[1].type !== 'project-list-item-description') {
					Transforms.setNodes(
						editor,
						{ type: 'project-list-item-name' },
						{ at: [...path, 1] }
					)
					return
				}
				// children 이 2개 초과로 생기지 않도록 방지
				if (node.children.length > 2) {
					Transforms.mergeNodes(editor, {
						at: [...path, 2],
					})
					return
				}
			}

			// children 에는 텍스트만 허용
			if (
				node.type === 'project-list-item-name' ||
				node.type === 'project-list-item-description'
			) {
				for (const [child, childPath] of Node.children(editor, path)) {
					if (!Text.isText(child)) {
						Transforms.unwrapNodes(editor, { at: childPath })
						return
					}
				}
			}
		}

		normalizeNode(entry)
	}

	/**
	 * 블럭안 child 블럭은 삭제 불가능
	 */
	editor.deleteBackward = (...args) => {
		const { selection } = editor

		if (selection && Range.isCollapsed(selection)) {
			const match = Editor.above(editor, {
				match: (n) => Editor.isBlock(editor, n),
			})

			if (match) {
				const [block, path] = match
				const start = Editor.start(editor, path)

				if (
					!Editor.isEditor(block) &&
					Element.isElement(block) &&
					Point.equals(selection.anchor, start) &&
					PROJECT_LIST_CHILD_TYPES.includes(block.type)
				) {
					return
				}
			}
		}

		deleteBackward(...args)
	}

	/**
	 * 블럭 안쪽에서 Enter키 누르면 다음 줄로 이동
	 */
	editor.insertBreak = () => {
		const { selection } = editor
		if (selection) {
			const match = Editor.above(editor, {
				match: (n) => {
					return Editor.isBlock(editor, n)
				},
			})
			if (match) {
				const [block] = match
				if (Editor.isBlock(editor, block)) {
					if (
						block.type === 'project-list-item-name' ||
						block.type === 'project-list-item-description'
					) {
						Transforms.move(editor, { distance: 1, unit: 'line' })
						return
					}
				}
			}
		}

		insertBreak()
	}

	return editor
}

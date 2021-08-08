import { Editor, Element, Point, Range, Transforms } from 'slate'
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
		const [block, path] = entry
		if (Editor.isBlock(editor, block)) {
			if (block.type === 'project-list-item') {
				if (block.children.length < 1) {
					Transforms.insertNodes(editor, generateProjectListItemNameElement(), {
						at: [...path, 0],
					})
				} else if (block.children[0].type !== 'project-list-item-name') {
					Transforms.setNodes(
						editor,
						{ type: 'project-list-item-name' },
						{ at: [...path, 0] }
					)
				}
				if (block.children.length < 2) {
					Transforms.insertNodes(
						editor,
						generateProjectListItemDescriptionElement(),
						{
							at: [...path, 1],
						}
					)
				} else if (block.children[1].type !== 'project-list-item-description') {
					Transforms.setNodes(
						editor,
						{ type: 'project-list-item-name' },
						{ at: [...path, 1] }
					)
				}
			}
			if (PROJECT_LIST_CHILD_TYPES.includes(block.type)) {
				if (path.length !== 3) {
					Transforms.setNodes(
						editor,
						{ type: 'paragraph' },
						{
							match: (n) => Editor.isBlock(editor, n),
						}
					)
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

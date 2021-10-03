import { Editor, Node, Point, Range, Text, Transforms } from 'slate'
import { CustomElement } from '../custom-types'

export const withCareerList = (editor: Editor) => {
	const { insertBreak, deleteBackward, normalizeNode } = editor

	editor.normalizeNode = ([node, path]) => {
		if (Editor.isBlock(editor, node)) {
			if (node.type === 'career-list') {
				// 경력 사항이 하나도 없으면 리스트 삭제
				if (
					node.children.length === 0 ||
					node.children.findIndex(
						(child) => child.type !== 'career-list-item'
					) !== -1
				) {
					Transforms.removeNodes(editor, { at: path })
					return
				}
			}
			if (node.type === 'career-list-item') {
				if (
					node.children.length !== 4 ||
					node.children[0].type !== 'career-list-item-name' ||
					node.children[1].type !== 'career-list-item-position' ||
					node.children[2].type !== 'career-list-item-period' ||
					node.children[3].type !== 'career-list-item-description'
				) {
					Transforms.removeNodes(editor, { at: path })
					return
				}
			}

			// children 에는 텍스트만 허용
			if (
				node.type === 'career-list-item-name' ||
				node.type === 'career-list-item-position' ||
				node.type === 'career-list-item-period' ||
				node.type === 'career-list-item-description'
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
					(block.type === 'career-list-item-name' ||
						block.type === 'career-list-item-position' ||
						block.type === 'career-list-item-period' ||
						block.type === 'career-list-item-description')
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
				match: (n) => Editor.isBlock(editor, n),
			})

			if (match) {
				const [block] = match
				if (Editor.isBlock(editor, block)) {
					if (
						block.type === 'career-list-item-name' ||
						block.type === 'career-list-item-position' ||
						block.type === 'career-list-item-period'
					) {
						Transforms.move(editor, { distance: 1, unit: 'line' })
						return
					} else if (block.type === 'career-list-item-description') {
						Transforms.insertText(editor, '\n')
						return
					}
				}
			}
		}

		insertBreak()
	}

	return editor
}

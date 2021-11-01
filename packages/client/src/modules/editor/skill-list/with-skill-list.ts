import { Editor, Node, Text, Transforms } from 'slate'
import { generateSkillListItemDescriptionElement } from './skill-list-item-description'
import { generateSkillListItemLogosElement } from './skill-list-item-logos'
import { generateSkillListItemNameElement } from './skill-list-item-name'

export const withSkillList = (editor: Editor) => {
	const { isVoid, insertBreak, normalizeNode } = editor

	editor.normalizeNode = ([node, path]) => {
		if (Editor.isBlock(editor, node)) {
			if (node.type === 'skill-list') {
				if (
					node.children.length === 0 ||
					node.children.findIndex(
						(child) => child.type !== 'skill-list-item'
					) !== -1
				) {
					Transforms.removeNodes(editor, { at: path })
					return
				}
			}
			if (node.type === 'skill-list-item') {
				// logos 이 없으면 추가
				if (node.children.length < 1) {
					Transforms.insertNodes(editor, generateSkillListItemLogosElement(), {
						at: [...path, 0],
					})
					return
				}
				// name 이 아니면 name 으로 수정
				if (node.children[0].type !== 'skill-list-item-logos') {
					Transforms.setNodes(editor, generateSkillListItemLogosElement(), {
						at: [...path, 0],
					})
					return
				}

				// name 이 없으면 추가
				if (node.children.length < 2) {
					Transforms.insertNodes(editor, generateSkillListItemNameElement(), {
						at: [...path, 1],
					})
					return
				}
				// major 가 아니면 major 로 수정
				if (node.children[1].type !== 'skill-list-item-name') {
					Transforms.setNodes(editor, generateSkillListItemNameElement(), {
						at: [...path, 1],
					})
					return
				}

				// description 이 없으면 추가
				if (node.children.length < 3) {
					Transforms.insertNodes(
						editor,
						generateSkillListItemDescriptionElement(),
						{
							at: [...path, 2],
						}
					)
					return
				}
				// description 이 아니면 description 으로 수정
				if (node.children[2].type !== 'skill-list-item-description') {
					Transforms.setNodes(
						editor,
						generateSkillListItemDescriptionElement(),
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
				node.type === 'skill-list-item-name' ||
				node.type === 'skill-list-item-description'
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

	editor.isVoid = (node) => {
		if (node.type === 'skill-list-item-logos') {
			return true
		}

		return isVoid(node)
	}

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
					if (block.type === 'skill-list-item-name') {
						Transforms.move(editor, { distance: 1, unit: 'line' })
						return
					}
					if (block.type === 'skill-list-item-description') {
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

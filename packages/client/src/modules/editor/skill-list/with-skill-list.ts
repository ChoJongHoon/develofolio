import { Editor, Transforms } from 'slate'

export const withSkillList = (editor: Editor) => {
	const { isVoid, insertBreak } = editor

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

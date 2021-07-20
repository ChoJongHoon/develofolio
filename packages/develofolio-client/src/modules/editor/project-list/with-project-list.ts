import { Editor, Transforms } from 'slate'

export const withProjectList = (editor: Editor) => {
	const { insertBreak } = editor

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
					console.log(`block.type`, block.type)
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

import { Editor } from 'slate'

export const withSkillList = (editor: Editor) => {
	const { isVoid } = editor

	editor.isVoid = (node) => {
		if (node.type === 'skill-list-item-logos') {
			return true
		}

		return isVoid(node)
	}

	return editor
}

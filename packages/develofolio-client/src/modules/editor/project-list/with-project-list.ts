import { Editor, Transforms } from 'slate'

export const withSkillList = (editor: Editor) => {
	const { isVoid, insertBreak } = editor

	// editor.isVoid = (node) => {
	// 	// if (node.type === 'skill-list-item-logos') {
	// 	// 	return true
	// 	// }

	// 	return isVoid(node)
	// }

	return editor
}

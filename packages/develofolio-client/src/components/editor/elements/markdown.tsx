import { Editor, Element, Point, Range, Transforms } from 'slate'
import { BulletedListElement } from '~/slate'

const SHORTCUTS = {
	'*': 'list-item',
	'-': 'list-item',
	'+': 'list-item',
	'>': 'block-quote',
	'#': 'heading-one',
	'##': 'heading-two',
	'###': 'heading-three',
} as const

const isShortcuts = (text: string): text is keyof typeof SHORTCUTS =>
	Object.keys(SHORTCUTS).includes(text)

export const withMarkdown = (editor: Editor) => {
	const { deleteBackward, insertText } = editor

	editor.insertText = (text) => {
		const { selection } = editor

		if (text === ' ' && selection && Range.isCollapsed(selection)) {
			const { anchor } = selection
			const block = Editor.above(editor, {
				match: (n) => Editor.isBlock(editor, n),
			})
			const path = block ? block[1] : []
			const start = Editor.start(editor, path)
			const range: Range = { anchor, focus: start }
			const beforeText = Editor.string(editor, range)

			if (isShortcuts(beforeText)) {
				const type = SHORTCUTS[beforeText]
				Transforms.select(editor, range)
				Transforms.delete(editor)

				const newProperties: Partial<Element> = { type }
				Transforms.setNodes(editor, newProperties, {
					match: (n) => Editor.isBlock(editor, n),
				})

				if (type === 'list-item') {
					const list: BulletedListElement = {
						type: 'bulleted-list',
						children: [],
					}
					Transforms.wrapNodes(editor, list, {
						match: (n) =>
							!Editor.isEditor(n) &&
							Element.isElement(n) &&
							n.type === 'list-item',
					})
				}
				return
			}
		}

		insertText(text)
	}

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
					block.type !== 'paragraph' &&
					Point.equals(selection.anchor, start)
				) {
					const newProperties: Partial<Element> = {
						type: 'paragraph',
					}
					Transforms.setNodes(editor, newProperties)

					if (block.type === 'list-item') {
						Transforms.unwrapNodes(editor, {
							match: (n) =>
								!Editor.isEditor(n) &&
								Element.isElement(n) &&
								n.type === 'bulleted-list',
							split: true,
						})
					}

					return
				}
			}

			deleteBackward(...args)
		}
	}
	return editor
}

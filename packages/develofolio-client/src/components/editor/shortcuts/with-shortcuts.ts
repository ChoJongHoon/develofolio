import { Editor, Element, Point, Range, Transforms } from 'slate'
import {
	BulletedListElement,
	CustomElement,
} from '~/components/editor/custom-types'
import { isHeading } from '../elements/heading'

const SHORTCUTS: { [key in string]: CustomElement['type'] } = {
	'*': 'list-item',
	'-': 'list-item',
	'+': 'list-item',
	'>': 'block-quote',
	'#': 'heading',
	'##': 'heading',
	'###': 'heading',
}

const isShortcuts = (text: string): text is keyof typeof SHORTCUTS =>
	Object.keys(SHORTCUTS).includes(text)

export const withShortcuts = (editor: Editor) => {
	const { deleteBackward, insertText, insertBreak } = editor

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
				if (isHeading(newProperties)) {
					newProperties.level = beforeText.length as 1 | 2 | 3
				}
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
					Object.values(SHORTCUTS).includes(block.type) &&
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

	/**
	 * 협재 블러의 타입이 paragraph가 아니고 비어있는 상태에서 줄바꿈을 시도하면 줄바꿈을 하지않고 해당 블럭을 paragraph 타입으로 변경한다.
	 * 만약 타입이 list-item 이였다면 bulleted-list 를 탈출한다.
	 */
	editor.insertBreak = () => {
		const { selection } = editor

		if (selection && Range.isCollapsed(selection)) {
			const match = Editor.above(editor, {
				match: (n) => {
					return Editor.isBlock(editor, n)
				},
			})
			if (match) {
				const [block, path] = match
				const start = Editor.start(editor, path)

				if (
					!Editor.isEditor(block) &&
					Element.isElement(block) &&
					Object.values(SHORTCUTS).includes(block.type) &&
					Point.equals(selection.anchor, start) &&
					Editor.isEmpty(editor, block)
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
		}
		insertBreak()
	}

	return editor
}

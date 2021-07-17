import { Editor, Element, Point, Range, Transforms } from 'slate'
import { BannerElement, CustomElement, ParagraphElement } from '../custom-types'
import { EMPTY_PARAGRAPH } from '../elements/paragraph'
import { EMPTY_BANNER } from './banner'
import { EMPTY_BANNER_BIO } from './banner-bio'
import { EMPTY_BANNER_NAME } from './banner-name'
import { EMPTY_BANNER_TAGLIN } from './banner-tagline'

const BANNER_CHILD_TYPES: CustomElement['type'][] = [
	'banner-name',
	'banner-tagline',
	'banner-bio',
]

export const withBanner = (editor: Editor) => {
	const { normalizeNode, deleteBackward, insertBreak } = editor

	/**
	 * 첫 번째 노드가 없으면 banner 삽입
	 * 두 번째 노드가 없으면 paragraph 삽입
	 *
	 * 배너의 첫 번째 노드가 없으면 name 삽입
	 * 배너의 첫 번째 노드가 name이 아니면 name으로 변경
	 * 배너의 두 번째 노드가 없으면 tagline 삽입
	 * 배너의 두 번째 노드가 tagline이 아니면 tagline으로 변경
	 * 배너의 세 번째 노드가 없으면 bio 삽입
	 * 배너의 세 번째 노드가 bio가 아니면 bio로 변경
	 * 배너의 네 번째 노드가 존재하면 배너 밖으로 옮김
	 *
	 * 배너안에 있어야 할 child가 밖에 있으면 paragraph로 타입 변환
	 */
	editor.normalizeNode = ([node, path]) => {
		if (Editor.isEditor(node)) {
			const firstChild = node.children[0]
			if (
				!firstChild ||
				!Editor.isBlock(editor, firstChild) ||
				firstChild.type !== 'banner'
			) {
				Transforms.insertNodes<BannerElement>(editor, EMPTY_BANNER, {
					at: path.concat(0),
				})
			}

			if (node.children.length < 2) {
				Transforms.insertNodes<ParagraphElement>(editor, EMPTY_PARAGRAPH, {
					at: path.concat(1),
				})
			}
		}

		if (Editor.isBlock(editor, node)) {
			if (node.type === 'banner') {
				if (node.children.length < 1) {
					Transforms.insertNodes(editor, EMPTY_BANNER_NAME, {
						at: path.concat(0),
					})
				} else if (node.children[0].type !== 'banner-name') {
					Transforms.setNodes(editor, EMPTY_BANNER_NAME, { at: path.concat(0) })
				}
				if (node.children.length < 2) {
					Transforms.insertNodes(editor, EMPTY_BANNER_TAGLIN, {
						at: path.concat(1),
					})
				} else if (node.children[1].type !== 'banner-tagline') {
					Transforms.setNodes(editor, EMPTY_BANNER_TAGLIN, {
						at: path.concat(1),
					})
				}
				if (node.children.length < 3) {
					Transforms.insertNodes(editor, EMPTY_BANNER_BIO, {
						at: path.concat(1),
					})
				} else if (node.children[2].type !== 'banner-bio') {
					Transforms.setNodes(editor, EMPTY_BANNER_BIO, { at: path.concat(2) })
				}

				if (node.children.length > 3) {
					Transforms.moveNodes(editor, { at: path.concat(3), to: [1] })
				}
			}

			if (BANNER_CHILD_TYPES.includes(node.type)) {
				if (path.length > 0) {
					const [parent] = Editor.node(editor, path.slice(0, -1))
					if (
						Editor.isEditor(parent) ||
						(Editor.isBlock(editor, parent) && parent.type !== 'banner')
					) {
						Transforms.setNodes(editor, { type: 'paragraph' }, { at: path })
					}
				}
			}
		}

		return normalizeNode([node, path])
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
					Point.equals(selection.anchor, start) &&
					BANNER_CHILD_TYPES.includes(block.type)
				) {
					return
				}
			}

			deleteBackward(...args)
		}
	}

	/**
	 * 배너 안쪽에서 Enter키 누르면 다음 줄로 이동
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
				if (
					Editor.isBlock(editor, block) &&
					BANNER_CHILD_TYPES.includes(block.type)
				) {
					Transforms.move(editor, { distance: 1, unit: 'line' })
					return
				}
			}
		}

		insertBreak()
	}

	return editor
}

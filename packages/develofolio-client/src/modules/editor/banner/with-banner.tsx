import { Editor, Element, Point, Range, Transforms } from 'slate'
import {
	BannerBioElement,
	BannerElement,
	BannerNameElement,
	BannerTaglineElement,
	CustomElement,
	ParagraphElement,
} from '../custom-types'

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
			const banner: BannerElement = {
				type: 'banner',
				children: [
					{ type: 'banner-name', children: [{ text: '' }] },
					{ type: 'banner-tagline', children: [{ text: '' }] },
					{ type: 'banner-bio', children: [{ text: '' }] },
				],
			}
			const firstChild = node.children[0]
			if (
				!firstChild ||
				!Editor.isBlock(editor, firstChild) ||
				firstChild.type !== 'banner'
			) {
				Transforms.insertNodes(editor, banner, { at: path.concat(0) })
			}

			if (node.children.length < 2) {
				const paragraph: ParagraphElement = {
					type: 'paragraph',
					children: [{ text: '' }],
				}
				Transforms.insertNodes(editor, paragraph, { at: path.concat(1) })
			}
		}

		if (Editor.isBlock(editor, node)) {
			if (node.type === 'banner') {
				const name: BannerNameElement = {
					type: 'banner-name',
					children: [{ text: '' }],
				}
				const tagline: BannerTaglineElement = {
					type: 'banner-tagline',
					children: [{ text: '' }],
				}
				const bio: BannerBioElement = {
					type: 'banner-bio',
					children: [{ text: '' }],
				}
				if (node.children.length < 1) {
					Transforms.insertNodes(editor, name, { at: path.concat(0) })
				} else if (node.children[0].type !== 'banner-name') {
					Transforms.setNodes(editor, name, { at: path.concat(0) })
				}
				if (node.children.length < 2) {
					Transforms.insertNodes(editor, tagline, { at: path.concat(1) })
				} else if (node.children[1].type !== 'banner-tagline') {
					Transforms.setNodes(editor, tagline, { at: path.concat(1) })
				}
				if (node.children.length < 3) {
					Transforms.insertNodes(editor, bio, { at: path.concat(1) })
				} else if (node.children[2].type !== 'banner-bio') {
					Transforms.setNodes(editor, bio, { at: path.concat(2) })
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

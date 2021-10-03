import { Editor, Element, Node, Point, Range, Text, Transforms } from 'slate'
import { BannerElement, CustomElement, ParagraphElement } from '../custom-types'
import { generateParagraphElement } from '../elements/paragraph'
import { generateBannerElement } from './banner'
import { generateBannerBioElement } from './banner-bio'
import { generateBannerNameElement } from './banner-name'
import { generateBannerTaglineElement } from './banner-tagline'

const BANNER_CHILD_TYPES: CustomElement['type'][] = [
	'banner-name',
	'banner-tagline',
	'banner-bio',
]

export const withBanner = (editor: Editor) => {
	const { normalizeNode, deleteBackward, insertBreak } = editor

	editor.normalizeNode = ([node, path]) => {
		if (Editor.isEditor(node)) {
			const firstChild = node.children[0]
			// 페이지 첫 번째 블럭에 banner 추가
			if (
				!firstChild ||
				!Editor.isBlock(editor, firstChild) ||
				firstChild.type !== 'banner'
			) {
				Transforms.insertNodes<BannerElement>(editor, generateBannerElement(), {
					at: [...path, 0],
				})
				return
			}

			// 배너 다음 블럭이 없으면 paragraph 추가
			if (node.children.length < 2) {
				Transforms.insertNodes<ParagraphElement>(
					editor,
					generateParagraphElement(),
					{
						at: [...path, 1],
					}
				)
				return
			}
		}

		if (Editor.isBlock(editor, node)) {
			if (node.type === 'banner') {
				// 배너의 위치는 최상단이어야함
				if (path.length !== 1 || path[0] !== 0) {
					Transforms.unwrapNodes(editor, { at: path })
					return
				}

				// name 이 없으면 추가
				if (node.children.length < 1) {
					Transforms.insertNodes(editor, generateBannerNameElement(), {
						at: [...path, 0],
					})
					return
				}
				// name 이 아니면 name 으로 수정
				if (node.children[0].type !== 'banner-name') {
					Transforms.setNodes(editor, generateBannerNameElement(), {
						at: [...path, 0],
					})
					return
				}

				// tagline 이 없으면 추가
				if (node.children.length < 2) {
					Transforms.insertNodes(editor, generateBannerTaglineElement(), {
						at: [...path, 1],
					})
					return
				}
				// tagline 이 아니면 tagline 으로 수정
				if (node.children[1].type !== 'banner-tagline') {
					Transforms.setNodes(editor, generateBannerTaglineElement(), {
						at: [...path, 1],
					})
					return
				}

				// bio 가 없으면 추가
				if (node.children.length < 3) {
					Transforms.insertNodes(editor, generateBannerBioElement(), {
						at: [...path, 1],
					})
					return
				}
				// bio 가 아니면 bio 로 수정
				if (node.children[2].type !== 'banner-bio') {
					Transforms.setNodes(editor, generateBannerBioElement(), {
						at: [...path, 2],
					})
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

			// children 들의 부모가 배너가 아니면 paragraph로 타입 변경
			if (BANNER_CHILD_TYPES.includes(node.type)) {
				if (path.length > 0) {
					const [parent] = Editor.node(editor, path.slice(0, -1))
					if (
						Editor.isEditor(parent) ||
						(Editor.isBlock(editor, parent) && parent.type !== 'banner')
					) {
						Transforms.setNodes(editor, { type: 'paragraph' }, { at: path })
						return
					}
				}
			}

			// children 에는 텍스트만 허용
			if (
				node.type === 'banner-name' ||
				node.type === 'banner-tagline' ||
				node.type === 'banner-bio'
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
				if (Editor.isBlock(editor, block)) {
					if (
						block.type === 'banner-name' ||
						block.type === 'banner-tagline' ||
						block.type === 'banner-bio'
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

import { Editor, Transforms } from 'slate'
import {
	BannerBioElement,
	BannerElement,
	BannerNameElement,
	BannerTaglineElement,
	ParagraphElement,
} from '../custom-types'
import { isBanner } from './is-banner'

export const withBanner = (editor: Editor) => {
	const { normalizeNode } = editor

	/**
	 * 첫 번째 노드가 없으면 banner 삽입
	 * 두 번째 노드가 없으면 paragraph 삽입
	 *
	 * 배너의 첫 번째 노드가 없으면 name 삽입
	 * 배너의 첫 번째 노드가 name이 아니면 name으로 변경
	 * 배너의 두 번째 노드가 tagline이 아니면 tagline으로 변경
	 * 배너의 세 번째 노드가 bio가 아니면 bio로 변경
	 * 배너의 네 번째 노드가 존재하면 배너 밖으로 옮김
	 */
	editor.normalizeNode = ([node, path]) => {
		if (Editor.isEditor(node)) {
			if (node.children.length < 1) {
				const banner: BannerElement = {
					type: 'banner',
					children: [
						{ type: 'banner-name', children: [{ text: '' }] },
						{ type: 'banner-tagline', children: [{ text: '' }] },
						{ type: 'banner-bio', children: [{ text: '' }] },
					],
				}
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

		if (isBanner(node)) {
			const name: BannerNameElement = {
				type: 'banner-name',
				children: [{ text: '' }],
			}
			if (node.children.length < 1) {
				Transforms.insertNodes(editor, name, { at: path.concat(0) })
			} else if (node.children[0].type !== 'banner-name') {
				Transforms.setNodes(editor, name, { at: path.concat(0) })
			}
			if (
				node.children.length >= 2 &&
				node.children[1].type !== 'banner-tagline'
			) {
				const tagline: BannerTaglineElement = {
					type: 'banner-tagline',
					children: [{ text: '' }],
				}
				Transforms.setNodes(editor, tagline, { at: path.concat(1) })
			}
			if (node.children.length >= 3 && node.children[2].type !== 'banner-bio') {
				const bio: BannerBioElement = {
					type: 'banner-bio',
					children: [{ text: '' }],
				}
				Transforms.setNodes(editor, bio, { at: path.concat(2) })
			}
			if (node.children.length > 3) {
				Transforms.moveNodes(editor, { at: path.concat(3), to: [1] })
			}
		}

		return normalizeNode([node, path])
	}

	// editor.insertBreak = () => {
	// 	const { selection } = editor

	// 	if (selection && Range.isCollapsed(selection)) {
	// 		const match = Editor.above(editor, {
	// 			match: (n) => {
	// 				return Editor.isBlock(editor, n)
	// 			},
	// 		})
	// 		if (match) {
	// 			const [node] = match
	// 			if (isBannerBio(node)) {
	// 				Transforms.select(editor, { path: [1], offset: 0 })
	// 				return
	// 			}
	// 		}
	// 	}
	// 	insertBreak()
	// }

	return editor
}

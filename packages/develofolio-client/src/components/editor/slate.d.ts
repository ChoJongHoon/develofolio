import { BaseEditor, Descendant } from 'slate'
import { HistoryEditor } from 'slate-history'
import { ReactEditor, RenderElementProps } from 'slate-react'

// ==============================
//           Elements
// ==============================
export type ParagraphElement = {
	type: 'paragraph'
	children: Descendant[]
}
export type HeadingOneElement = {
	type: 'heading-one'
	children: Descendant[]
}
export type HeadingTwoElement = {
	type: 'heading-two'
	children: Descendant[]
}
export type HeadingThreeElement = {
	type: 'heading-three'
	children: Descendant[]
}
export type BlockQuoteElement = { type: 'block-quote'; children: Descendant[] }
export type BulletedListElement = {
	type: 'bulleted-list'
	children: Descendant[]
}
export type ListItemElement = { type: 'list-item'; children: Descendant[] }

export type IconElement = {
	type: 'icon'
	name: string
	shortname: string
	url: string
	file: string
	children: EmptyText[]
}

export type CustomElement = (
	| ParagraphElement
	| HeadingOneElement
	| HeadingTwoElement
	| HeadingThreeElement
	| BlockQuoteElement
	| BulletedListElement
	| ListItemElement
	| IconElement
) & {
	key?: string
}

export type LeafFormat = 'bold' | 'italic' | 'code'

export type CustomText = { [key in LeafFormat]?: boolean } & {
	text: string
}

declare module 'slate' {
	interface CustomTypes {
		Editor: BaseEditor & ReactEditor & HistoryEditor
		Element: CustomElement
		Text: CustomText
	}
}

// ==============================
//           Helpers
// ==============================
export type CustomRenderElementProps<E> = Omit<
	RenderElementProps,
	'element'
> & {
	element: E
}

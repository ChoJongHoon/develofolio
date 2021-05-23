import { BaseEditor, Descendant } from 'slate'
import { HistoryEditor } from 'slate-history'
import { ReactEditor, RenderElementProps } from 'slate-react'

export type WithKey<Element> = Element & { key?: string }

// ==============================
//           Elements
// ==============================
export type ParagraphElement = {
	type: 'paragraph'
	children: Descendant[]
}
export type HeadingElement = {
	type: 'heading'
	level: 1 | 2 | 3
	children: Descendant[]
}
export type BlockQuoteElement = { type: 'block-quote'; children: Descendant[] }
export type BulletedListElement = {
	type: 'bulleted-list'
	children: Descendant[]
}
export type ListItemElement = { type: 'list-item'; children: Descendant[] }

export type LogoElement = {
	type: 'logo'
	name: string
	shortname: string
	url: string
	file: string
	children: CustomText[]
}

// ==============================
//           Banner
// ==============================
export type BannerElement = {
	type: 'banner'
	profile: string | null
	children: [
		WithKey<BannerNameElement>,
		WithKey<BannerTaglineElement>,
		WithKey<BannerBioElement>
	]
}
export type BannerNameElement = {
	type: 'banner-name'
	children: CustomText[]
}
export type BannerTaglineElement = {
	type: 'banner-tagline'
	children: CustomText[]
}
export type BannerBioElement = {
	type: 'banner-bio'
	children: CustomText[]
}

export type CustomElement = WithKey<
	| ParagraphElement
	| HeadingElement
	| BlockQuoteElement
	| BulletedListElement
	| ListItemElement
	| LogoElement
	| BannerElement
	| BannerNameElement
	| BannerTaglineElement
	| BannerBioElement
>

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

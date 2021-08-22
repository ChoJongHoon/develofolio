import OpenColor from 'open-color'
import { BaseEditor, Descendant } from 'slate'
import { HistoryEditor } from 'slate-history'
import { ReactEditor, RenderElementProps } from 'slate-react'

export type WithId<Element> = Element & { id: string }

// ==============================
//           Elements
// ==============================
export type ParagraphElement = WithId<{
	type: 'paragraph'
	children: (Descendant | CustomText)[]
}>
export type HeadingElement = WithId<{
	type: 'heading'
	level: 1 | 2 | 3
	children: Descendant[]
}>
export type BlockQuoteElement = WithId<{
	type: 'block-quote'
	children: Descendant[]
}>
export type BulletedListElement = WithId<{
	type: 'bulleted-list'
	children: Descendant[]
}>
export type ListItemElement = WithId<{
	type: 'list-item'
	children: Descendant[]
}>

export type LogoElement = WithId<{
	type: 'logo'
	name: string
	shortname: string
	url: string
	file: string
	children: CustomText[]
}>

// ==============================
//           Banner
// ==============================
export type BannerElement = WithId<{
	type: 'banner'
	profile?: string | null
	links: {
		github?: string | null
		stackOverflow?: string | null
		facebook?: string | null
		twitter?: string | null
		linkedIn?: string | null
	}
	children: [BannerNameElement, BannerTaglineElement, BannerBioElement]
}>
export type BannerNameElement = WithId<{
	type: 'banner-name'
	children: CustomText[]
}>
export type BannerTaglineElement = WithId<{
	type: 'banner-tagline'
	children: CustomText[]
}>
export type BannerBioElement = WithId<{
	type: 'banner-bio'
	children: CustomText[]
}>

// ==============================
//           SkillList
// ==============================
export type SkillListElement = WithId<{
	type: 'skill-list'
	children: SkillListItemElement[]
}>
export type SkillListItemElement = WithId<{
	type: 'skill-list-item'
	children: [
		SkillListItemLogosElement,
		SkillListItemNameElement,
		SkillListItemDescriptionElement
	]
}>
export type SkillListItemLogosElement = WithId<{
	type: 'skill-list-item-logos'
	logos: Omit<LogoElement, 'type' | 'children'>[]
	children: CustomText[]
}>
export type SkillListItemNameElement = WithId<{
	type: 'skill-list-item-name'
	children: CustomText[]
}>
export type SkillListItemDescriptionElement = WithId<{
	type: 'skill-list-item-description'
	children: CustomText[]
}>

// ==============================
//           ProjectList
// ==============================
export type ProjectListElement = WithId<{
	type: 'project-list'
	children: ProjectListItemElement[]
}>
export type ProjectListItemElement = WithId<{
	type: 'project-list-item'
	thumbnail: string | null
	logos: Omit<LogoElement, 'type' | 'children'>[]
	links: {
		web: string | null
		playstore: string | null
		appstore: string | null
		github: string | null
	}
	children: [ProjectListItemNameElement, ProjectListItemDescriptionElement]
}>
export type ProjectListItemNameElement = WithId<{
	type: 'project-list-item-name'
	children: CustomText[]
}>
export type ProjectListItemDescriptionElement = WithId<{
	type: 'project-list-item-description'
	children: CustomText[]
}>

// ==============================
//        SchoolList
// ==============================
export type SchoolListElement = WithId<{
	type: 'school-list'
	children: SchoolListItemElement[]
}>
export type SchoolListItemElement = WithId<{
	type: 'school-list-item'
	logo: string | null
	children: [
		SchoolListItemNameElement,
		SchoolListItemMajorElement,
		SchoolListItemPeriodElement
	]
}>
export type SchoolListItemNameElement = WithId<{
	type: 'school-list-item-name'
	children: CustomText[]
}>
export type SchoolListItemMajorElement = WithId<{
	type: 'school-list-item-major'
	children: CustomText[]
}>
export type SchoolListItemPeriodElement = WithId<{
	type: 'school-list-item-period'
	children: CustomText[]
}>

export type CustomElement =
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
	| SkillListElement
	| SkillListItemElement
	| SkillListItemLogosElement
	| SkillListItemNameElement
	| SkillListItemDescriptionElement
	| ProjectListElement
	| ProjectListItemElement
	| ProjectListItemNameElement
	| ProjectListItemDescriptionElement
	| SchoolListElement
	| SchoolListItemElement
	| SchoolListItemNameElement
	| SchoolListItemMajorElement
	| SchoolListItemPeriodElement

export type LeafFormat = 'bold' | 'italic' | 'code'

export type CustomText = { [key in LeafFormat]?: boolean } & {
	text: string
	color?: keyof OpenColor
	highlight?: keyof OpenColor
	link?: string
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

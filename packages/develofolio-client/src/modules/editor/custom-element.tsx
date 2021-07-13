import React, { useMemo } from 'react'
import { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import {
	RenderElementProps,
	DefaultElement,
	useSlateStatic,
	ReactEditor,
} from 'slate-react'
import { Draggable } from './dnd/draggable'
import { Logo } from './logo/logo'
import { Heading } from './elements/heading'
import { Paragraph } from './elements/paragraph'
import { BulletedList } from './elements/bulleted-list'
import { ListItem } from './elements/list-item'
import { Banner } from './banner/banner'
import { BannerName } from './banner/banner-name'
import { BannerTagline } from './banner/banner-tagline'
import { BannerBio } from './banner/banner-bio'
import { SkillList } from './skill-list/skill-list'
import { SkillListItem } from './skill-list/skill-list-item'
import { SkillListItemLogos } from './skill-list/skill-list-item-logos'
import { SkillListItemName } from './skill-list/skill-list-item-name'
import { SkillListItemDescription } from './skill-list/skill-list-item-description'
import { ProjectList } from './project-list/project-list'
import { ProjectListItem } from './project-list/project-list-item'
import { ProjectListItemName } from './project-list/project-list-item-name'
import { ProjectListItemDescription } from './project-list/project-list-item-description'

export const CustomElement = (props: RenderElementProps) => {
	const { element, attributes, children } = props

	const editor = useSlateStatic()

	const path = useMemo(
		() => ReactEditor.findPath(editor, element),
		[editor, element]
	)

	let data: EmotionJSX.Element

	switch (element.type) {
		case 'logo':
			data = (
				<Logo attributes={attributes} element={element}>
					{children}
				</Logo>
			)
			break
		case 'heading':
			data = (
				<Heading attributes={attributes} element={element}>
					{children}
				</Heading>
			)
			break
		case 'block-quote':
			data = <blockquote {...attributes}>{children}</blockquote>
			break
		case 'bulleted-list':
			data = (
				<BulletedList attributes={attributes} element={element}>
					{children}
				</BulletedList>
			)
			break
		case 'list-item':
			data = (
				<ListItem attributes={attributes} element={element}>
					{children}
				</ListItem>
			)
			break
		case 'paragraph':
			data = (
				<Paragraph attributes={attributes} element={element}>
					{children}
				</Paragraph>
			)
			break
		case 'banner':
			data = (
				<Banner attributes={attributes} element={element}>
					{children}
				</Banner>
			)
			break
		case 'banner-name':
			data = (
				<BannerName attributes={attributes} element={element}>
					{children}
				</BannerName>
			)
			break
		case 'banner-tagline':
			data = (
				<BannerTagline attributes={attributes} element={element}>
					{children}
				</BannerTagline>
			)
			break
		case 'banner-bio':
			data = (
				<BannerBio attributes={attributes} element={element}>
					{children}
				</BannerBio>
			)
			break
		case 'skill-list':
			data = (
				<SkillList attributes={attributes} element={element}>
					{children}
				</SkillList>
			)
			break
		case 'skill-list-item':
			data = (
				<SkillListItem attributes={attributes} element={element}>
					{children}
				</SkillListItem>
			)
			break
		case 'skill-list-item-logos':
			data = (
				<SkillListItemLogos attributes={attributes} element={element}>
					{children}
				</SkillListItemLogos>
			)
			break
		case 'skill-list-item-name':
			data = (
				<SkillListItemName attributes={attributes} element={element}>
					{children}
				</SkillListItemName>
			)
			break
		case 'skill-list-item-description':
			data = (
				<SkillListItemDescription attributes={attributes} element={element}>
					{children}
				</SkillListItemDescription>
			)
			break
		case 'project-list':
			data = (
				<ProjectList attributes={attributes} element={element}>
					{children}
				</ProjectList>
			)
			break
		case 'project-list-item':
			data = (
				<ProjectListItem attributes={attributes} element={element}>
					{children}
				</ProjectListItem>
			)
			break
		case 'project-list-item-name':
			data = (
				<ProjectListItemName attributes={attributes} element={element}>
					{children}
				</ProjectListItemName>
			)
			break
		case 'project-list-item-description':
			data = (
				<ProjectListItemDescription attributes={attributes} element={element}>
					{children}
				</ProjectListItemDescription>
			)
			break
		default:
			data = (
				<DefaultElement attributes={attributes} element={element}>
					{children}
				</DefaultElement>
			)
	}

	if (path.length === 1 && element.type !== 'banner') {
		return <Draggable id={element.key as string}>{data}</Draggable>
	}

	return data
}

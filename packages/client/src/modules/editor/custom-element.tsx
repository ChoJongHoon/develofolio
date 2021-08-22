import { RenderElementProps, DefaultElement } from 'slate-react'
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
import { ExperienceList } from './experience-list/experience-list'
import { ExperienceListItem } from './experience-list/experience-list-item'
import { ExperienceListItemName } from './experience-list/experience-list-item-name'
import { ExperienceListItemDescription } from './experience-list/experience-list-item-description'
import { ExperienceListItemPeriod } from './experience-list/experience-list-item-period'

export const CustomElement = (props: RenderElementProps) => {
	const { element, attributes, children } = props

	switch (element.type) {
		case 'logo':
			return (
				<Logo attributes={attributes} element={element}>
					{children}
				</Logo>
			)
		case 'heading':
			return (
				<Heading attributes={attributes} element={element}>
					{children}
				</Heading>
			)
		case 'block-quote':
			return <blockquote {...attributes}>{children}</blockquote>
		case 'bulleted-list':
			return (
				<BulletedList attributes={attributes} element={element}>
					{children}
				</BulletedList>
			)
		case 'list-item':
			return (
				<ListItem attributes={attributes} element={element}>
					{children}
				</ListItem>
			)
		case 'paragraph':
			return (
				<Paragraph attributes={attributes} element={element}>
					{children}
				</Paragraph>
			)
		case 'banner':
			return (
				<Banner attributes={attributes} element={element}>
					{children}
				</Banner>
			)
		case 'banner-name':
			return (
				<BannerName attributes={attributes} element={element}>
					{children}
				</BannerName>
			)
		case 'banner-tagline':
			return (
				<BannerTagline attributes={attributes} element={element}>
					{children}
				</BannerTagline>
			)
		case 'banner-bio':
			return (
				<BannerBio attributes={attributes} element={element}>
					{children}
				</BannerBio>
			)
		case 'skill-list':
			return (
				<SkillList attributes={attributes} element={element}>
					{children}
				</SkillList>
			)
		case 'skill-list-item':
			return (
				<SkillListItem attributes={attributes} element={element}>
					{children}
				</SkillListItem>
			)
		case 'skill-list-item-logos':
			return (
				<SkillListItemLogos attributes={attributes} element={element}>
					{children}
				</SkillListItemLogos>
			)
		case 'skill-list-item-name':
			return (
				<SkillListItemName attributes={attributes} element={element}>
					{children}
				</SkillListItemName>
			)
		case 'skill-list-item-description':
			return (
				<SkillListItemDescription attributes={attributes} element={element}>
					{children}
				</SkillListItemDescription>
			)
		case 'project-list':
			return (
				<ProjectList attributes={attributes} element={element}>
					{children}
				</ProjectList>
			)
		case 'project-list-item':
			return (
				<ProjectListItem attributes={attributes} element={element}>
					{children}
				</ProjectListItem>
			)
		case 'project-list-item-name':
			return (
				<ProjectListItemName attributes={attributes} element={element}>
					{children}
				</ProjectListItemName>
			)
		case 'project-list-item-description':
			return (
				<ProjectListItemDescription attributes={attributes} element={element}>
					{children}
				</ProjectListItemDescription>
			)
		case 'experience-list':
			return (
				<ExperienceList attributes={attributes} element={element}>
					{children}
				</ExperienceList>
			)
		case 'experience-list-item':
			return (
				<ExperienceListItem attributes={attributes} element={element}>
					{children}
				</ExperienceListItem>
			)
		case 'experience-list-item-name':
			return (
				<ExperienceListItemName attributes={attributes} element={element}>
					{children}
				</ExperienceListItemName>
			)
		case 'experience-list-item-description':
			return (
				<ExperienceListItemDescription
					attributes={attributes}
					element={element}
				>
					{children}
				</ExperienceListItemDescription>
			)
		case 'experience-list-item-period':
			return (
				<ExperienceListItemPeriod attributes={attributes} element={element}>
					{children}
				</ExperienceListItemPeriod>
			)
		default:
			return (
				<DefaultElement attributes={attributes} element={element}>
					{children}
				</DefaultElement>
			)
	}
}

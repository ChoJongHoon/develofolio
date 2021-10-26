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
import { SchoolList } from './school-list/school-list'
import { SchoolListItem } from './school-list/school-list-item'
import { SchoolListItemName } from './school-list/school-list-item-name'
import { SchoolListItemMajor } from './school-list/school-list-item-major'
import { SchoolListItemPeriod } from './school-list/school-list-item-period'
import { CareerList } from './career-list/career-list'
import { CareerListItem } from './career-list/career-list-item'
import { CareerListItemName } from './career-list/career-list-item-name'
import { CareerListItemPosition } from './career-list/career-list-item-position'
import { CareerListItemPeriod } from './career-list/career-list-item-period'
import { CareerListItemDescription } from './career-list/career-list-item-description'
import { Blockquote } from './elements/blockquote'

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
		case 'blockquote':
			return (
				<Blockquote attributes={attributes} element={element}>
					{children}
				</Blockquote>
			)
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
		case 'school-list':
			return (
				<SchoolList attributes={attributes} element={element}>
					{children}
				</SchoolList>
			)
		case 'school-list-item':
			return (
				<SchoolListItem attributes={attributes} element={element}>
					{children}
				</SchoolListItem>
			)
		case 'school-list-item-name':
			return (
				<SchoolListItemName attributes={attributes} element={element}>
					{children}
				</SchoolListItemName>
			)
		case 'school-list-item-major':
			return (
				<SchoolListItemMajor attributes={attributes} element={element}>
					{children}
				</SchoolListItemMajor>
			)
		case 'school-list-item-period':
			return (
				<SchoolListItemPeriod attributes={attributes} element={element}>
					{children}
				</SchoolListItemPeriod>
			)
		case 'career-list':
			return (
				<CareerList attributes={attributes} element={element}>
					{children}
				</CareerList>
			)
		case 'career-list-item':
			return (
				<CareerListItem attributes={attributes} element={element}>
					{children}
				</CareerListItem>
			)
		case 'career-list-item-name':
			return (
				<CareerListItemName attributes={attributes} element={element}>
					{children}
				</CareerListItemName>
			)
		case 'career-list-item-position':
			return (
				<CareerListItemPosition attributes={attributes} element={element}>
					{children}
				</CareerListItemPosition>
			)
		case 'career-list-item-period':
			return (
				<CareerListItemPeriod attributes={attributes} element={element}>
					{children}
				</CareerListItemPeriod>
			)
		case 'career-list-item-description':
			return (
				<CareerListItemDescription attributes={attributes} element={element}>
					{children}
				</CareerListItemDescription>
			)
		default:
			return (
				<DefaultElement attributes={attributes} element={element}>
					{children}
				</DefaultElement>
			)
	}
}

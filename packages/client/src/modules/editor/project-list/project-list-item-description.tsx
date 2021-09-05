import { ParagraphSmall } from 'baseui/typography'
import { nanoid } from 'nanoid'
import OpenColor from 'open-color'
import {
	CustomRenderElementProps,
	ProjectListItemDescriptionElement,
} from '../custom-types'
import { Placeholder } from '../placeholder/placeholder'

export const generateProjectListItemDescriptionElement =
	(): ProjectListItemDescriptionElement => ({
		id: nanoid(),
		type: 'project-list-item-description',
		children: [{ text: '' }],
	})

export const ProjectListItemDescription = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<ProjectListItemDescriptionElement>) => {
	return (
		<ParagraphSmall
			{...attributes}
			overrides={{
				Block: {
					style: {
						position: 'relative',
					},
				},
			}}
			color={OpenColor.gray[7]}
		>
			<Placeholder element={element}>프로젝트 설명</Placeholder>
			{children}
		</ParagraphSmall>
	)
}

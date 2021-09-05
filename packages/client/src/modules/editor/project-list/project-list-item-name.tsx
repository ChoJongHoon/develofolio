import { HeadingSmall } from 'baseui/typography'
import { nanoid } from 'nanoid'
import OpenColor from 'open-color'
import {
	CustomRenderElementProps,
	ProjectListItemNameElement,
} from '../custom-types'
import { Placeholder } from '../placeholder/placeholder'

export const generateProjectListItemNameElement =
	(): ProjectListItemNameElement => ({
		id: nanoid(),
		type: 'project-list-item-name',
		children: [{ text: '' }],
	})

export const ProjectListItemName = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<ProjectListItemNameElement>) => {
	return (
		<HeadingSmall
			{...attributes}
			overrides={{
				Block: {
					style: {
						fontWeight: 'bold',
						marginBottom: '8px',
						position: 'relative',
					},
				},
			}}
			color={OpenColor.gray[9]}
		>
			<Placeholder element={element}>프로젝트 이름</Placeholder>
			{children}
		</HeadingSmall>
	)
}

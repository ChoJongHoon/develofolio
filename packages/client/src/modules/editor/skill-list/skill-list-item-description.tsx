import { ParagraphSmall } from 'baseui/typography'
import { nanoid } from 'nanoid'
import {
	CustomRenderElementProps,
	SkillListItemDescriptionElement,
} from '../custom-types'
import { Placeholder } from '../placeholder/placeholder'

export const generateSkillListItemDescriptionElement =
	(): SkillListItemDescriptionElement => ({
		id: nanoid(),
		type: 'skill-list-item-description',
		children: [{ text: '' }],
	})

export const SkillListItemDescription = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<SkillListItemDescriptionElement>) => {
	return (
		<ParagraphSmall {...attributes}>
			<Placeholder element={element}>스킬 설명</Placeholder>
			{children}
		</ParagraphSmall>
	)
}

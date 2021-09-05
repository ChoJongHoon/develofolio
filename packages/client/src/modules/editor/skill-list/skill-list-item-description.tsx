import { ParagraphSmall } from 'baseui/typography'
import {
	CustomRenderElementProps,
	SkillListItemDescriptionElement,
} from '../custom-types'
import { Placeholder } from '../placeholder/placeholder'

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

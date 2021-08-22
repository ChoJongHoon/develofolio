import { nanoid } from 'nanoid'
import { useStyletron } from 'styletron-react'
import {
	CustomRenderElementProps,
	ExperienceListItemDescriptionElement,
} from '../custom-types'
import { LabelLarge } from 'baseui/typography'
import OpenColor from 'open-color'
import { Placeholder } from '../placeholder/placeholder'

export const generateExperienceListItemDescriptionElement =
	(): ExperienceListItemDescriptionElement => ({
		id: nanoid(),
		type: 'experience-list-item-description',
		children: [{ text: '' }],
	})

export const ExperienceListItemDescription = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<ExperienceListItemDescriptionElement>) => {
	const [css] = useStyletron()

	return (
		<LabelLarge
			{...attributes}
			color={OpenColor.gray[6]}
			className={css({
				position: 'relative',
			})}
		>
			<Placeholder element={element}>설명</Placeholder>
			{children}
		</LabelLarge>
	)
}

import { nanoid } from 'nanoid'
import { useStyletron } from 'styletron-react'
import {
	CustomRenderElementProps,
	ExperienceListItemPeriodElement,
} from '../custom-types'
import { LabelSmall } from 'baseui/typography'
import OpenColor from 'open-color'
import { Placeholder } from '../placeholder/placeholder'

export const generateExperienceListItemPeriodElement =
	(): ExperienceListItemPeriodElement => ({
		id: nanoid(),
		type: 'experience-list-item-period',
		children: [{ text: '' }],
	})

export const ExperienceListItemPeriod = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<ExperienceListItemPeriodElement>) => {
	const [css] = useStyletron()

	return (
		<LabelSmall
			{...attributes}
			color={OpenColor.gray[6]}
			className={css({
				position: 'relative',
			})}
		>
			<Placeholder element={element}>기간</Placeholder>
			{children}
		</LabelSmall>
	)
}

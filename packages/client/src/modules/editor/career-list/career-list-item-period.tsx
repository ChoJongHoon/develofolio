import { nanoid } from 'nanoid'
import { useStyletron } from 'styletron-react'
import {
	CustomRenderElementProps,
	CareerListItemPeriodElement,
} from '../custom-types'
import { LabelSmall } from 'baseui/typography'
import OpenColor from 'open-color'
import { Placeholder } from '../placeholder/placeholder'

export const generateCareerListItemPeriodElement =
	(): CareerListItemPeriodElement => ({
		id: nanoid(),
		type: 'career-list-item-period',
		children: [{ text: '' }],
	})

export const CareerListItemPeriod = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<CareerListItemPeriodElement>) => {
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

import { nanoid } from 'nanoid'
import { useStyletron } from 'styletron-react'
import {
	CustomRenderElementProps,
	SchoolListItemPeriodElement,
} from '../custom-types'
import { LabelSmall } from 'baseui/typography'
import OpenColor from 'open-color'
import { Placeholder } from '../placeholder/placeholder'

export const generateSchoolListItemPeriodElement =
	(): SchoolListItemPeriodElement => ({
		id: nanoid(),
		type: 'school-list-item-period',
		children: [{ text: '' }],
	})

export const SchoolListItemPeriod = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<SchoolListItemPeriodElement>) => {
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

import { nanoid } from 'nanoid'
import { useStyletron } from 'styletron-react'
import {
	CustomRenderElementProps,
	CareerListItemDescriptionElement,
} from '../custom-types'
import { ParagraphMedium } from 'baseui/typography'
import OpenColor from 'open-color'
import { Placeholder } from '../placeholder/placeholder'

export const generateCareerListItemDescriptionElement =
	(): CareerListItemDescriptionElement => ({
		id: nanoid(),
		type: 'career-list-item-description',
		children: [{ text: '' }],
	})

export const CareerListItemDescription = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<CareerListItemDescriptionElement>) => {
	const [css] = useStyletron()

	return (
		<ParagraphMedium
			{...attributes}
			color={OpenColor.gray[7]}
			className={css({
				position: 'relative',
				paddingTop: '16px',
				paddingBottom: '16px',
			})}
		>
			<Placeholder element={element}>설명</Placeholder>
			{children}
		</ParagraphMedium>
	)
}

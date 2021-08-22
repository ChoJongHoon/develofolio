import { nanoid } from 'nanoid'
import { useStyletron } from 'styletron-react'
import {
	CustomRenderElementProps,
	CareerListItemNameElement,
} from '../custom-types'
import { HeadingXSmall } from 'baseui/typography'
import OpenColor from 'open-color'
import { Placeholder } from '../placeholder/placeholder'

export const generateCareerListItemNameElement =
	(): CareerListItemNameElement => ({
		id: nanoid(),
		type: 'career-list-item-name',
		children: [{ text: '' }],
	})

export const CareerListItemName = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<CareerListItemNameElement>) => {
	const [css] = useStyletron()

	return (
		<HeadingXSmall
			color={OpenColor.gray[8]}
			className={css({
				fontWeight: 'bold',
				position: 'relative',
				paddingTop: '8px',
			})}
			{...attributes}
		>
			<Placeholder element={element}>이름</Placeholder>
			{children}
		</HeadingXSmall>
	)
}

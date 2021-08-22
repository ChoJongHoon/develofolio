import { nanoid } from 'nanoid'
import { useStyletron } from 'styletron-react'
import {
	CustomRenderElementProps,
	CareerListItemPositionElement,
} from '../custom-types'
import { LabelLarge } from 'baseui/typography'
import OpenColor from 'open-color'
import { Placeholder } from '../placeholder/placeholder'

export const generateCareerListItemPositionElement =
	(): CareerListItemPositionElement => ({
		id: nanoid(),
		type: 'career-list-item-position',
		children: [{ text: '' }],
	})

export const CareerListItemPosition = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<CareerListItemPositionElement>) => {
	const [css] = useStyletron()

	return (
		<LabelLarge
			{...attributes}
			color={OpenColor.gray[6]}
			className={css({
				position: 'relative',
			})}
		>
			<Placeholder element={element}>직책</Placeholder>
			{children}
		</LabelLarge>
	)
}

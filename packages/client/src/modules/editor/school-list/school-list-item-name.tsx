import { nanoid } from 'nanoid'
import { useStyletron } from 'styletron-react'
import {
	CustomRenderElementProps,
	SchoolListItemNameElement,
} from '../custom-types'
import { HeadingXSmall } from 'baseui/typography'
import OpenColor from 'open-color'
import { Placeholder } from '../placeholder/placeholder'

export const generateSchoolListItemNameElement =
	(): SchoolListItemNameElement => ({
		id: nanoid(),
		type: 'school-list-item-name',
		children: [{ text: '' }],
	})

export const SchoolListItemName = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<SchoolListItemNameElement>) => {
	const [css] = useStyletron()

	return (
		<HeadingXSmall
			color={OpenColor.gray[8]}
			className={css({
				fontWeight: 'bold',
				position: 'relative',
			})}
			{...attributes}
		>
			<Placeholder element={element}>이름</Placeholder>
			{children}
		</HeadingXSmall>
	)
}

import { nanoid } from 'nanoid'
import { useStyletron } from 'styletron-react'
import {
	CustomRenderElementProps,
	SchoolListItemDescriptionElement,
} from '../custom-types'
import { LabelLarge } from 'baseui/typography'
import OpenColor from 'open-color'
import { Placeholder } from '../placeholder/placeholder'

export const generateSchoolListItemDescriptionElement =
	(): SchoolListItemDescriptionElement => ({
		id: nanoid(),
		type: 'school-list-item-description',
		children: [{ text: '' }],
	})

export const SchoolListItemDescription = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<SchoolListItemDescriptionElement>) => {
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

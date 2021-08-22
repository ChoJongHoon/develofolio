import { nanoid } from 'nanoid'
import { useStyletron } from 'styletron-react'
import {
	CustomRenderElementProps,
	SchoolListItemMajorElement,
} from '../custom-types'
import { LabelLarge } from 'baseui/typography'
import OpenColor from 'open-color'
import { Placeholder } from '../placeholder/placeholder'

export const generateSchoolListItemMajorElement =
	(): SchoolListItemMajorElement => ({
		id: nanoid(),
		type: 'school-list-item-major',
		children: [{ text: '' }],
	})

export const SchoolListItemMajor = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<SchoolListItemMajorElement>) => {
	const [css] = useStyletron()

	return (
		<LabelLarge
			{...attributes}
			color={OpenColor.gray[6]}
			className={css({
				position: 'relative',
			})}
		>
			<Placeholder element={element}>전공</Placeholder>
			{children}
		</LabelLarge>
	)
}

import { nanoid } from 'nanoid'
import { useStyletron } from 'styletron-react'
import {
	CustomRenderElementProps,
	ExperienceListItemNameElement,
} from '../custom-types'
import { HeadingXSmall } from 'baseui/typography'
import OpenColor from 'open-color'
import { Placeholder } from '../placeholder/placeholder'

export const generateExperienceListItemNameElement =
	(): ExperienceListItemNameElement => ({
		id: nanoid(),
		type: 'experience-list-item-name',
		children: [{ text: '' }],
	})

export const ExperienceListItemName = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<ExperienceListItemNameElement>) => {
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

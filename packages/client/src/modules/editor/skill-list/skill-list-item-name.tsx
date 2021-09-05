import { LabelMedium } from 'baseui/typography'
import {
	CustomRenderElementProps,
	SkillListItemNameElement,
} from '../custom-types'
import { Placeholder } from '../placeholder/placeholder'

export const SkillListItemName = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<SkillListItemNameElement>) => {
	return (
		<LabelMedium
			{...attributes}
			overrides={{
				Block: {
					style: {
						fontWeight: 'bold',
						marginBottom: '4px',
					},
				},
			}}
		>
			<Placeholder element={element}>스킬 이름</Placeholder>
			{children}
		</LabelMedium>
	)
}

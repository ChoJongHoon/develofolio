import {
	CustomRenderElementProps,
	SkillListItemLogosElement,
	SkillListItemNameElement,
} from '../custom-types'
import { Placeholder } from '../placeholder/placeholder'

export const SkillListItemName = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<SkillListItemNameElement>) => {
	return (
		<h3 {...attributes}>
			<Placeholder element={element}>스킬 이름</Placeholder>
			{children}
		</h3>
	)
}

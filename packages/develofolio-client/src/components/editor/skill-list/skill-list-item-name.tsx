import {
	CustomRenderElementProps,
	SkillListItemLogosElement,
	SkillListItemNameElement,
} from '../custom-types'

export const SkillListItemName = ({
	attributes,
	children,
}: CustomRenderElementProps<SkillListItemNameElement>) => {
	return <h3 {...attributes}>{children}</h3>
}

import {
	CustomRenderElementProps,
	SkillListItemDescriptionElement,
} from '../custom-types'

export const SkillListItemDescription = ({
	attributes,
	children,
}: CustomRenderElementProps<SkillListItemDescriptionElement>) => {
	return <p {...attributes}>{children}</p>
}

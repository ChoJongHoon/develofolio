import { CustomRenderElementProps, SkillListElement } from '../custom-types'

export const SkillList = ({
	attributes,
	children,
}: CustomRenderElementProps<SkillListElement>) => {
	return <ul {...attributes}>{children}</ul>
}

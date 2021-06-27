import { useStyletron } from 'styletron-react'
import { CustomRenderElementProps, SkillListItemElement } from '../custom-types'

export const SkillListItem = ({
	attributes,
	children,
}: CustomRenderElementProps<SkillListItemElement>) => {
	const [css] = useStyletron()
	return (
		<li {...attributes} className={css({ listStyle: 'none' })}>
			{children}
		</li>
	)
}

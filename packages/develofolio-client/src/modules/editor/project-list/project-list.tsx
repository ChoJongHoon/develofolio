import { useStyletron } from 'styletron-react'
import { CustomRenderElementProps, ProjectListElement } from '../custom-types'

export const ProjectList = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<ProjectListElement>) => {
	const [css] = useStyletron()
	return (
		<div
			{...attributes}
			className={css({
				display: 'grid',
				gridTemplateColumns: 'repeat(3, 1fr)',
				gap: '16px',
			})}
		>
			{children}
		</div>
	)
}

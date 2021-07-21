import OpenColor from 'open-color'
import { useStyletron } from 'styletron-react'
import {
	CustomRenderElementProps,
	ProjectListItemNameElement,
} from '../custom-types'
import { Placeholder } from '../placeholder/placeholder'

export const ProjectListItemName = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<ProjectListItemNameElement>) => {
	const [css] = useStyletron()

	return (
		<div
			{...attributes}
			className={css({
				fontWeight: 700,
				color: OpenColor.gray[9],
				fontSize: '24px',
				lineHeight: '28px',
				marginBottom: '8px',
				position: 'relative',
			})}
		>
			<Placeholder element={element}>프로젝트 이름</Placeholder>
			{children}
		</div>
	)
}

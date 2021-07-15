import OpenColor from 'open-color'
import { useStyletron } from 'styletron-react'
import {
	CustomRenderElementProps,
	ProjectListItemDescriptionElement,
} from '../custom-types'
import { Placeholder } from '../placeholder/placeholder'

export const ProjectListItemDescription = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<ProjectListItemDescriptionElement>) => {
	const [css] = useStyletron()

	return (
		<p
			{...attributes}
			className={css({
				fontSize: '14px',
				lineHeight: '20px',
				color: OpenColor.gray[7],
				fontWeight: 400,
			})}
		>
			<Placeholder element={element}>프로젝트 설명</Placeholder>
			{children}
		</p>
	)
}

import OpenColor from 'open-color'
import { useSelected } from 'slate-react'
import { StyleObject, useStyletron } from 'styletron-react'
import { CustomRenderElementProps, ParagraphElement } from '../custom-types'
import { Placeholder } from '../placeholder/placeholder'

export const Paragraph = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<ParagraphElement>) => {
	const [css] = useStyletron()
	const selected = useSelected()
	return (
		<p {...attributes} className={css(styles)}>
			{selected && (
				<Placeholder element={element}>
					마크다운을 이용해 작성해보세요!
				</Placeholder>
			)}
			{children}
		</p>
	)
}

const styles: StyleObject = {
	fontSize: '16px',
	lineHeight: 1.5,
	color: OpenColor.gray[7],
}

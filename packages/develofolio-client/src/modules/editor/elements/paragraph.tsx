import OpenColor from 'open-color'
import { StyleObject, useStyletron } from 'styletron-react'
import { CustomRenderElementProps, ParagraphElement } from '../custom-types'

export const Paragraph = ({
	attributes,
	children,
}: CustomRenderElementProps<ParagraphElement>) => {
	const [css] = useStyletron()
	return (
		<p {...attributes} className={css(styles)}>
			{children}
		</p>
	)
}

const styles: StyleObject = {
	fontSize: '16px',
	lineHeight: 1.5,
	color: OpenColor.gray[7],
}

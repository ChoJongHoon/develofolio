import { css } from '@emotion/react'
import OpenColor from 'open-color'
import { CustomRenderElementProps, ParagraphElement } from '../custom-types'

export const Paragraph = ({
	attributes,
	children,
}: CustomRenderElementProps<ParagraphElement>) => {
	return (
		<p {...attributes} css={styles}>
			{children}
		</p>
	)
}

const styles = css`
	--font-size: 16px;
	--line-height: 1.5;
	color: ${OpenColor.gray[7]};
`

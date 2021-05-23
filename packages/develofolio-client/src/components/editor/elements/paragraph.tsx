import { css } from '@emotion/react'
import React from 'react'
import { CustomRenderElementProps, ParagraphElement } from '../slate'

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
	font-size: 16px;
	line-height: 1.5;
`

import React from 'react'
import { css } from '@emotion/react'
import { CustomRenderElementProps, ListItemElement } from '../custom-types'

export const ListItem = ({
	attributes,
	children,
}: CustomRenderElementProps<ListItemElement>) => {
	return (
		<li {...attributes} css={rootStyles}>
			<div css={bulletStyles} contentEditable={false}>
				•
			</div>
			{children}
		</li>
	)
}

const rootStyles = css`
	display: flex;
	align-items: center;
	padding-left: 2px;
	font-size: 16px;
	line-height: 1.5;
`

const bulletStyles = css`
	margin-right: 2px;
	width: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24px;
	line-height: 1;
	margin-bottom: 0.1em;
`

import React from 'react'
import { css } from '@emotion/react'
import { CustomRenderElementProps, LogoElement } from '../custom-types'

export const Logo = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<LogoElement>) => {
	return (
		<span {...attributes} contentEditable={false} css={wrapper}>
			<img src={`/logos/${element.file}`} css={imgStyles} />
			{children}
		</span>
	)
}

const wrapper = css`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	position: relative;
`

const imgStyles = css`
	height: 16px;
	display: block;
`

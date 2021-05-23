import React from 'react'
import { css } from '@emotion/react'
import { BannerTaglineElement, CustomRenderElementProps } from '../custom-types'
import OpenColor from 'open-color'

export const BannerTagline = ({
	attributes,
	children,
}: CustomRenderElementProps<BannerTaglineElement>) => {
	return (
		<h2 css={styles} {...attributes}>
			{children}
		</h2>
	)
}

const styles = css`
	font-size: 24px;
	margin-top: 8px;
	font-weight: 500;
	color: ${OpenColor.gray[6]};
`

import React from 'react'
import { css } from '@emotion/react'
import { BannerNameElement, CustomRenderElementProps } from '../custom-types'
import OpenColor from 'open-color'

export const BannerName = ({
	attributes,
	children,
}: CustomRenderElementProps<BannerNameElement>) => {
	return (
		<h1 css={styles} {...attributes}>
			{children}
		</h1>
	)
}

const styles = css`
	font-size: 48px;
	color: ${OpenColor.gray[8]};
`

import React from 'react'
import { css } from '@emotion/react'
import { BannerBioElement, CustomRenderElementProps } from '../custom-types'
import OpenColor from 'open-color'

export const BannerBio = ({
	attributes,
	children,
}: CustomRenderElementProps<BannerBioElement>) => {
	return (
		<p css={styles} {...attributes}>
			{children}
		</p>
	)
}

const styles = css`
	margin-top: 16px;
	color: ${OpenColor.gray[7]};
`

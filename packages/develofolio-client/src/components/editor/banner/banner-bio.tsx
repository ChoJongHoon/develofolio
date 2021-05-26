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
	--font-size: 16px;
	--line-height: 1.3;
	margin-top: 16px;
	color: ${OpenColor.gray[7]};
	margin-bottom: 16px;
`

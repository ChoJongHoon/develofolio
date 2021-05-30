import React from 'react'
import { css } from '@emotion/react'
import { BannerBioElement, CustomRenderElementProps } from '../custom-types'
import OpenColor from 'open-color'
import { Placeholder } from '../placeholder/placeholder'

export const BannerBio = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<BannerBioElement>) => {
	return (
		<p css={styles} {...attributes}>
			<Placeholder element={element}>간단한 소개</Placeholder>
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

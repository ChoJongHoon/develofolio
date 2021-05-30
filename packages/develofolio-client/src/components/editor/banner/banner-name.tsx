import React from 'react'
import { css } from '@emotion/react'
import { BannerNameElement, CustomRenderElementProps } from '../custom-types'
import OpenColor from 'open-color'
import { Placeholder } from '../placeholder/placeholder'

export const BannerName = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<BannerNameElement>) => {
	return (
		<h1 css={styles} {...attributes}>
			<Placeholder element={element}>이름</Placeholder>
			{children}
		</h1>
	)
}

const styles = css`
	--font-size: 48px;
	--line-height: 1.5;
	color: ${OpenColor.gray[8]};
	position: relative;
`

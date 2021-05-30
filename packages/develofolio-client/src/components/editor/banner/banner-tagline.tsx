import React from 'react'
import { css } from '@emotion/react'
import { BannerTaglineElement, CustomRenderElementProps } from '../custom-types'
import OpenColor from 'open-color'
import { Placeholder } from '../placeholder/placeholder'

export const BannerTagline = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<BannerTaglineElement>) => {
	return (
		<h2 css={styles} {...attributes}>
			<Placeholder element={element}>직책</Placeholder>
			{children}
		</h2>
	)
}

const styles = css`
	--font-size: 24px;
	--line-height: 1.2;
	margin-top: 4px;
	font-weight: 500;
	color: ${OpenColor.gray[6]};
`

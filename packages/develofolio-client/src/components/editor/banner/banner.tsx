import { css } from '@emotion/react'
import Image from 'next/image'
import OpenColor from 'open-color'
import React from 'react'
import { BannerElement, CustomRenderElementProps } from '../custom-types'

export const Banner = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<BannerElement>) => {
	return (
		<div css={rootStyles}>
			<div css={leftStyles}>
				<div {...attributes}>{children}</div>
			</div>
			<div css={rightStyles} contentEditable={false}>
				{element.profile && (
					<Image src={`/images/${element.profile}`} width={400} height={300} />
				)}
			</div>
		</div>
	)
}

const rootStyles = css`
	background-color: ${OpenColor.gray[0]};
	margin-left: -32px;
	margin-right: -32px;
	display: flex;
	user-select: none;
`

const leftStyles = css`
	flex: 1 1 0;
	padding: 48px;
`

const rightStyles = css`
	box-sizing: content-box;
	user-select: none;
	padding-top: 48px;
	padding-right: 48px;
	padding-bottom: 48px;
	width: 400px;
	height: 300px;
`

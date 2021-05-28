import { css } from '@emotion/react'
import OpenColor from 'open-color'
import React from 'react'
import { Icon } from '~/components/base/icon'
import { BannerElement, CustomRenderElementProps } from '../custom-types'
import { Profile } from '../profile/profile'

export const Banner = ({
	attributes,
	children,
}: CustomRenderElementProps<BannerElement>) => {
	return (
		<div css={rootStyles}>
			<div css={leftStyles}>
				<div {...attributes}>{children}</div>
				<div contentEditable={false} css={linkWrapperStyles}>
					<a css={linkStyles}>
						<Icon type="Github" color={OpenColor.teal[6]} size={20} />
					</a>
					<a css={linkStyles}>
						<Icon type="Facebook" color={OpenColor.teal[6]} size={20} />
					</a>
					<a css={linkStyles}>
						<Icon type="Twitter" color={OpenColor.teal[6]} size={20} />
					</a>
					<a css={linkStyles}>
						<Icon type="StackOverflow" color={OpenColor.teal[6]} size={20} />
					</a>
				</div>
			</div>
			<div css={rightStyles} contentEditable={false}>
				<Profile />
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
	display: flex;
	flex-direction: column;
	justify-content: space-between;
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

const linkWrapperStyles = css`
	display: flex;
`

const linkStyles = css`
	display: flex;
	width: 32px;
	height: 32px;
	background-color: #ffffff;
	border-radius: 50%;
	cursor: pointer;
	justify-content: center;
	align-items: center;
	&:not(:last-of-type) {
		margin-right: 16px;
	}
	transition: background-color 0.2s;
	&:hover {
		background-color: ${OpenColor.gray[1]};
	}
`

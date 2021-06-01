import { css } from '@emotion/react'
import OpenColor from 'open-color'
import React, { useMemo } from 'react'
import { Icon } from '~/components/base/icon'

export const SocialLinks = () => {
	const placeholder = useMemo(
		() => (
			<>
				<div css={circle}>
					<Icon type="Github" color={OpenColor.teal[6]} size={20} />
				</div>
				<div css={circle}>
					<Icon type="Facebook" color={OpenColor.teal[6]} size={20} />
				</div>
				<div css={circle}>
					<Icon type="Twitter" color={OpenColor.teal[6]} size={20} />
				</div>
				<div css={circle}>
					<Icon type="StackOverflow" color={OpenColor.teal[6]} size={20} />
				</div>
				<div css={mask}>
					<Icon type="Pencil" color={OpenColor.gray[1]} size={24} />
				</div>
			</>
		),
		[]
	)

	return <div css={wrapper()}>{placeholder}</div>
}

const wrapper = () => css`
	display: flex;
	flex-wrap: wrap;
	gap: 16px;
	position: relative;
	cursor: pointer;
	&:hover {
		.css-${mask.name} {
			opacity: 1;
		}
	}
`

const circle = css`
	border: none;
	display: flex;
	width: 32px;
	height: 32px;
	background-color: #ffffff;
	border-radius: 50%;
	justify-content: center;
	align-items: center;
	opacity: 0.5;
`

const mask = css`
	position: absolute;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	background-color: rgba(0, 0, 0, 0.3);
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 4px;
	opacity: 0;
	transition: opacity 0.2s;
`

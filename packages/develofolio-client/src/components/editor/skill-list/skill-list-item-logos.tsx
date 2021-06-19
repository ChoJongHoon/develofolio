import { css } from '@emotion/react'
import OpenColor from 'open-color'
import React from 'react'
import { Icon } from '~/components/base/icon'
import {
	CustomRenderElementProps,
	SkillListItemLogosElement,
} from '../custom-types'

export const SkillListItemLogos = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<SkillListItemLogosElement>) => {
	const { logos } = element
	return (
		<div {...attributes} css={root}>
			<div contentEditable={false} css={list}>
				{logos.map((logo) => (
					<button key={logo.file} css={removeButton}>
						<img src={`/logos/${logo.file}`} css={imgStyles} />
						<div css={removeButtonMask}>
							<Icon type="TrashLine" size={20} color={OpenColor.red[7]} />
						</div>
					</button>
				))}
				<button css={addButton}>
					<Icon type="Plus" size={16} color={OpenColor.gray[5]} />
				</button>
			</div>
			{children}
		</div>
	)
}

const root = css`
	margin-bottom: 8px;
`
const removeButtonMask = css`
	position: absolute;
	top: 0px;
	left: 0px;
	bottom: 0px;
	right: 0px;
	background-color: rgba(0, 0, 0, 0.5);
	border-radius: 4px;
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 0;
	transition: opacity 0.2s;
`

const removeButton = css`
	position: relative;
	border: none;
	background: none;
	cursor: pointer;
	padding: 0px;
	display: inline-flex;

	&:hover .css-${removeButtonMask.name} {
		opacity: 1;
	}
`

const addButton = css`
	width: 24px;
	height: 24px;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	border: none;
	background: none;
	cursor: pointer;
	padding: 0px;
	border-radius: 4px;
	opacity: 0;
	transition: background-color 0.2s, opacity 0.2s;
	&:hover {
		background-color: ${OpenColor.gray[1]};
	}
`

const list = css`
	display: flex;
	gap: 8px;
	&:hover .css-${addButton.name} {
		opacity: 1;
	}
`

const imgStyles = css`
	height: 24px;
	display: block;
`

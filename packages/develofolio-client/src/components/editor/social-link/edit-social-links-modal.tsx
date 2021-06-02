import { css } from '@emotion/react'
import OpenColor from 'open-color'
import React, { useCallback, useState } from 'react'
import { Button } from '~/components/base/button'
import { Icon, IconType } from '~/components/base/icon'
import { DefaultModalProps, Modal } from '~/components/base/modal/modal'

export const EditSocialLinksModal = ({ onClose, open }: DefaultModalProps) => {
	return (
		<Modal
			open={open}
			onClose={onClose}
			title="SNS 링크"
			content={
				<div css={list}>
					<Input icon="Github" placeholder="GitHub" />
					<Input icon="StackOverflow" placeholder="Stack Overflow" />
					<Input icon="Facebook" placeholder="Facebook" />
					<Input icon="Twitter" placeholder="Twitter" />
				</div>
			}
			action={
				<Button type="button" color="teal" buttonProps={{}}>
					확인
				</Button>
			}
		/>
	)
}

const list = css`
	display: flex;
	flex-direction: column;
	gap: 8px;
`

interface InputProps {
	icon: IconType
	placeholder: string
}
const Input = ({ icon, placeholder }: InputProps) => {
	const [value, setValue] = useState('')

	const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
		(event) => {
			setValue(event.target.value)
		},
		[]
	)

	const isFill = value !== ''

	return (
		<div css={inputWrapper(isFill)}>
			<input
				css={inputStyles}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
			<Icon css={iconStyles} type={icon} size={18} />
		</div>
	)
}

const inputWrapper = (isFill: boolean) => css`
	position: relative;
	&:hover {
		& > .css-${inputStyles.name} {
			border-color: ${OpenColor.gray[5]};
		}
		& > .icon {
			fill: ${OpenColor.gray[5]};
		}
	}
	${isFill &&
	css`
		& > .css-${inputStyles.name} {
			border-color: ${OpenColor.teal[7]};
		}
		& > .icon {
			fill: ${OpenColor.teal[7]};
		}
		&:hover {
			& > .css-${inputStyles.name} {
				border-color: ${OpenColor.teal[8]};
			}
			& > .icon {
				fill: ${OpenColor.teal[8]};
			}
		}
	`}
`

const inputStyles = css`
	color: ${OpenColor.gray[7]};
	border: solid 1px ${OpenColor.gray[4]};
	border-radius: 4px;
	font-size: 16px;
	padding: 8px 8px 8px 30px;
	transition: border-color 0.2;
	width: 512px;
	::placeholder {
		color: ${OpenColor.gray[3]};
	}
	&:focus {
		outline: none;
		box-shadow: ${OpenColor.blue[0]} 0px 0px 0px 4px;
	}
`

const iconStyles = css`
	position: absolute;
	left: 6px;
	top: 50%;
	transform: translateY(-50%);
	transition: fill 0.2s;
	fill: ${OpenColor.gray[4]};
	pointer-events: none;
`

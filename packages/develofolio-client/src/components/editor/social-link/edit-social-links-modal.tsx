import { css } from '@emotion/react'
import OpenColor from 'open-color'
import React, { HTMLProps } from 'react'
import { Button } from '~/components/base/button'
import { Icon, IconType } from '~/components/base/icon'
import { DefaultModalProps, Modal } from '~/components/base/modal/modal'
import { Control, FieldError, useController, useForm } from 'react-hook-form'
import Validator from 'validator'

interface FormValues {
	github: string
	stackOverflow: string
	facebook: string
	twitter: string
}

export const EditSocialLinksModal = ({ onClose, open }: DefaultModalProps) => {
	const { control } = useForm<FormValues>({ mode: 'onChange' })

	return (
		<Modal
			open={open}
			onClose={onClose}
			title="SNS 링크"
			content={
				<div css={list}>
					<Input
						icon="Github"
						placeholder="GitHub"
						name="github"
						control={control}
						// {...register('github', {
						// 	validate: (value) => {
						// 		if (value && !Validator.isURL(value)) {
						// 			return '유효하지 않은 링크입니다.'
						// 		}
						// 	},
						// })}
						// error={errors.github}
					/>
					<Input
						icon="StackOverflow"
						placeholder="Stack Overflow"
						name="stackOverflow"
						control={control}
					/>
					<Input
						icon="Facebook"
						placeholder="Facebook"
						name="facebook"
						control={control}
					/>
					<Input
						icon="Twitter"
						placeholder="Twitter"
						name="twitter"
						control={control}
					/>
				</div>
			}
			action={
				<Button type="button" color="teal" size="l" buttonProps={{}}>
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

interface InputProps extends HTMLProps<HTMLInputElement> {
	icon: IconType
	name: keyof FormValues
	error?: FieldError
	control: Control<FormValues>
}
const Input = ({ icon, control, name, ...props }: InputProps) => {
	const {
		field,
		fieldState: { error, invalid },
	} = useController({
		name,
		control,
		rules: {
			validate: (value) => {
				if (!Validator.isURL(value)) {
					return '유효하지 않은 링크입니다.'
				}
			},
		},
		defaultValue: '',
	})

	const isValid = field.value !== '' && !invalid

	return (
		<div css={inputWrapper}>
			<div css={inputBoxWrapper(isValid)}>
				<input css={inputStyles} {...props} {...field} />
				<Icon css={iconStyles} type={icon} size={18} />
			</div>
			{error && <span css={errorMessage}>{error?.message}</span>}
		</div>
	)
}

const inputWrapper = css``

const inputBoxWrapper = (isValid: boolean) => css`
	position: relative;
	&:hover {
		& > .css-${inputStyles.name} {
			border-color: ${OpenColor.gray[5]};
		}
		& > .icon {
			fill: ${OpenColor.gray[5]};
		}
	}
	${isValid &&
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

const errorMessage = css`
	color: ${OpenColor.red[7]};
	font-size: 12px;
	margin-top: 4px;
`

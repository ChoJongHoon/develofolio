import { css } from '@emotion/react'
import OpenColor from 'open-color'
import React, { HTMLProps, useEffect } from 'react'
import { Button } from '~/components/base/button'
import { Icon, IconType } from '~/components/base/icon'
import { DefaultModalProps, Modal } from '~/components/base/modal/modal'
import { Control, FieldError, useController, useForm } from 'react-hook-form'
import Validator from 'validator'
import { useMutation, useQuery } from '@apollo/client'
import { useDebounceEffect } from '~/lib/hooks/use-debounce-effect'
import { useDispatch } from 'react-redux'
import { setSaved, setSaving } from '../editor.reducer'

interface FormValues {
	github: string
	stackOverflow: string
	facebook: string
	twitter: string
}

// const NAME_MAP: { [key in keyof FormValues]: SocialLinkName } = {
// 	github: SocialLinkName.Github,
// 	stackOverflow: SocialLinkName.StackOverflow,
// 	facebook: SocialLinkName.Facebook,
// 	twitter: SocialLinkName.Twitter,
// }

export const EditSocialLinksModal = ({ onClose, open }: DefaultModalProps) => {
	// const { data } = useQuery(GetSocialLinksDocument)
	// const socialLinks = data?.me.socialLinks

	const { control } = useForm<FormValues>({ mode: 'onChange' })

	return (
		<Modal
			open={open}
			onClose={onClose}
			title="SNS 링크"
			content={
				<div css={list}>
					{/* <Input
						icon="Github"
						placeholder="GitHub"
						name="github"
						control={control}
						defaultValue={socialLinks?.github}
					/>
					<Input
						icon="StackOverflow"
						placeholder="Stack Overflow"
						name="stackOverflow"
						control={control}
						defaultValue={socialLinks?.stackOverflow}
					/>
					<Input
						icon="Facebook"
						placeholder="Facebook"
						name="facebook"
						control={control}
						defaultValue={socialLinks?.facebook}
					/>
					<Input
						icon="Twitter"
						placeholder="Twitter"
						name="twitter"
						control={control}
						defaultValue={socialLinks?.twitter}
					/> */}
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

// interface InputProps extends Omit<HTMLProps<HTMLInputElement>, 'defaultValue'> {
// 	icon: IconType
// 	name: keyof FormValues
// 	error?: FieldError
// 	control: Control<FormValues>
// 	defaultValue?: string | null
// }
// const Input = ({
// 	icon,
// 	control,
// 	name,
// 	defaultValue = '',
// 	...props
// }: InputProps) => {
// 	const dispatch = useDispatch()
// 	const [update] = useMutation(UpdateSocialLinkDocument, {
// 		onCompleted: () => {
// 			dispatch(setSaved(true))
// 			dispatch(setSaving(false))
// 		},
// 	})
// 	const {
// 		field,
// 		fieldState: { error, invalid },
// 		formState: { isDirty },
// 	} = useController({
// 		name,
// 		control,
// 		rules: {
// 			validate: (value) => {
// 				if (!Validator.isURL(value)) {
// 					return '유효하지 않은 링크입니다.'
// 				}
// 			},
// 		},
// 		defaultValue: defaultValue || '',
// 	})

// 	useEffect(() => {
// 		if (isDirty) {
// 			dispatch(setSaved(false))
// 		}
// 	}, [dispatch, isDirty])
// 	useDebounceEffect(
// 		() => {
// 			if (isDirty && defaultValue !== field.value) {
// 				console.log(`field.value`, field.value)
// 				dispatch(setSaving(true))
// 				update({
// 					variables: {
// 						name: NAME_MAP[name],
// 						link: field.value,
// 					},
// 				})
// 			}
// 		},
// 		300,
// 		[field.value, isDirty]
// 	)

// 	const isValid = field.value !== '' && !invalid

// 	return (
// 		<div css={inputWrapper}>
// 			<div css={inputBoxWrapper(isValid)}>
// 				<input css={inputStyles} {...props} {...field} />
// 				<Icon css={iconStyles} type={icon} size={18} />
// 			</div>
// 			{error && <span css={errorMessage}>{error?.message}</span>}
// 		</div>
// 	)
// }

// const inputWrapper = css``

// const inputBoxWrapper = (isValid: boolean) => css`
// 	position: relative;
// 	&:hover {
// 		& > .css-${inputStyles.name} {
// 			border-color: ${OpenColor.gray[5]};
// 		}
// 		& > .icon {
// 			fill: ${OpenColor.gray[5]};
// 		}
// 	}
// 	${isValid &&
// 	css`
// 		& > .css-${inputStyles.name} {
// 			border-color: ${OpenColor.teal[7]};
// 		}
// 		& > .icon {
// 			fill: ${OpenColor.teal[7]};
// 		}
// 		&:hover {
// 			& > .css-${inputStyles.name} {
// 				border-color: ${OpenColor.teal[8]};
// 			}
// 			& > .icon {
// 				fill: ${OpenColor.teal[8]};
// 			}
// 		}
// 	`}
// `

// const inputStyles = css`
// 	color: ${OpenColor.gray[7]};
// 	border: solid 1px ${OpenColor.gray[4]};
// 	border-radius: 4px;
// 	font-size: 16px;
// 	padding: 8px 8px 8px 30px;
// 	transition: border-color 0.2;
// 	width: 512px;
// 	::placeholder {
// 		color: ${OpenColor.gray[3]};
// 	}
// 	&:focus {
// 		outline: none;
// 		box-shadow: ${OpenColor.blue[0]} 0px 0px 0px 4px;
// 	}
// `

// const iconStyles = css`
// 	position: absolute;
// 	left: 6px;
// 	top: 50%;
// 	transform: translateY(-50%);
// 	transition: fill 0.2s;
// 	fill: ${OpenColor.gray[4]};
// 	pointer-events: none;
// `

// const errorMessage = css`
// 	color: ${OpenColor.red[7]};
// 	font-size: 12px;
// 	margin-top: 4px;
// `

import { css } from '@emotion/react'
import OpenColor from 'open-color'
import React, { HTMLProps, useCallback, useEffect } from 'react'
import { Button } from '~/components/base/button'
import { Icon, IconType } from '~/components/base/icon'
import { DefaultModalProps, Modal } from '~/components/base/modal/modal'
import { Control, FieldError, useController, useForm } from 'react-hook-form'
import Validator from 'validator'
import { useMutation, useQuery } from '@apollo/client'
import { useDebounceEffect } from '~/lib/hooks/use-debounce-effect'
import { useDispatch } from 'react-redux'
import { setSaved, setSaving } from '../editor.reducer'
import {
	MyPageDocument,
	MyPageSocialLinksDocument,
	SaveSocialLinkDocument,
	SocialLinkPartsFragment,
	SocialLinkType,
} from '~/graphql/typed-document-nodes.generated'
import { cloneDeep } from 'lodash'

interface FormValues {
	[SocialLinkType.Github]: string
	[SocialLinkType.StackOverflow]: string
	[SocialLinkType.Facebook]: string
	[SocialLinkType.Twitter]: string
}

export const EditSocialLinksModal = ({ onClose, open }: DefaultModalProps) => {
	const { data } = useQuery(MyPageSocialLinksDocument)
	const socialLinks = data?.page?.socialLinks

	const { control } = useForm<FormValues>({ mode: 'onChange' })

	const getSocialLink = useCallback(
		(type: SocialLinkType) =>
			socialLinks?.find((socialLink) => socialLink.type === type)?.link,
		[socialLinks]
	)

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
						type={SocialLinkType.Github}
						control={control}
						defaultValue={getSocialLink(SocialLinkType.Github)}
					/>
					<Input
						icon="StackOverflow"
						placeholder="Stack Overflow"
						type={SocialLinkType.StackOverflow}
						control={control}
						defaultValue={getSocialLink(SocialLinkType.StackOverflow)}
					/>
					<Input
						icon="Facebook"
						placeholder="Facebook"
						type={SocialLinkType.Facebook}
						control={control}
						defaultValue={getSocialLink(SocialLinkType.Facebook)}
					/>
					<Input
						icon="Twitter"
						placeholder="Twitter"
						type={SocialLinkType.Twitter}
						control={control}
						defaultValue={getSocialLink(SocialLinkType.Twitter)}
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

interface InputProps extends Omit<HTMLProps<HTMLInputElement>, 'defaultValue'> {
	icon: IconType
	type: keyof FormValues
	error?: FieldError
	control: Control<FormValues>
	defaultValue?: string | null
}
const Input = ({
	icon,
	control,
	type,
	defaultValue = '',
	...props
}: InputProps) => {
	const { data: pageData } = useQuery(MyPageDocument)
	const dispatch = useDispatch()
	const [save] = useMutation(SaveSocialLinkDocument, {
		update: (cache, { data: updateData }) => {
			if (!pageData || !pageData.page) {
				return
			}
			cache.modify({
				id: cache.identify(pageData.page),
				fields: {
					socialLinks: (prev: SocialLinkPartsFragment[]) => {
						const next = cloneDeep(prev)
						const index = next.findIndex((item) => item.type === type)
						const newSocialLink = updateData?.saveSocialLink
						if (!newSocialLink) {
							if (index !== -1) {
								next.splice(index, 1)
							}
						} else {
							if (index !== -1) {
								next.splice(index, 1, newSocialLink)
							} else {
								next.push(newSocialLink)
							}
						}
						return next
					},
				},
			})
		},
		onCompleted: () => {
			dispatch(setSaved(true))
			dispatch(setSaving(false))
		},
	})
	const {
		field,
		fieldState: { error, invalid },
		formState: { isDirty },
	} = useController({
		name: type,
		control,
		rules: {
			validate: (value) => {
				if (value && !Validator.isURL(value)) {
					return '유효하지 않은 링크입니다.'
				}
			},
		},
		defaultValue: defaultValue || '',
	})

	useEffect(() => {
		if (isDirty) {
			dispatch(setSaved(false))
		}
	}, [dispatch, isDirty])
	useDebounceEffect(
		() => {
			if (isDirty && defaultValue !== field.value) {
				dispatch(setSaving(true))
				save({
					variables: {
						type: type,
						link: field.value,
					},
				})
			}
		},
		300,
		[field.value, isDirty]
	)

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

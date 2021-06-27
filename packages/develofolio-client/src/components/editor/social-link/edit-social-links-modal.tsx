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
import { useStyletron } from 'styletron-react'
import { useHover } from '~/lib/hooks/use-hover'
import { border, padding, transitions } from 'polished'

interface FormValues {
	[SocialLinkType.Github]: string
	[SocialLinkType.StackOverflow]: string
	[SocialLinkType.Facebook]: string
	[SocialLinkType.Twitter]: string
}

export const EditSocialLinksModal = ({ onClose, open }: DefaultModalProps) => {
	const [css] = useStyletron()
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
				<div
					className={css({
						display: 'flex',
						flexDirection: 'column',
						gap: '8px',
					})}
				>
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
	const [css] = useStyletron()
	const [hoverRef, isHovered] = useHover<HTMLDivElement>()
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
		<div>
			<div
				ref={hoverRef}
				className={css({
					position: 'relative',
				})}
			>
				<input
					className={css({
						color: OpenColor.gray[7],
						...border(
							'1px',
							'solid',
							isValid
								? isHovered
									? OpenColor.teal[8]
									: OpenColor.teal[6]
								: isHovered
								? OpenColor.gray[5]
								: OpenColor.gray[4]
						),
						borderRadius: '4px',
						fontSize: '16px',
						...padding('8px', '8px', '8px', '30px'),
						...transitions(['border-color'], '0.2s'),
						width: '512px',
						'::placeholder': {
							color: OpenColor.gray[3],
						},
						':focus': {
							outline: 'none',
							boxShadow: `${OpenColor.blue[0]} 0px 0px 0px 4px`,
						},
					})}
					{...props}
					{...field}
				/>
				<Icon
					type={icon}
					size={18}
					className={css({
						position: 'absolute',
						left: '6px',
						top: '50%',
						transform: 'translateY(-50%)',
						...transitions(['fill'], '0,2s'),
						pointerEvents: 'none',
						fill: isValid
							? isHovered
								? OpenColor.teal[8]
								: OpenColor.teal[6]
							: isHovered
							? OpenColor.gray[5]
							: OpenColor.gray[4],
					})}
				/>
			</div>
			{error && (
				<span
					className={css({
						color: OpenColor.red[7],
						fontSize: '12px',
						marginTop: '4px',
					})}
				>
					{error?.message}
				</span>
			)}
		</div>
	)
}

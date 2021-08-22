import React from 'react'
import { styled } from 'baseui'
import OpenColor from 'open-color'
import { borderRadius, padding, transitions } from 'polished'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { StyleObject, useStyletron } from 'styletron-react'
import { ProgressBar } from 'baseui/progress-bar'
import Image from 'next/image'
import { hexToRGB } from '~/styles/hex-to-rgb'
import ImagesIllust from 'public/images/illust/images.svg'
import { Icon } from './icon'
import { useHover } from '~/hooks/use-hover'
import mergeRefs from 'react-merge-refs'
import classNames from 'classnames'
import { generateFileUrl } from '~/utils/generate-file-url'
import { merge } from 'lodash'

interface ImageUploaderProps {
	onDrop: (file: File) => Promise<void>
	onDelete?: () => void
	image?: string | null
	size?: { width: number; height: number }
	progressAmount?: number
	className?: string
	placeholder?: React.ReactNode
	overrides?: {
		Root?: {
			style?: StyleObject
		}
		Image?: {
			style?: StyleObject
		}
		Preview?: {
			style?: StyleObject
		}
		Mask?: {
			style?: StyleObject
		}
		DeleteButton?: {
			style?: StyleObject
		}
	}
}

export const ImageUploader = ({
	onDrop: _onDrop,
	onDelete: _onDelete,
	image,
	progressAmount,
	className,
	placeholder = '이미지를 업로드해주세요...',
	overrides,
	size,
}: ImageUploaderProps) => {
	const [css] = useStyletron()
	const [hoverRef, isHovered] = useHover<HTMLDivElement>()
	const [loading, setLoading] = useState(false)
	const [preview, setPreview] = useState<string | null>(null)
	const onDrop = useCallback(
		async (acceptedFiles: File[]) => {
			setLoading(true)
			const file = acceptedFiles[0]
			if (!file) {
				return
			}

			const reader = new FileReader()
			reader.onload = (event) => {
				if (typeof event.target?.result === 'string') {
					setPreview(event.target.result)
				}
			}
			reader.readAsDataURL(file)

			await _onDrop(file)

			setLoading(false)
		},
		[_onDrop]
	)

	const onDelete = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
		(event) => {
			event.stopPropagation()
			_onDelete?.()
		},
		[_onDelete]
	)

	const { getInputProps, getRootProps, isDragActive, rootRef, inputRef } =
		useDropzone({
			onDrop,
			multiple: false,
			accept: 'image/*',
		})

	const Mask = styled(
		'div',
		merge<StyleObject, StyleObject>(
			{
				position: 'absolute',
				top: '0px',
				left: '0px',
				width: '100%',
				height: '100%',
				backgroundColor: hexToRGB(OpenColor.gray[8], 0.7),
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			},
			overrides?.Mask?.style ?? {}
		)
	)

	return (
		<div
			{...getRootProps({
				className: classNames(
					css(
						merge<StyleObject, StyleObject>(
							{
								width: '100%',
								height: '100%',
								borderWidth: '2px',
								borderColor: OpenColor.gray[5],
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: image ? 'none' : OpenColor.gray[1],
								cursor: 'pointer',
								...transitions(['background-color'], '0.2s'),
								position: 'relative',
								':hover': {
									backgroundColor: OpenColor.gray[2],
								},
								borderStyle: preview || image ? 'none' : 'dashed',
							},
							overrides?.Root?.style ?? {}
						)
					),
					className
				),
			})}
			ref={mergeRefs([rootRef, hoverRef])}
		>
			{image &&
				!loading &&
				(size ? (
					<Image
						src={generateFileUrl(image, size)}
						alt="Profile"
						objectFit="cover"
						width={size.width}
						height={size.height}
						className={css({
							...(overrides?.Image?.style ?? {}),
						})}
					/>
				) : (
					<Image
						src={generateFileUrl(image)}
						layout="fill"
						alt="Profile"
						objectFit="cover"
						className={css({
							...(overrides?.Image?.style ?? {}),
						})}
					/>
				))}
			{!image &&
				!loading &&
				(typeof placeholder === 'string' ? (
					<Message>{placeholder}</Message>
				) : (
					placeholder
				))}
			{loading && (
				<>
					{preview && (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={preview}
							className={css(
								merge<StyleObject, StyleObject>(
									{
										width: '100%',
										height: '100%',
										objectFit: 'cover',
									},
									overrides?.Preview?.style ?? {}
								)
							)}
							alt="Preview"
						/>
					)}
					<Mask>
						{progressAmount != null && (
							<ProgressBar
								value={progressAmount}
								overrides={{
									BarProgress: {
										style: {
											backgroundColor: OpenColor.teal[7],
										},
									},
								}}
							/>
						)}
					</Mask>
				</>
			)}
			{isDragActive && (
				<Mask>
					<ImagesIllust
						width="156px"
						className={css({ marginBottom: '16px' })}
					/>
					<span
						className={css({
							color: OpenColor.white,
							fontWeight: 700,
							fontSize: '26px',
						})}
					>
						이미지 업로드!
					</span>
				</Mask>
			)}
			{image && _onDelete && (
				<button
					className={css(
						merge<StyleObject, StyleObject>(
							{
								cursor: 'pointer',
								backgroundColor: OpenColor.red[7],
								border: 'none',
								...borderRadius('top', '4px'),
								...borderRadius('bottom', '4px'),
								...padding('2px'),
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								opacity: isHovered ? 1 : 0,
								position: 'absolute',
								top: '8px',
								right: '8px',
								...transitions(['background-color', 'opacity'], '0.2s'),
								':hover': {
									backgroundColor: OpenColor.red[6],
								},
								':active': {
									backgroundColor: OpenColor.red[8],
								},
							},
							overrides?.DeleteButton?.style ?? {}
						)
					)}
					onClick={onDelete}
				>
					<Icon type="TrashLine" color="white" size={18} />
				</button>
			)}
			<HiddenInput {...getInputProps()} ref={inputRef} />
		</div>
	)
}

const Message = styled('span', { color: OpenColor.gray[5] })

const HiddenInput = styled('input', { display: 'none' })

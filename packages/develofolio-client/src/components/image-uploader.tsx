import React from 'react'
import { styled } from 'baseui'
import OpenColor from 'open-color'
import { padding, transitions } from 'polished'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useStyletron } from 'styletron-react'
import { ProgressBar } from 'baseui/progress-bar'
import Image from 'next/image'
import { generateImagePath } from '~/utils/generate-image-path'
import { hexToRGB } from '~/styles/hex-to-rgb'
import ImagesIllust from 'public/images/illust/images.svg'
import { Icon } from './icon'
import { useHover } from '~/hooks/use-hover'
import mergeRefs from 'react-merge-refs'

interface ImageUploaderProps {
	onDrop: (file: File) => Promise<void>
	onDelete?: () => void
	image?: string | null
	progressAmount?: number
}

export const ImageUploader = ({
	onDrop: _onDrop,
	onDelete: _onDelete,
	image,
	progressAmount,
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

	return (
		<Root
			{...getRootProps()}
			ref={mergeRefs([rootRef, hoverRef])}
			className={css({
				borderStyle: preview || image ? 'none' : 'dashed',
			})}
		>
			{image && !loading && (
				<Image
					src={generateImagePath(image)}
					layout="fill"
					alt="Profile"
					objectFit="cover"
				/>
			)}
			{!image && !loading && <Message>이미지를 업로드해주세요...</Message>}
			{loading && (
				<>
					{preview && <Preview src={preview} />}
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
			{image && onDelete && (
				<button
					className={css({
						cursor: 'pointer',
						backgroundColor: OpenColor.red[7],
						border: 'none',
						borderRadius: '4px',
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
					})}
					onClick={onDelete}
				>
					<Icon type="TrashLine" color="white" size={18} />
				</button>
			)}
			<HiddenInput {...getInputProps()} ref={inputRef} />
		</Root>
	)
}

const Root = styled('div', {
	width: '100%',
	height: '100%',
	borderWidth: '2px',
	borderColor: OpenColor.gray[5],
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: OpenColor.gray[1],
	cursor: 'pointer',
	...transitions(['background-color'], '0.2s'),
	position: 'relative',
	':hover': {
		backgroundColor: OpenColor.gray[2],
	},
})

const Message = styled('span', { color: OpenColor.gray[5] })

const HiddenInput = styled('input', { display: 'none' })

const Preview = styled('img', {
	width: '100%',
	height: '100%',
	objectFit: 'cover',
})

const Mask = styled('div', {
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
})

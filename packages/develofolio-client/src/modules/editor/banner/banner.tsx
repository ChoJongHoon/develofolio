import { useApolloClient, useMutation } from '@apollo/client'
import axios from 'axios'
import { StatefulPopover } from 'baseui/popover'
import Image from 'next/image'
import OpenColor from 'open-color'
import { padding, transitions } from 'polished'
import React from 'react'
import { Transforms } from 'slate'
import { ReactEditor, useSlateStatic } from 'slate-react'
import { useStyletron } from 'styletron-react'
import { Icon, IconType } from '~/components/icon'
import {
	CreateFileDocument,
	GenerateUploadUrlDocument,
	UploadType,
} from '~/graphql/document.generated'
import { useFileLoad } from '~/hooks/use-file-load'
import { useHover } from '~/hooks/use-hover'
import { generateImagePath } from '~/utils/generate-image-path'
import { BannerElement, CustomRenderElementProps } from '../custom-types'
import { EditLinkPopover } from '../social-link/edit-link-popover'

const LINKS: Array<{
	name: keyof BannerElement['links']
	icon: IconType
}> = [
	{ name: 'github', icon: 'Github' },
	// { name: 'linkedIn', con: 'LinkedIn' },
	{ name: 'stackOverflow', icon: 'StackOverflow' },
	{ name: 'facebook', icon: 'Facebook' },
	{ name: 'twitter', icon: 'Twitter' },
]

export const Banner = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<BannerElement>) => {
	const client = useApolloClient()
	const [css] = useStyletron()
	const [profileHoverRef, isProfileHovered] = useHover<HTMLDivElement>()
	const [linkHoverRef, isLinkHovered] = useHover<HTMLDivElement>()
	const editor = useSlateStatic()
	const [createFile] = useMutation(CreateFileDocument)
	const { onLoad } = useFileLoad({ accept: 'image/*' })
	const onAddProfle = async () => {
		const file = await onLoad()

		if (!file) return
		const {
			data: {
				generateUploadPath: { key, url },
			},
		} = await client.query({
			query: GenerateUploadUrlDocument,
			variables: {
				filename: file.name,
				type: UploadType.Profile,
			},
		})

		await axios.put(url, file, {
			headers: {
				'Content-Type': file.type,
			},
		})

		await createFile({
			variables: {
				key,
			},
		})

		const path = ReactEditor.findPath(editor, element)
		Transforms.setNodes<BannerElement>(editor, { profile: key }, { at: path })
	}

	const onRemoveProfile = () => {
		const path = ReactEditor.findPath(editor, element)
		Transforms.setNodes<BannerElement>(editor, { profile: null }, { at: path })
	}
	return (
		<div
			className={css({
				backgroundColor: OpenColor.gray[0],
				marginLeft: '-32px',
				marginRight: '-32px',
				display: 'flex',
				userSelect: 'none',
			})}
		>
			<div
				className={css({
					flex: '1 1 0',
					padding: '48px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
				})}
			>
				<div {...attributes}>{children}</div>
				<div
					contentEditable={false}
					className={css({ userSelect: 'none', display: 'flex' })}
				>
					{LINKS.map((link) => (
						<StatefulPopover
							key={link.name}
							content={({ close }) => (
								<EditLinkPopover
									defaultValue={element.links[link.name]}
									onChange={(value) => {
										const path = ReactEditor.findPath(editor, element)
										const newProperties: Partial<BannerElement> = {
											links: {
												...element.links,
												[link.name]: value,
											},
										}
										Transforms.setNodes(editor, newProperties, { at: path })
									}}
								/>
							)}
							placement="bottomLeft"
							focusLock
						>
							<button
								className={css({
									backgroundColor: OpenColor.white,
									border: 'none',
									width: '28px',
									height: '28px',
									borderRadius: '50%',
									cursor: 'pointer',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									opacity: element.links[link.name] ? 1 : 0.5,
									...padding('0px'),
									...transitions(['opacity'], '0.2s'),
									':hover': {
										opacity: element.links[link.name] ? 1 : 0.8,
									},
									':not(:last-child)': {
										marginRight: '8px',
									},
								})}
							>
								<Icon type={link.icon} color={OpenColor.teal[7]} size={20} />
							</button>
						</StatefulPopover>
					))}
				</div>
			</div>
			<div
				className={css({
					boxSizing: 'content-box',
					userSelect: 'none',
					paddingTop: '48px',
					paddingRight: '48px',
					paddingBottom: '48px',
					width: '400px',
					height: '300px',
					position: 'relative',
				})}
				contentEditable={false}
			>
				<div
					className={css({
						position: 'relative',
						width: '100%',
						height: '100%',
					})}
					ref={profileHoverRef}
				>
					{element.profile ? (
						<>
							<Image
								className={css({
									...transitions(['opacity'], '0.2s'),
									opacity: isProfileHovered ? 0.7 : 1,
								})}
								src={generateImagePath(element.profile)}
								objectFit="cover"
								alt="Profile"
								width={400}
								height={300}
							/>
							<button
								className={css({
									cursor: 'pointer',
									backgroundColor: OpenColor.red[7],
									border: 'none',
									borderRadius: '50%',
									width: '24px',
									height: '24px',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									opacity: isProfileHovered ? 1 : 0,
									position: 'absolute',
									top: '8px',
									right: '8px',
									...transitions(['background-color'], '0.2s'),
									...padding('0px'),
									':hover': {
										backgroundColor: OpenColor.red[6],
									},
									':active': {
										backgroundColor: OpenColor.red[8],
									},
								})}
								onClick={onRemoveProfile}
							>
								<Icon type="TrashLine" color="white" size={16} />
							</button>
						</>
					) : (
						<>
							<button
								className={css({
									backgroundColor: OpenColor.gray[1],
									width: '100%',
									height: '100%',
									border: 'none',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									cursor: 'pointer',
									...transitions(['background-color'], '0.2s'),
									':hover': {
										backgroundColor: OpenColor.gray[2],
									},
								})}
								onClick={onAddProfle}
							>
								<Icon
									type="UserAddOutlined"
									size={64}
									color={OpenColor.gray[5]}
								/>
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

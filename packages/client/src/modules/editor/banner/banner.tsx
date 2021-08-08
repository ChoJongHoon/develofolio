import { useApolloClient, useMutation } from '@apollo/client'
import axios from 'axios'
import { StatefulPopover } from 'baseui/popover'
import OpenColor from 'open-color'
import { padding, transitions } from 'polished'
import { useState } from 'react'
import { Transforms } from 'slate'
import { ReactEditor, useSlateStatic } from 'slate-react'
import { useStyletron } from 'styletron-react'
import { Icon, IconType } from '~/components/icon'
import {
	CreateFileDocument,
	GenerateUploadUrlDocument,
	UploadType,
} from '~/graphql/document.generated'
import { BannerElement, CustomRenderElementProps } from '../custom-types'
import { EditLinkPopover } from '../social-link/edit-link-popover'
import { ImageUploader } from '~/components/image-uploader'
import { Cell, Grid } from 'baseui/layout-grid'
import { AspectRatioBox, AspectRatioBoxBody } from 'baseui/aspect-ratio-box'

export const generateBannerElement = (): BannerElement => ({
	type: 'banner',
	links: {},
	children: [
		{ type: 'banner-name', children: [{ text: '' }] },
		{ type: 'banner-tagline', children: [{ text: '' }] },
		{ type: 'banner-bio', children: [{ text: '' }] },
	],
})

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
	const editor = useSlateStatic()

	const [createFile] = useMutation(CreateFileDocument)

	const [progress, setProgress] = useState(0)

	const onAddProfle = async (file: File) => {
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
			onUploadProgress: ({ loaded, total }: ProgressEvent) => {
				setProgress((loaded / total) * 100)
			},
		})

		await createFile({
			variables: {
				key,
			},
		})
		setProgress(0)
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
			})}
		>
			<Grid>
				<Cell
					span={[4, 4, 5]}
					overrides={{
						Cell: {
							style: {
								paddingTop: '48px',
								paddingBottom: '48px',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
							},
						},
					}}
					skip={[0, 0, 1]}
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
										onClose={close}
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
				</Cell>
				<Cell
					span={[4, 4, 5]}
					overrides={{
						Cell: {
							style: {
								paddingTop: '48px',
								paddingBottom: '48px',
							},
						},
					}}
				>
					<AspectRatioBox aspectRatio={4 / 3}>
						<AspectRatioBoxBody>
							<div
								className={css({
									position: 'relative',
									width: '100%',
									height: '100%',
								})}
								contentEditable={false}
							>
								<ImageUploader
									onDrop={onAddProfle}
									onDelete={onRemoveProfile}
									image={element.profile}
									progressAmount={progress}
								/>
							</div>
						</AspectRatioBoxBody>
					</AspectRatioBox>
				</Cell>
			</Grid>
		</div>
	)
}

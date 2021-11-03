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
import { mediaQuery } from '~/styles/responsive'
import { nanoid } from 'nanoid'
import { LabelMedium } from 'baseui/typography'

export const generateBannerElement = (): BannerElement => ({
	id: nanoid(),
	type: 'banner',
	links: {},
	children: [
		{ id: nanoid(), type: 'banner-name', children: [{ text: '' }] },
		{ id: nanoid(), type: 'banner-tagline', children: [{ text: '' }] },
		{ id: nanoid(), type: 'banner-bio', children: [{ text: '' }] },
	],
})

export const LINKS: Array<{
	name: keyof BannerElement['links']
	icon: IconType
}> = [
	{ name: 'github', icon: 'GithubCircle' },
	{ name: 'velog', icon: 'VelogCircle' },
	{ name: 'linkedIn', icon: 'LinkedinCircle' },
	{ name: 'stackOverflow', icon: 'StackoverflowCircle' },
	{ name: 'facebook', icon: 'FacebookCircle' },
	{ name: 'twitter', icon: 'TwitterCircle' },
	{ name: 'youtube', icon: 'YoutubeCircle' },
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
				<Cell span={[4, 4, 5]} skip={[0, 0, 1]}>
					<div
						className={css({
							paddingTop: '48px',
							paddingBottom: '48px',
							display: 'flex',
							flexDirection: 'column',
							height: '100%',
						})}
					>
						<div
							{...attributes}
							className={css({
								flexGrow: 1,
							})}
						>
							{children}
						</div>
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
											backgroundColor: 'transparent',
											border: 'none',
											cursor: 'pointer',
											display: 'flex',
											opacity: element.links[link.name] ? 1 : 0.4,
											...padding('0px'),
											transitionProperty: 'opacity',
											transitionDuration: '0.2s',
											':hover': {
												opacity: 1,
											},
											':not(:last-child)': {
												marginRight: '8px',
											},
										})}
									>
										<Icon type={link.icon} size={24} />
									</button>
								</StatefulPopover>
							))}
						</div>
					</div>
				</Cell>
				<Cell
					span={[4, 4, 5]}
					overrides={{
						Cell: {
							style: {
								paddingBottom: '48px',
								[mediaQuery('SMALL')]: {
									paddingTop: '48px',
								},
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
									placeholder={
										<div>
											<LabelMedium
												color={OpenColor.gray[5]}
												$style={{ textAlign: 'center' }}
											>
												프로필 이미지를 업로드해주세요.
												<br />
												512px x 384px (4:3)
											</LabelMedium>
										</div>
									}
								/>
							</div>
						</AspectRatioBoxBody>
					</AspectRatioBox>
				</Cell>
			</Grid>
		</div>
	)
}

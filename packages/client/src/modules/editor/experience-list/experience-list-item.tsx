import { useStyletron } from 'styletron-react'
import {
	CustomRenderElementProps,
	ExperienceListItemElement,
} from '../custom-types'
import { Cell } from 'baseui/layout-grid'
import { nanoid } from 'nanoid'
import { generateExperienceListItemNameElement } from './experience-list-item-name'
import { generateExperienceListItemDescriptionElement } from './experience-list-item-description'
import { generateExperienceListItemPeriodElement } from './experience-list-item-period'
import { borderRadius, padding, transitions } from 'polished'
import OpenColor from 'open-color'
import { ReactEditor, useSlateStatic } from 'slate-react'
import { Transforms } from 'slate'
import { Icon } from '~/components/icon'
import { useHover } from '~/hooks/use-hover'
import mergeRefs from 'react-merge-refs'
import { ImageUploader } from '~/components/image-uploader'
import { useCallback, useState } from 'react'
import {
	GenerateUploadUrlDocument,
	UploadType,
} from '~/graphql/document.generated'
import { useApolloClient } from '@apollo/client'
import axios from 'axios'

export const generateExperienceListItemElement =
	(): ExperienceListItemElement => ({
		id: nanoid(),
		type: 'experience-list-item',
		logo: null,
		children: [
			generateExperienceListItemNameElement(),
			generateExperienceListItemDescriptionElement(),
			generateExperienceListItemPeriodElement(),
		],
	})

export const ExperienceListItem = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<ExperienceListItemElement>) => {
	const client = useApolloClient()
	const [css] = useStyletron()
	const editor = useSlateStatic()
	const [hoverRef, isHovered] = useHover<HTMLDivElement>()

	const [progress, setProgress] = useState(0)
	const onAddLogo = useCallback(
		async (file: File) => {
			const {
				data: {
					generateUploadPath: { key, url },
				},
			} = await client.query({
				query: GenerateUploadUrlDocument,
				variables: {
					type: UploadType.Experience,
					filename: file.name,
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

			const path = ReactEditor.findPath(editor, element)
			const newProperties: Partial<ExperienceListItemElement> = {
				logo: key,
			}
			Transforms.setNodes(editor, newProperties, { at: path })
		},
		[client, editor, element]
	)
	const onRemoveLogo = useCallback(() => {
		const path = ReactEditor.findPath(editor, element)
		Transforms.setNodes<ExperienceListItemElement>(
			editor,
			{ logo: null },
			{ at: path }
		)
	}, [editor, element])

	return (
		<Cell span={[4, 8, 12]}>
			<div
				{...attributes}
				ref={mergeRefs([hoverRef, attributes.ref])}
				className={css({
					display: 'flex',
					alignItems: 'center',
					borderBottomStyle: 'solid',
					borderBottomWidth: '1px',
					borderBottomColor: OpenColor.gray[3],
					position: 'relative',
				})}
			>
				<div
					contentEditable={false}
					className={css({
						display: 'flex',
						marginRight: '16px',
						...padding('8px'),
					})}
				>
					<ImageUploader
						overrides={{
							Root: {
								style: {
									width: '72px',
									height: '72px',
									...borderRadius('top', '50%'),
									...borderRadius('bottom', '50%'),
								},
							},
							Image: {
								style: {
									...borderRadius('top', '50%'),
									...borderRadius('bottom', '50%'),
								},
							},
							Preview: {
								style: {
									...borderRadius('top', '50%'),
									...borderRadius('bottom', '50%'),
								},
							},
							Mask: {
								style: {
									...borderRadius('top', '50%'),
									...borderRadius('bottom', '50%'),
								},
							},
							DeleteButton: {
								style: {
									...borderRadius('top', '50%'),
									...borderRadius('bottom', '50%'),
									top: '0px',
									right: '0px',
								},
							},
						}}
						onDrop={onAddLogo}
						onDelete={onRemoveLogo}
						placeholder={
							<Icon type="Image" size={32} color={OpenColor.gray[5]} />
						}
						image={element.logo}
						progressAmount={progress}
						size={{ width: 72, height: 72 }}
					/>
				</div>
				<div {...attributes} className={css({ flexGrow: 1 })}>
					{children}
				</div>
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
						userSelect: 'none',
						':hover': {
							backgroundColor: OpenColor.red[6],
						},
						':active': {
							backgroundColor: OpenColor.red[8],
						},
					})}
					contentEditable={false}
					onMouseDown={(event) => {
						event.preventDefault()
						const path = ReactEditor.findPath(editor, element)
						Transforms.removeNodes(editor, { at: path })
					}}
				>
					<Icon type="TrashLine" color="white" size={18} />
				</button>
			</div>
		</Cell>
	)
}

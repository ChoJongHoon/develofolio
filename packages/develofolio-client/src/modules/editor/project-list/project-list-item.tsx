import React, { useCallback, useState } from 'react'
import { useStyletron } from 'styletron-react'
import {
	CustomRenderElementProps,
	LogoElement,
	ProjectListItemElement,
} from '../custom-types'
import Image from 'next/image'
import OpenColor from 'open-color'
import { padding, transitions } from 'polished'
import { Icon } from '~/components/icon'
import { useHover } from '~/hooks/use-hover'
import { StatefulPopover } from 'baseui/popover'
import { PopoverLogoPicker } from '../logo/popover-logo-picker'
import { ILogo } from '../logo/types'
import { ReactEditor, useSlateStatic } from 'slate-react'
import { Transforms } from 'slate'

export const ProjectListItem = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<ProjectListItemElement>) => {
	const [css] = useStyletron()
	const [logoHoverRef, isLogoHovered] = useHover<HTMLDivElement>()
	const [isOpen, setIsOpen] = useState(false)
	const editor = useSlateStatic()

	const onLogoRemove = useCallback(
		(index: number) => {
			const path = ReactEditor.findPath(editor, element)
			const newProperties: Partial<ProjectListItemElement> = {
				logos: element.logos.filter((_, i) => i !== index),
			}
			Transforms.setNodes(editor, newProperties, { at: path })
		},
		[editor, element]
	)

	const onLogoAdd = useCallback(
		(logo: ILogo) => {
			const path = ReactEditor.findPath(editor, element)
			const newProperties: Partial<ProjectListItemElement> = {
				logos: [
					...element.logos,
					{
						name: logo.name,
						url: logo.url,
						shortname: logo.shortname,
						file: logo.files[0],
					},
				],
			}
			Transforms.setNodes(editor, newProperties, { at: path })
		},
		[editor, element]
	)

	return (
		<div
			{...attributes}
			className={css({
				display: 'flex',
				flexDirection: 'column',
				backgroundColor: OpenColor.gray[0],
				borderRadius: '8px',
			})}
		>
			<div
				contentEditable={false}
				className={css({
					width: '100%',
					backgroundColor: OpenColor.gray[1],
					overflow: 'hidden',
					borderTopLeftRadius: '8px',
					borderTopRightRadius: '8px',
					position: 'relative',
					':before': {
						content: '" "',
						display: 'block',
						paddingTop: `${(9 / 16) * 100}%`,
					},
				})}
			>
				{element.thumbnail ? (
					<Image
						src={element.thumbnail}
						alt={element.children[0].children.join(' ')}
						layout="fill"
						className={css({
							position: 'absolute',
							top: '0px',
							left: '0px',
							width: '100%',
							height: '100%',
						})}
					/>
				) : (
					<>
						<button
							className={css({
								backgroundColor: OpenColor.gray[1],
								position: 'absolute',
								top: '0px',
								left: '0px',
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
							// onClick={onClickUploadButton}
						>
							<Icon type="Plus" size={64} color={OpenColor.gray[5]} />
						</button>
					</>
				)}
			</div>
			<div
				className={css({
					...padding('16px'),
				})}
			>
				{children[0]}
				<div
					ref={logoHoverRef}
					contentEditable={false}
					className={css({ marginBottom: '8px', display: 'flex', gap: '8px' })}
				>
					{element.logos.map((logo, index) => (
						<Logo
							key={`${logo.name}-${index}`}
							logo={logo}
							onClick={() => {
								onLogoRemove(index)
							}}
						/>
					))}
					<StatefulPopover
						content={({ close }) => (
							<PopoverLogoPicker onLogoAdd={onLogoAdd} onClose={close} />
						)}
						placement="bottomLeft"
						onOpen={() => {
							setIsOpen(true)
						}}
						onClose={() => {
							setIsOpen(false)
						}}
						focusLock
						autoFocus
					>
						<button
							className={css({
								width: '16px',
								height: '16px',
								display: 'inline-flex',
								justifyContent: 'center',
								alignItems: 'center',
								border: 'none',
								background: 'none',
								cursor: 'pointer',
								...padding('0px'),
								borderRadius: '4px',
								opacity: isLogoHovered || isOpen ? 1 : 0,
								...transitions(['background-color', 'opacity'], '0.2s'),
								':hover': {
									backgroundColor: OpenColor.gray[2],
								},
							})}
						>
							<Icon type="Plus" size={12} color={OpenColor.gray[5]} />
						</button>
					</StatefulPopover>
				</div>
				{children.slice(1)}
			</div>
		</div>
	)
}

interface LogoProps {
	logo: Omit<LogoElement, 'type' | 'children'>
	onClick: React.MouseEventHandler<HTMLButtonElement>
}

const Logo = ({ logo, onClick }: LogoProps) => {
	const [css] = useStyletron()
	const [hoverRef, isHovered] = useHover<HTMLButtonElement>()

	return (
		<button
			key={logo.file}
			className={css({
				position: 'relative',
				border: 'none',
				background: 'none',
				cursor: 'pointer',
				padding: '0px',
				display: 'inline-flex',
			})}
			onClick={onClick}
			ref={hoverRef}
		>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={`/logos/${logo.file}`}
				className={css({
					height: '16px',
					display: 'block',
				})}
				alt={logo.name}
			/>
			<div
				className={css({
					position: 'absolute',
					top: '0px',
					left: '0px',
					bottom: '0px',
					right: '0px',
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
					borderRadius: '4px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					opacity: isHovered ? 1 : 0,
					...transitions(['opacity'], '0.2s'),
				})}
			>
				<Icon type="TrashLine" size={14} color={OpenColor.red[7]} />
			</div>
		</button>
	)
}

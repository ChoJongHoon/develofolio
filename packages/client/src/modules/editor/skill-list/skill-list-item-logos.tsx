import OpenColor from 'open-color'
import React, { useCallback, useState } from 'react'
import { Transforms } from 'slate'
import { ReactEditor, useSlateStatic } from 'slate-react'
import { Icon } from '~/components/icon'
import {
	CustomRenderElementProps,
	LogoElement,
	SkillListItemLogosElement,
} from '../custom-types'
import { ILogo } from '../logo/types'
import { StatefulPopover } from 'baseui/popover'
import { useStyletron } from 'styletron-react'
import { padding, transitions } from 'polished'
import { useHover } from '~/hooks/use-hover'
import { PopoverLogoPicker } from '../logo/popover-logo-picker'
import { nanoid } from 'nanoid'

export const SkillListItemLogos = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<SkillListItemLogosElement>) => {
	const [css] = useStyletron()
	const [isOpen, setIsOpen] = useState(false)
	const editor = useSlateStatic()

	const onLogoRemove = useCallback(
		(index: number) => {
			const path = ReactEditor.findPath(editor, element)
			const newProperties: Partial<SkillListItemLogosElement> = {
				logos: element.logos.filter((_, i) => i !== index),
			}
			Transforms.setNodes(editor, newProperties, { at: path })
		},
		[editor, element]
	)

	const onLogoAdd = useCallback(
		(logo: ILogo) => {
			const path = ReactEditor.findPath(editor, element)
			const newProperties: Partial<SkillListItemLogosElement> = {
				logos: [
					...element.logos,
					{
						id: nanoid(),
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
			className={css({ marginBottom: '8px' })}
			ref={attributes.ref}
		>
			<div
				contentEditable={false}
				className={css({
					display: 'flex',
					gap: '8px',
					flexWrap: 'wrap',
				})}
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
							width: '24px',
							height: '24px',
							display: 'inline-flex',
							justifyContent: 'center',
							alignItems: 'center',
							border: 'none',
							background: 'none',
							cursor: 'pointer',
							...padding('0px'),
							borderRadius: '4px',
							...transitions(['background-color', 'opacity'], '0.2s'),
							':hover': {
								backgroundColor: OpenColor.gray[1],
							},
						})}
					>
						<Icon type="Plus" size={16} color={OpenColor.gray[5]} />
					</button>
				</StatefulPopover>
			</div>
			{children}
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
					height: '24px',
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
				<Icon type="TrashLine" size={20} color={OpenColor.red[7]} />
			</div>
		</button>
	)
}

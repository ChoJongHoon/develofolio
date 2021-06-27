import OpenColor from 'open-color'
import React, { useCallback, useEffect, useState } from 'react'
import { Transforms } from 'slate'
import { ReactEditor, useSlateStatic } from 'slate-react'
import { Icon } from '~/components/base/icon'
import {
	CustomRenderElementProps,
	LogoElement,
	SkillListItemLogosElement,
} from '../custom-types'
import { LogoPickerResults } from '../logo/logo-picker-results'
import logos from 'public/logos.json'
import { logoIndex } from '../logo/logo-index'
import { ILogo } from '../logo/types'
import { StatefulPopover } from 'baseui/popover'
import { useStyletron } from 'styletron-react'
import { border, padding, transitions } from 'polished'
import { useHover } from '~/lib/hooks/use-hover'
import mergeRefs from 'react-merge-refs'

export const SkillListItemLogos = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<SkillListItemLogosElement>) => {
	const [css] = useStyletron()
	const [hoverRef, isHovered] = useHover()
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
			ref={mergeRefs([attributes.ref, hoverRef])}
		>
			<div
				contentEditable={false}
				className={css({
					display: 'flex',
					gap: '8px',
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
						<LogoPicker onLogoAdd={onLogoAdd} onClose={close} />
					)}
					placement="bottomLeft"
					onOpen={() => {
						setIsOpen(true)
					}}
					onClose={() => {
						setIsOpen(false)
					}}
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
							opacity: isHovered || isOpen ? 1 : 0,
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

interface LogoPickerProps {
	onLogoAdd: (logo: ILogo) => void
	onClose: () => void
}

const LogoPicker = ({ onLogoAdd, onClose }: LogoPickerProps) => {
	const [css] = useStyletron()
	const [value, setValue] = useState('')
	const [results, setResults] = useState(logos)
	const [selectedIndex, setSelectedIndex] = useState(0)
	const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
		(event) => {
			setValue(event.target.value)
		},
		[]
	)

	useEffect(() => {
		if (!value) {
			setResults(logos)
			return
		}
		logoIndex.search(value).then((res) => {
			setResults(res.map((item) => logos[item.index]))
		})
	}, [value])

	const onKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
			const key = event.key
			const totalCount = results.length

			if (key === 'ArrowRight') {
				event.preventDefault()
				const next = selectedIndex + 1
				if (totalCount <= next) {
					return
				}
				setSelectedIndex(next)
				return
			}
			if (key === 'ArrowLeft') {
				event.preventDefault()
				const next = selectedIndex - 1
				if (next < 0) {
					return
				}
				setSelectedIndex(next)
				return
			}
			if (key === 'ArrowDown') {
				event.preventDefault()
				const next = selectedIndex + 8
				if (totalCount <= next) {
					return
				}
				setSelectedIndex(next)
				return
			}
			if (key === 'ArrowUp') {
				event.preventDefault()
				const next = selectedIndex - 8
				if (next < 0) {
					return
				}
				setSelectedIndex(next)
				return
			}
			if (key === 'Enter') {
				event.preventDefault()
				const selectedLogo = results[selectedIndex]
				onLogoAdd(selectedLogo)
				onClose()
				return
			}
		},
		[onLogoAdd, results, selectedIndex]
	)

	return (
		<div
			className={css({
				display: 'block',
				boxSizing: 'border-box',
				...padding('8px'),
				...border('1px', 'solid', OpenColor.gray[2]),
				overflow: 'hidden',
				flexDirection: 'column',
				borderRadius: '8px',
				backgroundColor: OpenColor.white,
			})}
		>
			<input
				className={css({
					backgroundColor: OpenColor.gray[1],
					...border('1px', 'solid', OpenColor.gray[2]),
					borderRadius: '4px',
					width: '100%',
					marginBottom: '16px',
					...padding('4px', '8px'),
					fontSize: '14px',
				})}
				value={value}
				onChange={onChange}
				onKeyDown={onKeyDown}
				autoFocus
			/>
			<div
				className={css({
					maxHeight: '240px',
					overflowY: 'auto',
					width: '320px',
				})}
			>
				<LogoPickerResults
					results={results}
					selectedIndex={selectedIndex}
					onChangeSelectedIndex={setSelectedIndex}
					onSelect={onLogoAdd}
				/>
			</div>
		</div>
	)
}

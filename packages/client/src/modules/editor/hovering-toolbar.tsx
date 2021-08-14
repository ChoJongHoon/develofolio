import React, { useMemo } from 'react'
import OpenColor from 'open-color'
import { useEffect, useRef } from 'react'
import { Editor, Range, Text, Transforms } from 'slate'
import { ReactEditor, useSlate } from 'slate-react'
import { LeafFormat } from '~/modules/editor/custom-types'
import { Icon, IconType } from '../../components/icon'
import {
	getSelectedText,
	isFormatActive,
	toggleFormat,
} from './elements/format'
import { debounce, omit } from 'lodash'
import { StyleObject } from 'styletron-standard'
import { borderRadius, borderStyle, padding } from 'polished'
import { useStyletron } from 'styletron-react'
import { createPopper, Instance } from '@popperjs/core'
import { StatefulTooltip } from 'baseui/tooltip'
import { Layer } from 'baseui/layer'

export const HoveringToolbar = () => {
	const [css] = useStyletron()
	const ref = useRef<HTMLDivElement>(null)
	const editor = useSlate()
	const instance = useRef<Instance | null>(null)

	const showTooltip = useRef(
		debounce(() => {
			const el = ref.current
			if (!el) {
				return
			}
			const domSelection = window.getSelection()
			if (!domSelection) return
			const domRange = domSelection.getRangeAt(0)
			const rect = domRange.getBoundingClientRect()
			el.style.opacity = '0.9'
			el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`
			el.style.left = `${
				rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
			}px`
		}, 200)
	)
	useEffect(() => {
		const el = ref.current
		const { selection } = editor
		const domSelection = window.getSelection()
		if (!el || !domSelection) {
			return
		}

		if (
			!selection ||
			!ReactEditor.isFocused(editor) ||
			Range.isCollapsed(selection) ||
			Editor.string(editor, selection) === ''
		) {
			instance.current?.destroy()
			return
		}
		const domRange = domSelection.getRangeAt(0)

		if (instance.current) {
			instance.current.destroy()
		}
		instance.current = createPopper(domRange, el, {
			placement: 'bottom',
			modifiers: [
				{
					name: 'offset',
					options: {
						offset: [0, 8],
					},
				},
				{
					name: 'flip',
					options: {
						flipVariations: false,
						padding: 8,
					},
				},
				{
					name: 'preventOverflow',
					options: {
						padding: 8,
					},
				},
			],
		})

		// showTooltip.current()
	})

	return (
		<Layer>
			<div
				className={css({
					...padding('4px'),
					position: 'absolute',
					top: '-10000px',
					left: '-10000px',
					backgroundColor: OpenColor.gray[0],
					borderRadius: '8px',
					display: 'flex',
					boxShadow: '0 0.5rem 1.5rem rgb(0 0 0 / 20%)',
					gap: '4px',
				})}
				ref={ref}
			>
				<FormatButton format="bold" />
				<FormatButton format="italic" />
				<FormatButton format="code" />
				<FontColorButton />
				<HighlightButton />
			</div>
		</Layer>
	)
}

type FormatButtonProps = {
	format: LeafFormat
}

const FormatButton = ({ format }: FormatButtonProps) => {
	const [css] = useStyletron()
	const editor = useSlate()
	const isActive = isFormatActive(editor, format)
	const iconType = useMemo<IconType>(() => {
		switch (format) {
			case 'bold':
				return 'Bold'
			case 'italic':
				return 'Italic'
			case 'code':
				return 'Code'
		}
	}, [format])
	return (
		<button
			className={css(buttonStyles(isActive))}
			onMouseDown={(event) => {
				event.preventDefault()
				toggleFormat(editor, format)
			}}
		>
			<Icon
				type={iconType}
				color={isActive ? OpenColor.gray[8] : OpenColor.gray[6]}
				size={24}
			/>
		</button>
	)
}

const colorEntries = Object.entries(omit(OpenColor, 'white', 'black'))
const FontColorButton = () => {
	const [css] = useStyletron()
	const editor = useSlate()
	const node = getSelectedText(editor)
	const color = node?.color
	return (
		<StatefulTooltip
			overrides={{
				Body: {
					style: {
						backgroundColor: OpenColor.gray[0],
						boxShadow: '0 0.5rem 1.5rem rgb(0 0 0 / 20%)',
						...borderRadius('top', '8px'),
						...borderRadius('bottom', '8px'),
					},
				},
				Inner: {
					style: {
						backgroundColor: 'transparent',
						...padding('4px'),
						display: 'flex',
						gap: '4px',
					},
				},
			}}
			content={() => (
				<div
					className={css({
						display: 'grid',
						gridTemplateColumns: 'repeat(7, 1fr)',
						gap: '4px',
					})}
				>
					<button
						key="remove"
						className={css({
							display: 'flex',
							...padding('0px'),
							...borderStyle('none'),
							backgroundColor: 'transparent',
							cursor: 'pointer',
						})}
						onMouseDown={(event) => {
							event.preventDefault()
							Transforms.setNodes(
								editor,
								{ color: undefined },
								{ match: Text.isText, split: true }
							)
						}}
					>
						<Icon type="TrashLine" color={OpenColor.red[6]} size={24} />
					</button>
					{colorEntries.map(([key, value]) => (
						<button
							key={color}
							className={css({
								width: '24px',
								height: '24px',
								backgroundColor: value[6],
								...borderRadius('top', '4px'),
								...borderRadius('bottom', '4px'),
								...borderStyle('none'),
								cursor: 'pointer',
							})}
							onMouseDown={(event) => {
								event.preventDefault()
								Transforms.setNodes(
									editor,
									{ color: key as keyof OpenColor },
									{ match: Text.isText, split: true }
								)
							}}
						/>
					))}
				</div>
			)}
			triggerType="click"
			placement="bottom"
			focusLock={false}
			autoFocus={false}
		>
			<button className={css(buttonStyles(Boolean(color)))}>
				<Icon
					type="FontColor"
					color={color ? OpenColor[color][6] : OpenColor.gray[6]}
					size={24}
				/>
			</button>
		</StatefulTooltip>
	)
}
const HighlightButton = () => {
	const [css] = useStyletron()
	const editor = useSlate()
	const node = getSelectedText(editor)
	const highlight = node?.highlight
	return (
		<StatefulTooltip
			overrides={{
				Body: {
					style: {
						backgroundColor: OpenColor.gray[0],
						boxShadow: '0 0.5rem 1.5rem rgb(0 0 0 / 20%)',
						...borderRadius('top', '8px'),
						...borderRadius('bottom', '8px'),
					},
				},
				Inner: {
					style: {
						backgroundColor: 'transparent',
						...padding('4px'),
						display: 'flex',
						gap: '4px',
					},
				},
			}}
			content={() => (
				<div
					className={css({
						display: 'grid',
						gridTemplateColumns: 'repeat(7, 1fr)',
						gap: '4px',
					})}
				>
					<button
						key="remove"
						className={css({
							display: 'flex',
							...padding('0px'),
							...borderStyle('none'),
							backgroundColor: 'transparent',
							cursor: 'pointer',
						})}
						onMouseDown={(event) => {
							event.preventDefault()
							Transforms.setNodes(
								editor,
								{ highlight: undefined },
								{ match: Text.isText, split: true }
							)
						}}
					>
						<Icon type="TrashLine" color={OpenColor.red[6]} size={24} />
					</button>
					{colorEntries.map(([key, value]) => (
						<button
							key={highlight}
							className={css({
								width: '24px',
								height: '24px',
								backgroundColor: value[6],
								...borderRadius('top', '4px'),
								...borderRadius('bottom', '4px'),
								...borderStyle('none'),
								cursor: 'pointer',
							})}
							onMouseDown={(event) => {
								event.preventDefault()
								Transforms.setNodes(
									editor,
									{ highlight: key as keyof OpenColor },
									{ match: Text.isText, split: true }
								)
							}}
						/>
					))}
				</div>
			)}
			triggerType="click"
			placement="bottom"
			focusLock={false}
			autoFocus={false}
		>
			<button className={css(buttonStyles(Boolean(highlight)))}>
				<Icon
					type="Highlight"
					color={highlight ? OpenColor[highlight][6] : OpenColor.gray[6]}
					size={24}
				/>
			</button>
		</StatefulTooltip>
	)
}

const buttonStyles = (isActive: boolean): StyleObject => ({
	...padding('4px'),
	backgroundColor: isActive ? OpenColor.gray[2] : 'transparent',
	border: 'none',
	display: 'inline-flex',
	cursor: 'pointer',
	borderRadius: '4px',
	':hover': {
		backgroundColor: isActive ? OpenColor.gray[3] : OpenColor.gray[2],
	},
})

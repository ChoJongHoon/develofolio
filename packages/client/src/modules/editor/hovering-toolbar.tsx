import React, { useMemo, useState } from 'react'
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
import { omit } from 'lodash'
import { StyleObject } from 'styletron-standard'
import {
	borderColor,
	borderRadius,
	borderStyle,
	borderWidth,
	padding,
	transitions,
} from 'polished'
import { useStyletron } from 'styletron-react'
import { createPopper, Instance } from '@popperjs/core'
import { StatefulTooltip } from 'baseui/tooltip'
import { Layer } from 'baseui/layer'
import { Button } from 'baseui/button'
import { useForm } from 'react-hook-form'
import { Input } from 'baseui/input'

export const HoveringToolbar = () => {
	const [css] = useStyletron()
	const ref = useRef<HTMLDivElement>(null)
	const editor = useSlate()
	const instance = useRef<Instance | null>(null)
	const [isInputFocused, setIsInputFocused] = useState(false)
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		const el = ref.current
		const { selection } = editor
		const domSelection = window.getSelection()

		if (!el || !domSelection || isInputFocused) {
			return
		}

		if (
			!selection ||
			!ReactEditor.isFocused(editor) ||
			Range.isCollapsed(selection) ||
			Editor.string(editor, selection) === ''
		) {
			setIsOpen(false)
			instance.current?.destroy()
			return
		}
		setIsOpen(true)
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
	}, [editor, editor.selection, isInputFocused])

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
				{isOpen && <LinkButton setIsFocused={setIsInputFocused} />}
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

interface LinkButtonProps {
	setIsFocused: React.Dispatch<React.SetStateAction<boolean>>
}
const LinkButton = ({ setIsFocused }: LinkButtonProps) => {
	const [css] = useStyletron()
	const editor = useSlate()
	const node = getSelectedText(editor)
	const link = node?.link
	const [isOpen, setIsOpen] = useState(false)
	const [selection, setSelection] = useState<Range | undefined>()

	return (
		<div className={css({ position: 'relative' })}>
			<button
				className={css(buttonStyles(Boolean(link)))}
				onMouseDown={(event) => {
					event.preventDefault()
					if (link) {
						Transforms.setNodes(
							editor,
							{
								link: undefined,
							},
							{ match: Text.isText, split: true, at: selection }
						)
					} else if (editor.selection) {
						setIsOpen(true)
						setSelection(editor.selection)
					}
				}}
			>
				<Icon
					type="Link"
					color={link ? OpenColor.gray[8] : OpenColor.gray[6]}
					size={24}
				/>
			</button>
			{isOpen && selection && (
				<LinkForm
					setIsFocused={setIsFocused}
					setIsOpen={setIsOpen}
					selection={selection}
				/>
			)}
		</div>
	)
}

interface LinkFormProps {
	setIsFocused: React.Dispatch<React.SetStateAction<boolean>>
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	selection: Range
}
const LinkForm = ({ setIsFocused, setIsOpen, selection }: LinkFormProps) => {
	const [css] = useStyletron()
	const editor = useSlate()
	const {
		register,
		handleSubmit,
		formState: { isValid },
		setFocus,
	} = useForm<{ link: string }>({
		mode: 'onChange',
	})
	const { onBlur, ref, ...rest } = register('link', { required: true })
	useEffect(() => {
		setFocus('link')
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<form
			className={css({
				position: 'absolute',
				left: '50%',
				transform: 'translateX(-50%)',
				backgroundColor: OpenColor.gray[0],
				boxShadow: '0 0.5rem 1.5rem rgb(0 0 0 / 20%)',
				...borderRadius('top', '8px'),
				...borderRadius('bottom', '8px'),
				...padding('4px'),
				display: 'flex',
				flexDirection: 'row',
				gap: '4px',
			})}
			onSubmit={handleSubmit(({ link }) => {
				Transforms.setNodes(
					editor,
					{
						link,
					},
					{ match: Text.isText, split: true, at: selection }
				)
				setIsOpen(false)
				setIsFocused(false)
			})}
		>
			<Input
				onFocus={() => setIsFocused(true)}
				onBlur={(event) => {
					onBlur(event)
					setIsFocused(false)
				}}
				onKeyDown={(event) => {
					if (event.key === 'Escape') {
						event.preventDefault()
						event.currentTarget.blur()
						setIsOpen(false)
					}
				}}
				size="mini"
				autoFocus
				inputRef={ref}
				overrides={{
					Root: {
						style: {
							...borderRadius('top', '4px'),
							...borderRadius('bottom', '4px'),
							...borderColor(OpenColor.gray[4]),
							...borderWidth('1px'),
						},
					},
					Input: {
						style: {
							...borderRadius('top', '4px'),
							...borderRadius('bottom', '4px'),
							width: '240px',
							...padding('4px', '8px'),
							caretColor: OpenColor.gray[6],
							['::placeholder']: {
								color: OpenColor.gray[5],
							},
						},
					},
				}}
				placeholder="Paste link"
				{...rest}
			/>
			<Button
				size="mini"
				kind="tertiary"
				overrides={{
					BaseButton: {
						style: {
							backgroundColor: OpenColor.green[6],
							...padding('4px'),
							...borderRadius('top', '4px'),
							...borderRadius('bottom', '4px'),
							[':hover']: {
								backgroundColor: OpenColor.green[4],
							},
							[':disabled']: {
								backgroundColor: OpenColor.gray[1],
								[':hover']: {
									backgroundColor: OpenColor.gray[1],
								},
							},
						},
					},
				}}
				disabled={!isValid}
			>
				<Icon
					type="Link"
					size={24}
					color={isValid ? OpenColor.gray[0] : OpenColor.gray[6]}
					className={css({
						...transitions(['fill'], '0.2s'),
					})}
				/>
			</Button>
		</form>
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

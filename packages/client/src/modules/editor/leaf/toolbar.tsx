import { createPopper, Instance } from '@popperjs/core'
import { Layer } from 'baseui/layer'
import OpenColor from 'open-color'
import { padding } from 'polished'
import { useEffect, useRef, useState } from 'react'
import { Editor, Range } from 'slate'
import { ReactEditor, useSlate } from 'slate-react'
import { useStyletron } from 'styletron-react'
import {
	FontColorButton,
	FormatButton,
	HighlightButton,
	LinkButton,
} from './toolbar-buttons'

export const Toolbar = () => {
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

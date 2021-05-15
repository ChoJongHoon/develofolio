import { css } from '@emotion/react'
import React from 'react'
import { useEffect, useRef } from 'react'
import { Editor, Range } from 'slate'
import { ReactEditor, useSlate } from 'slate-react'
import { LeafFormat } from '~/slate'
import { Portal } from '../base/portal'
import { toggleFormat } from './elements/format'

export const HoveringToolbar = () => {
	const ref = useRef<HTMLDivElement>(null)
	const editor = useSlate()

	useEffect(() => {
		const el = ref.current
		const { selection } = editor
		if (!el) {
			return
		}

		if (
			!selection ||
			!ReactEditor.isFocused(editor) ||
			Range.isCollapsed(selection) ||
			Editor.string(editor, selection) === ''
		) {
			el.removeAttribute('style')
			return
		}

		const domSelection = window.getSelection()
		if (!domSelection) return
		const domRange = domSelection.getRangeAt(0)
		const rect = domRange.getBoundingClientRect()
		el.style.opacity = '1'
		el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`
		el.style.left = `${
			rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
		}px`
	})

	return (
		<Portal>
			<div
				ref={ref}
				css={css`
					padding: 8px 7px 6px;
					position: absolute;
					z-index: 1;
					top: -10000px;
					left: -10000px;
					margin-top: -6px;
					opacity: 0;
					background-color: #222;
					border-radius: 4px;
					transition: opacity 0.75s;
				`}
			>
				<FormatButton format="bold" />
				<FormatButton format="italic" />
				<FormatButton format="code" />
			</div>
		</Portal>
	)
}

type FormatButtonProps = {
	format: LeafFormat
}

const FormatButton = ({ format }: FormatButtonProps) => {
	const editor = useSlate()
	return (
		<button
			// reversed
			// active={isFormatActive(editor, format)}
			onMouseDown={(event) => {
				event.preventDefault()
				toggleFormat(editor, format)
			}}
		>
			{format}
			{/* <Icon>{icon}</Icon> */}
		</button>
	)
}

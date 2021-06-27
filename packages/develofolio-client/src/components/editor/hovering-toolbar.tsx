import React, { useMemo } from 'react'
import OpenColor from 'open-color'
import { useEffect, useRef } from 'react'
import { Editor, Range } from 'slate'
import { ReactEditor, useSlate } from 'slate-react'
import { LeafFormat } from '~/components/editor/custom-types'
import { Icon, IconType } from '../base/icon'
import { Portal } from '../base/portal'
import { isFormatActive, toggleFormat } from './elements/format'
import { debounce } from 'lodash'
import { StyleObject } from 'styletron-standard'
import { transitions } from 'polished'
import { useStyletron } from 'styletron-react'

export const HoveringToolbar = () => {
	const [css] = useStyletron()
	const ref = useRef<HTMLDivElement>(null)
	const editor = useSlate()

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

		showTooltip.current()
	})

	return (
		<Portal>
			<div className={css(tooltipStyles)} ref={ref}>
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
			<Icon type={iconType} color={OpenColor.gray[0]} size={24} />
		</button>
	)
}

const tooltipStyles: StyleObject = {
	padding: '4px',
	position: 'absolute',
	zIndex: 1,
	top: '-10000px',
	left: '-10000px',
	marginTop: '-6px',
	opacity: 0,
	backgroundColor: OpenColor.gray[9],
	borderRadius: '8px',
	...transitions(['opacity'], '0.25s'),
	display: 'flex',
	backdropFilter: 'blur(4px)',
}

const buttonStyles = (isActive: boolean): StyleObject => ({
	background: 'none',
	border: 'none',
	display: 'inline-flex',
	opacity: isActive ? 1 : 0.5,
	cursor: 'pointer',
	borderRadius: '4px',
	':hover': {
		backgroundColor: OpenColor.gray[7],
	},
})

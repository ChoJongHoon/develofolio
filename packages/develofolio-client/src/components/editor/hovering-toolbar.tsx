import React, { useMemo } from 'react'
import { css } from '@emotion/react'
import OpenColor from 'open-color'
import { useEffect, useRef } from 'react'
import { Editor, Range } from 'slate'
import { ReactEditor, useSlate } from 'slate-react'
import { LeafFormat } from '~/components/editor/custom-types'
import { Icon, IconType } from '../base/icon'
import { Portal } from '../base/portal'
import { isFormatActive, toggleFormat } from './elements/format'
import { debounce } from 'lodash'

export const HoveringToolbar = () => {
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
			<div ref={ref} css={tooltipStyles}>
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
			onMouseDown={(event) => {
				event.preventDefault()
				toggleFormat(editor, format)
			}}
			css={buttonStyles(isActive)}
		>
			<Icon type={iconType} color={OpenColor.gray[0]} size={24} />
		</button>
	)
}

const tooltipStyles = css`
	padding: 4px;
	position: absolute;
	z-index: 1;
	top: -10000px;
	left: -10000px;
	margin-top: -6px;
	opacity: 0;
	background-color: ${OpenColor.gray[9]};
	border-radius: 8px;
	transition: opacity 0.25s;
	display: flex;
	backdrop-filter: blur(4px);
`

const buttonStyles = (isActive: boolean) => css`
	background: none;
	border: none;
	display: inline-flex;
	opacity: ${isActive ? 1 : 0.5};
	cursor: pointer;
	border-radius: 4px;
	&:hover {
		background-color: ${OpenColor.gray[7]};
	}
`

import React, { useCallback, useEffect, useRef } from 'react'
import oc from 'open-color'
import { css } from '@emotion/react'
import { Portal } from '~/components/base/portal'
import { ReactEditor, useSlate } from 'slate-react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import {
	setIconPickerSelectedIndex,
	setIconPickerShow,
} from '../editor.reducer'
import { Transforms } from 'slate'
import { insertLogo } from './insert-logo'
import { createPopper, Instance } from '@popperjs/core'
import { LogoPickerResults } from './logo-picker-results'
import { ILogo } from './types'

export const InlineLogoPicker = () => {
	const ref = useRef<HTMLDivElement>(null)
	const instance = useRef<Instance | null>(null)
	const editor = useSlate()
	const dispatch = useDispatch()
	const { selectedIndex, show, target, results } = useSelector(
		(state) => state.editor.iconPicker,
		shallowEqual
	)

	useEffect(() => {
		const element = ref.current
		if (!element || !target || results.length === 0) {
			dispatch(setIconPickerShow(false))
			return
		}
		dispatch(setIconPickerShow(true))
		const domRange = ReactEditor.toDOMRange(editor, target)
		if (instance.current) {
			instance.current.destroy()
		}
		instance.current = createPopper(domRange, element, {
			placement: 'bottom-start',
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
	}, [dispatch, editor, results.length, target])

	useEffect(() => {
		if (instance.current && !show) {
			instance.current.destroy()
			instance.current = null
		}
	}, [show])

	const onChangeSelectedIndex = useCallback(
		(index: number) => {
			dispatch(setIconPickerSelectedIndex(index))
		},
		[dispatch]
	)

	const onSelect = useCallback(
		(logo: ILogo) => {
			if (target) {
				Transforms.select(editor, target)
			}
			insertLogo(editor, {
				file: logo.files[0],
				name: logo.name,
				shortname: logo.shortname,
				url: logo.url,
			})
		},
		[editor, target]
	)

	return (
		<Portal>
			<div ref={ref} css={boxStyles}>
				<div css={gridWrapperStyles}>
					<LogoPickerResults
						results={results}
						selectedIndex={selectedIndex}
						onChangeSelectedIndex={onChangeSelectedIndex}
						onSelect={onSelect}
					/>
				</div>
			</div>
		</Portal>
	)
}

const boxStyles = css`
	display: block;
	box-sizing: border-box;
	position: absolute;
	top: -1000px;
	left: -1000px;
	padding: 8px;
	border: 1px solid ${oc.gray[2]};
	overflow: hidden;
	flex-direction: column;
	border-radius: 8px;
	background-color: white;
`

const gridWrapperStyles = css`
	max-height: 240px;
	overflow-y: auto;
	width: 320px;
`

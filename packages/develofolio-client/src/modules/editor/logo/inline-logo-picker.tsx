import React, { useCallback, useEffect, useRef } from 'react'
import { Portal } from '~/components/portal'
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
import { StyleObject } from 'styletron-standard'
import { border, padding } from 'polished'
import OpenColor from 'open-color'
import { useStyletron } from 'styletron-react'

export const InlineLogoPicker = () => {
	const [css] = useStyletron()
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
			<div ref={ref} className={css(boxStyles)}>
				<div className={css(gridWrapperStyles)}>
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

const boxStyles: StyleObject = {
	display: 'block',
	boxSizing: 'border-box',
	position: 'absolute',
	top: '-1000px',
	left: '-1000px',
	...padding('8px'),
	...border('solid', '1px', OpenColor.gray[2]),
	overflow: 'hidden',
	flexDirection: 'column',
	borderRadius: '8px',
	backgroundColor: OpenColor.white,
}

const gridWrapperStyles: StyleObject = {
	maxHeight: '240px',
	overflowY: 'auto',
	width: '320px',
}

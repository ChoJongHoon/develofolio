import { KeyboardEvent, useCallback, useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Editor, Range, Transforms } from 'slate'
import {
	setResults,
	setIconPickerSelectedIndex,
	setIconPickerShow,
	setIconPickerTarget,
} from '../editor.reducer'
import { insertLogo } from './insert-logo'
import logos from 'public/logos.json'
import { logoIndex } from './logo-index'
import { nanoid } from 'nanoid'

export const useLogoPicker = (editor: Editor) => {
	const dispatch = useDispatch()
	const { show, results, selectedIndex, target } = useSelector(
		(state) => state.editor.iconPicker,
		shallowEqual
	)

	const [keyword, setKeyword] = useState('')

	useEffect(() => {
		const selection = editor.selection
		if (selection && Range.isCollapsed(selection)) {
			const [start] = Range.edges(selection)
			const wordBefore = Editor.before(editor, start, { unit: 'word' })
			const before = wordBefore && Editor.before(editor, wordBefore)
			const beforeRange = before && Editor.range(editor, before, start)
			const beforeText = beforeRange && Editor.string(editor, beforeRange)
			const beforeMatch = beforeText && beforeText.match(/^:(\w+)$/)
			const after = Editor.after(editor, start)
			const afterRange = Editor.range(editor, start, after)
			const afterText = Editor.string(editor, afterRange)
			const afterMatch = afterText.match(/^(\s|$)/)

			if (beforeMatch && afterMatch) {
				dispatch(setIconPickerTarget(beforeRange || null))
				setKeyword(beforeMatch[1])
				dispatch(setIconPickerSelectedIndex(0))
				return
			} else {
				dispatch(setIconPickerTarget(null))
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editor.selection])

	useEffect(() => {
		if (!keyword) {
			dispatch(setResults(logos))
			return
		}
		logoIndex.search(keyword).then((res) => {
			dispatch(setResults(res.map((item) => logos[item.index])))
		})
	}, [dispatch, keyword])

	const handleIconPicker = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			if (!show) {
				return false
			}
			const key = event.key
			const totalCount = results.length

			if (key === 'ArrowRight') {
				const next = selectedIndex + 1
				if (totalCount <= next) {
					return true
				}
				dispatch(setIconPickerSelectedIndex(next))
				return true
			}
			if (key === 'ArrowLeft') {
				const next = selectedIndex - 1
				if (next < 0) {
					return true
				}
				dispatch(setIconPickerSelectedIndex(next))
				return true
			}
			if (key === 'ArrowDown') {
				const next = selectedIndex + 8
				if (totalCount <= next) {
					return true
				}
				dispatch(setIconPickerSelectedIndex(next))
				return true
			}
			if (key === 'ArrowUp') {
				const next = selectedIndex - 8
				if (next < 0) {
					return true
				}
				dispatch(setIconPickerSelectedIndex(next))
				return true
			}
			if (key === 'Escape') {
				dispatch(setIconPickerShow(false))
				return true
			}
			if (key === 'Enter' && target) {
				const selectedLogo = results[selectedIndex]
				Transforms.select(editor, target)
				insertLogo(editor, {
					id: nanoid(),
					file: selectedLogo.files[0],
					name: selectedLogo.name,
					shortname: selectedLogo.shortname,
					url: selectedLogo.url,
				})
				return true
			}

			return false
		},
		[dispatch, editor, results, selectedIndex, show, target]
	)

	return { handleIconPicker }
}

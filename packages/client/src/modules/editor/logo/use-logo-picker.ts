import { KeyboardEvent, useCallback, useEffect, useState } from 'react'
import { Editor, Range, Transforms } from 'slate'
import { insertLogo } from './insert-logo'
import logos from 'public/logos.json'
import { logoIndex } from './logo-index'
import { nanoid } from 'nanoid'
import { useRecoilState } from 'recoil'
import {
	iconPickerResultsState,
	iconPickerSelectedIndexState,
	iconPickerShowState,
	iconPickerTargetState,
} from '../editor.atoms'

export const useLogoPicker = (editor: Editor) => {
	const [keyword, setKeyword] = useState('')
	const [show, setShow] = useRecoilState(iconPickerShowState)
	const [target, setTarget] = useRecoilState(iconPickerTargetState)
	const [selectedIndex, setSelectedIndex] = useRecoilState(
		iconPickerSelectedIndexState
	)
	const [results, setResults] = useRecoilState(iconPickerResultsState)

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
				setTarget(beforeRange || null)
				setKeyword(beforeMatch[1])
				setSelectedIndex(0)
				return
			} else {
				setTarget(null)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editor.selection])

	useEffect(() => {
		if (!keyword) {
			setResults(logos)
			return
		}
		logoIndex.search(keyword).then((res) => {
			setResults(res.map((item) => logos[item.index]))
		})
	}, [keyword, setResults])

	const onKeyDown = useCallback(
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
				setSelectedIndex(next)
				return true
			}
			if (key === 'ArrowLeft') {
				const next = selectedIndex - 1
				if (next < 0) {
					return true
				}
				setSelectedIndex(next)
				return true
			}
			if (key === 'ArrowDown') {
				const next = selectedIndex + 8
				if (totalCount <= next) {
					return true
				}
				setSelectedIndex(next)
				return true
			}
			if (key === 'ArrowUp') {
				const next = selectedIndex - 8
				if (next < 0) {
					return true
				}
				setSelectedIndex(next)
				return true
			}
			if (key === 'Escape') {
				setShow(false)
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
		[editor, results, selectedIndex, setSelectedIndex, setShow, show, target]
	)

	return { onKeyDown }
}

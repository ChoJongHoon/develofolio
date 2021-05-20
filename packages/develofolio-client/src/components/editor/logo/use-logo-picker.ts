import FlexSearch from 'flexsearch'
import { KeyboardEvent, useCallback, useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Editor, Range, Transforms } from 'slate'
import {
	increaseSelectedIndex,
	setResults,
	setSelectedIndex,
	setShowIconPicker,
	setTarget,
} from '../editor.reducer'
import { insertLogo } from './insert-logo'
import logos from 'public/logos.json'

const index = FlexSearch.create<{
	index: number
	name: string
	shortName: string
}>({
	encode: 'advanced',
	tokenize: 'reverse',
	cache: true,
	async: true,
	doc: {
		id: 'index',
		field: ['name', 'shortName'],
	},
})

// TODO: indexing 과정 빌드시 처리하도록 (Server Component)
logos.forEach((logo, i) => {
	index.add({ index: i, name: logo.name, shortName: logo.shortname })
})

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
				dispatch(setTarget(beforeRange || null))
				setKeyword(beforeMatch[1])
				dispatch(setSelectedIndex(0))
				return
			} else {
				dispatch(setTarget(null))
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editor.selection])

	useEffect(() => {
		if (!keyword) {
			dispatch(setResults(logos))
			return
		}
		index.search(keyword).then((res) => {
			dispatch(setResults(res.map((item) => logos[item.index])))
		})
	}, [dispatch, keyword])

	const handleIconPicker = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			if (!show) {
				return false
			}
			const key = event.key

			if (key === 'ArrowRight') {
				dispatch(increaseSelectedIndex(1))
				return true
			}
			if (key === 'ArrowLeft') {
				dispatch(increaseSelectedIndex(-1))
				return true
			}
			if (key === 'Escape') {
				dispatch(setShowIconPicker(false))
				return true
			}
			if (key === 'Enter' && target) {
				const selectedLogo = results[selectedIndex]
				Transforms.select(editor, target)
				insertLogo(editor, {
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

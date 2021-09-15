import { useQuery } from '@apollo/client'
import { KeyboardEvent, useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Editor, Node, Range, Transforms } from 'slate'
import { GetSchoolsByCursorDocument } from '~/graphql/document.generated'
import { useDebounceState } from '~/hooks/use-debounce-state'
import {
	SchoolListItemElement,
	SchoolListItemNameElement,
} from '../custom-types'
import {
	schoolPickerSelectedIndexState,
	schoolPickerShowState,
	schoolPickerTargetState,
} from '../editor.atoms'

export const useSchoolPicker = (editor: Editor) => {
	const [show, setShow] = useRecoilState(schoolPickerShowState)
	const [target, setTarget] = useRecoilState(schoolPickerTargetState)
	const [selectedIndex, setSelectedIndex] = useRecoilState(
		schoolPickerSelectedIndexState
	)
	const [keyword, setKeyword] = useState('')

	useEffect(() => {
		const selection = editor.selection
		if (selection && Range.isCollapsed(selection)) {
			const entry = Editor.above<SchoolListItemNameElement>(editor, {
				at: selection,
				match: (n) =>
					Editor.isBlock(editor, n) && n.type === 'school-list-item-name',
			})
			if (entry) {
				const [node, path] = entry
				const range = Editor.range(editor, path)
				setKeyword(Node.string(node))
				setTarget(range)
				setShow(true)
				return
			}
		}
		setKeyword('')
		setTarget(null)
		setShow(false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editor.selection])

	const { data } = useQuery(GetSchoolsByCursorDocument, {
		variables: {
			filter: {
				keyword: useDebounceState(keyword, 300),
			},
			first: 10,
		},
		skip: !show,
		onCompleted: () => {
			setSelectedIndex(0)
		},
	})
	const totalCount = data?.getSchoolsByCursor.pageInfo?.countTotal
	const edges = data?.getSchoolsByCursor.edges

	const onSelectSchool = useCallback(() => {
		if (!edges || !target) {
			return false
		}

		const selectedSchool = edges[selectedIndex]
		const nameEntry = Editor.above<SchoolListItemNameElement>(editor, {
			at: target,
			match: (n) =>
				Editor.isBlock(editor, n) && n.type === 'school-list-item-name',
		})

		if (nameEntry) {
			const [, namePath] = nameEntry
			const [, rootPath] = Editor.parent(editor, namePath)

			Transforms.select(editor, target)
			Transforms.insertText(editor, selectedSchool.node.name)
			Transforms.setNodes<SchoolListItemElement>(
				editor,
				{ logo: selectedSchool.node.logo },
				{
					at: rootPath,
				}
			)
			Transforms.move(editor)
			setShow(false)
			return true
		}
		return false
	}, [edges, editor, selectedIndex, setShow, target])

	const onKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			if (!show || !totalCount || !edges) {
				return false
			}
			const key = event.key

			if (key === 'ArrowDown') {
				const next = selectedIndex + 1
				if (totalCount <= next) {
					return true
				}
				setSelectedIndex(next)
				return true
			}
			if (key === 'ArrowUp') {
				const next = selectedIndex - 1
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

			return false
		},
		[edges, selectedIndex, setSelectedIndex, setShow, show, totalCount]
	)

	const onKeyPress = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			const key = event.key
			if (key === 'Enter' && target) {
				return onSelectSchool()
			}
		},
		[onSelectSchool, target]
	)

	return {
		schools: data?.getSchoolsByCursor.edges,
		onKeyDown,
		onKeyPress,
		onSelectSchool,
	}
}

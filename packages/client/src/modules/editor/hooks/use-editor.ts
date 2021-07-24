import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Descendant } from 'slate'
import { useDebounceEffect } from '~/hooks/use-debounce-effect'
import { setSaved, setSaving } from '../editor.reducer'
import { useAsync } from 'react-use'

export const useEditor = () => {
	const dispatch = useDispatch()
	const [value, setValue] = useState<Descendant[]>([])
	const onChange = useCallback((newValue: Descendant[]) => {
		setValue(newValue)
	}, [])

	useAsync(async () => {}, [])

	useEffect(() => {
		dispatch(setSaved(false))
	}, [dispatch, value])

	useDebounceEffect(
		() => {
			dispatch(setSaving(true))
		},
		1000,
		[value]
	)

	return { value, onChange }
}

import { useApolloClient, useMutation } from '@apollo/client'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Descendant } from 'slate'
import {
	MyContentDocument,
	SetContentDocument,
} from '~/graphql/typed-document-nodes.generated'
import { useDebounceEffect } from '~/lib/hooks/use-debounce-effect'
import { setLoading, setSaved, setSaving } from '../editor.reducer'
import { useAsync } from 'react-use'

export const useEditor = () => {
	const dispatch = useDispatch()
	const client = useApolloClient()
	const [value, setValue] = useState<Descendant[]>([])

	useAsync(async () => {
		dispatch(setLoading(true))
		const {
			data: { myContent: initContent },
		} = await client.query({ query: MyContentDocument })
		if (initContent) {
			setValue(initContent)
		}
		dispatch(setLoading(false))
		dispatch(setSaved(true))
	}, [])

	useEffect(() => {
		dispatch(setSaved(false))
	}, [dispatch, value])

	const onChange = useCallback((newValue: Descendant[]) => {
		setValue(newValue)
	}, [])

	const [onSave] = useMutation(SetContentDocument, {
		variables: {
			content: value,
		},
	})

	useDebounceEffect(
		() => {
			dispatch(setSaving(true))
			onSave().then(() => {
				dispatch(setSaving(false))
				dispatch(setSaved(true))
			})
		},
		1000,
		[value]
	)

	return { value, onChange }
}

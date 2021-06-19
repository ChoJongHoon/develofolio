import { useCallback, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Editor, Range } from 'slate'
import {
	setIconPickerSelectedIndex,
	setBlockPickerShow,
} from '../editor.reducer'

export const useBlocks = (editor: Editor) => {
	const dispatch = useDispatch()
	const { show, selectedIndex } = useSelector(
		(state) => state.editor.blockPicker,
		shallowEqual
	)

	const onShowBlockPicker = useCallback(() => {
		dispatch(setBlockPickerShow(true))
	}, [dispatch])

	const onAddBlockButtonClick = useCallback<
		React.MouseEventHandler<HTMLButtonElement>
	>(
		(event) => {
			event.preventDefault()
			onShowBlockPicker()
		},
		[onShowBlockPicker]
	)

	return { onAddBlockButtonClick }
}

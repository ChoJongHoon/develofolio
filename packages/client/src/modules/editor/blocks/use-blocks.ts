import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'
import { blockPickerShowState } from '../editor.atoms'

export const useBlocks = () => {
	const setShow = useSetRecoilState(blockPickerShowState)

	const onShowBlockPicker = useCallback(() => {
		setShow(true)
	}, [setShow])

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

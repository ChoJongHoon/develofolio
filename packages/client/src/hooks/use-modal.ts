import { useCallback, useState } from 'react'

export const useModal = () => {
	const [isOpen, setIsOpen] = useState(false)

	const onClose = useCallback(() => {
		setIsOpen(false)
	}, [])

	const onOpen = useCallback(() => {
		setIsOpen(true)
	}, [])

	return [isOpen, onOpen, onClose] as const
}

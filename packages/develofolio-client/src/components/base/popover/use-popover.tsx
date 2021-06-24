import { useCallback, useEffect, useRef, useState } from 'react'

const DEFAULT_POPOVER_DELAY = 200

export const usePopover = (autoHideDuration: number) => {
	const onMouseEnterTimer = useRef<NodeJS.Timeout | null>(null)
	const onMouseLeaveTimer = useRef<NodeJS.Timeout | null>(null)

	const delay = autoHideDuration ? autoHideDuration : DEFAULT_POPOVER_DELAY

	const [isOpen, setIsOpen] = useState(false)

	const openPopover = () => setIsOpen(true)
	const closePopover = () => setIsOpen(false)
	const togglePopover = useCallback(() => {
		setIsOpen((isOpen) => !isOpen)
	}, [])

	const onAnchorMouseEnter = useCallback(() => {
		if (onMouseLeaveTimer.current) {
			clearTimeout(onMouseLeaveTimer.current)
		}
		onMouseEnterTimer.current = setTimeout(() => {
			openPopover()
		}, DEFAULT_POPOVER_DELAY)
	}, [])

	const onAnchorMouseLeave = () => {
		if (onMouseEnterTimer.current) {
			clearTimeout(onMouseEnterTimer.current)
		}
		onMouseLeaveTimer.current = setTimeout(() => {
			closePopover()
		}, delay)
	}

	const onPopoverMouseEnter = () => {
		if (onMouseLeaveTimer.current) {
			clearTimeout(onMouseLeaveTimer.current)
		}
	}

	const onPopoverMouseLeave = useCallback(() => {
		onMouseLeaveTimer.current = setTimeout(() => {
			closePopover()
		}, delay)
	}, [delay])

	const autoHidePopover = useCallback(() => {
		openPopover()
		if (onMouseLeaveTimer.current) {
			clearTimeout(onMouseLeaveTimer.current)
		}
		onMouseLeaveTimer.current = setTimeout(() => {
			closePopover()
		}, autoHideDuration)
	}, [autoHideDuration])

	const clearTimers = useCallback(() => {
		const timers = [onMouseEnterTimer.current, onMouseLeaveTimer.current]
		timers.forEach((timerId) => {
			if (timerId) {
				clearTimeout(timerId)
			}
		})
	}, [])

	useEffect(() => {
		return () => {
			clearTimers()
		}
	}, [clearTimers])

	return [
		isOpen,
		closePopover,
		togglePopover,
		onAnchorMouseEnter,
		onAnchorMouseLeave,
		onPopoverMouseEnter,
		onPopoverMouseLeave,
		autoHidePopover,
	] as [
		boolean,
		typeof closePopover,
		typeof togglePopover,
		typeof onAnchorMouseEnter,
		typeof onAnchorMouseLeave,
		typeof onPopoverMouseEnter,
		typeof onPopoverMouseLeave,
		typeof autoHidePopover
	]
}

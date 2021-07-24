import { useRef, useEffect, useState, FC } from 'react'
import { createPortal } from 'react-dom'

/**
 * Client only
 */
export const Portal: FC = ({ children }) => {
	const ref = useRef<Element | null>(null)
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		ref.current = document.querySelector('#portal')
		setMounted(true)
	}, [])

	return mounted && ref.current ? createPortal(children, ref.current) : null
}

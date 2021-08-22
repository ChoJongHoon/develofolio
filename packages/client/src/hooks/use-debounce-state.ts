import { useEffect, useRef, useState } from 'react'

export const useDebounceState = (value: any, ms: number) => {
	const [debouncedValue, setValue] = useState(value)
	const timeout = useRef<ReturnType<typeof setTimeout>>()

	useEffect(() => {
		if (timeout.current) {
			clearTimeout(timeout.current)
		}
		timeout.current = setTimeout(() => {
			setValue(value)
		}, ms)

		return () => {
			if (timeout.current) {
				clearTimeout(timeout.current)
			}
		}
	}, [ms, value])

	return debouncedValue
}

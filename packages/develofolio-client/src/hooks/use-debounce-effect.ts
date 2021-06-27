import { EffectCallback, DependencyList, useRef, useEffect } from 'react'

export const useDebounceEffect = (
	effect: EffectCallback,
	delay: number,
	deps?: DependencyList
) => {
	const interval = useRef<NodeJS.Timeout | null>(null)
	useEffect(() => {
		if (interval.current !== null) {
			clearTimeout(interval.current)
		}

		interval.current = setTimeout(() => {
			effect()
		}, delay)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps)
}

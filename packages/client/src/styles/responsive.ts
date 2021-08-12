import { useEffect, useState } from 'react'

export const breakpoints = {
	DEFAULT: 0,
	SMALL: 320,
	MEDIUM: 600,
	LARGE: 1136,
} as const

export type BreakpointsType = keyof typeof breakpoints

export type BreakpointsTypeWithoutFirst = Exclude<BreakpointsType, 'DEFAULT'>
export type BreakpointsTypeWithoutLast = Exclude<BreakpointsType, 'LARGE'>

const toEm = (size: number) => size / 16 + 'em'

const getNextBreakpointName = (name: BreakpointsTypeWithoutLast) => {
	const names = Object.keys(breakpoints) as unknown as BreakpointsType

	return names[names.indexOf(name) + 1] as BreakpointsTypeWithoutFirst
}

const getNextBreakpointValue = (name: BreakpointsTypeWithoutLast) => {
	const getNextName = getNextBreakpointName(name)

	return breakpoints[getNextName] - 0.02
}
const getBreakpointValue = (name: BreakpointsType) => {
	return breakpoints[name]
}

const calcMinWidth = (name: BreakpointsType) => {
	return toEm(getBreakpointValue(name))
}
const calcMaxWidth = (name: BreakpointsTypeWithoutLast) => {
	return toEm(getNextBreakpointValue(name))
}

const withMinAndMaxMedia = (x: string, y: string) =>
	`@media (min-width: ${x}) and (max-width: ${y})`

/**
 * @example up('TABLET') => `@media (min-width: 48em)`
 */
export const up = (name: BreakpointsTypeWithoutFirst) =>
	`@media (min-width: ${calcMinWidth(name)})`

/**
 * @example down('TABLET') => `@media (max-width: 63.99875em)`
 */
export const down = (name: BreakpointsTypeWithoutLast) =>
	`@media (max-width: ${calcMaxWidth(name)})`

/**
 * @example between('TABLET', 'DESKTOP_S') => `@media (min-width: 48em) and (max-width: 89.99875em)`
 */
export const between = (
	min: BreakpointsTypeWithoutFirst,
	max: BreakpointsTypeWithoutLast
) => withMinAndMaxMedia(calcMinWidth(min), calcMaxWidth(max))

/**
 * @example only('TABLET') => `@media (min-width: 48em) and (max-width: 63.99875em)`
 */
export const only = (name: BreakpointsTypeWithoutLast) =>
	withMinAndMaxMedia(calcMinWidth(name), calcMaxWidth(name))

export const useBreakPoint = (breakpoint: string) => {
	// Get the media query to match
	const query = breakpoint.replace(/^@media\s*/, '')
	const [isBreak, setIsBreak] = useState<boolean | null>(null)

	useEffect(() => {
		const mq = window.matchMedia(query)
		const handleChange = (event: MediaQueryListEvent) => {
			setIsBreak(event.matches)
		}

		setIsBreak(mq.matches)

		// Safari < 14 can't use addEventListener on a MediaQueryList
		// https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList#Browser_compatibility
		if (!mq.addEventListener) {
			// Update the state whenever the media query match state changes
			mq.addListener(handleChange)

			// Clean up on unmount and if the query changes
			return () => {
				mq.removeListener(handleChange)
			}
		}
		mq.addEventListener('change', handleChange)

		return () => {
			mq.removeEventListener('change', handleChange)
		}
	}, [query])

	return isBreak
}

export const mediaQuery = (name: BreakpointsTypeWithoutFirst) => {
	return `@media screen and (min-width: ${getBreakpointValue(name)}px)`
}

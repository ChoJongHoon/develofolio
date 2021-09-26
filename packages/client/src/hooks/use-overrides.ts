import { useMemo } from 'react'
import { mergeOverrides } from 'baseui'

export const useOverrides = <T>(defaults: T, overrides?: T): T =>
	useMemo(
		() => mergeOverrides(defaults as any, (overrides ?? {}) as any) as any,
		[defaults, overrides]
	)

import { find, isArray, matchesProperty, PropertyPath } from 'lodash'

export const deepFilter = <T extends object, K>(
	value: T | T[],
	childrenKey: keyof T,
	predicate: (value: T, index: number) => boolean
) => {
	const recursive = (result: T[], value: T | T[]) => {
		if (isArray(value)) {
			result.push(...value.filter(predicate))
			value.forEach((item) => {
				if (item[childrenKey]) {
					recursive(result, item[childrenKey] as any)
				}
			})
		}

		return
	}
	const result: T[] = []

	recursive(result, value)

	return result
}

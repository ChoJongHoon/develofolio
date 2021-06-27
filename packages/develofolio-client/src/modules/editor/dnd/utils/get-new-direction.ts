import { DropDirection } from '../types'

/**
 * Get new direction if updated
 */
export const getNewDirection = (
	previousDir: DropDirection,
	dir?: DropDirection
): DropDirection | undefined => {
	if (!dir && previousDir) {
		return null
	}

	if (dir === 'top' && previousDir !== 'top') {
		return 'top'
	}

	if (dir === 'bottom' && previousDir !== 'bottom') {
		return 'bottom'
	}
}

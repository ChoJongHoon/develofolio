import { IS_MAC } from '~/utils/constants'

export const isModKey = (event: React.KeyboardEvent) =>
	IS_MAC ? event.metaKey : event.ctrlKey

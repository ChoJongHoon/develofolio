import { atom } from 'recoil'
import { Range } from 'slate'
import { ILogo } from './logo/types'

type SaveStatus = 'SAVED' | 'SAVING'

export const saveState = atom<SaveStatus | null>({
	key: 'saveState',
	default: null,
})

export const iconPickerShowState = atom<boolean>({
	key: 'iconPickerShowState',
	default: false,
})
export const iconPickerTargetState = atom<Range | null>({
	key: 'iconPickerTargetState',
	default: null,
})
export const iconPickerSelectedIndexState = atom<number>({
	key: 'iconPickerSelectedIndexState',
	default: 0,
})
export const iconPickerResultsState = atom<Array<ILogo>>({
	key: 'iconPickerResultsState',
	default: [],
})

export const blockPickerShowState = atom<boolean>({
	key: 'blockPickerShowState',
	default: false,
})
export const blockPickerSelectedIndexState = atom<number>({
	key: 'blockPickerSelectedIndexState',
	default: 0,
})

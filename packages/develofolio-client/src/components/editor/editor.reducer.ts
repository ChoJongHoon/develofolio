import { createSlice } from '@reduxjs/toolkit'
import { Range } from 'slate'
import logos from 'public/logos.json'

type ILogo = typeof logos[number]

export interface IEditor {
	iconPicker: {
		show: boolean
		target: Range | null
		selectedIndex: number
		totalCount: number
		results: Array<ILogo>
	}
}

const initialState: IEditor = {
	iconPicker: {
		show: false,
		target: null,
		selectedIndex: 0,
		totalCount: 0,
		results: [],
	},
}

export const editorSlice = createSlice({
	name: 'editor',
	initialState,
	reducers: {
		setSelectedIndex(state, action: { payload: number }) {
			state.iconPicker.selectedIndex = action.payload
		},
		increaseSelectedIndex(state, action: { payload: number }) {
			const next = state.iconPicker.selectedIndex + action.payload
			const lastLength = state.iconPicker.totalCount - 1

			if (next < 0) {
				state.iconPicker.selectedIndex = 0
			} else if (next > lastLength) {
				state.iconPicker.selectedIndex = lastLength
			} else {
				state.iconPicker.selectedIndex = next
			}
		},
		setShowIconPicker(state, action: { payload: boolean }) {
			state.iconPicker.show = action.payload
		},
		setTotalCountIconPicker(state, action: { payload: number }) {
			state.iconPicker.totalCount = action.payload
		},
		setTarget(state, action: { payload: Range | null }) {
			state.iconPicker.target = action.payload
		},
		setResults(state, action: { payload: Array<ILogo> }) {
			state.iconPicker.results = action.payload
		},
	},
})

const { actions } = editorSlice

export const {
	setSelectedIndex,
	increaseSelectedIndex,
	setShowIconPicker,
	setTotalCountIconPicker,
	setTarget,
	setResults,
} = actions

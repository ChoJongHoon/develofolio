import { createSlice } from '@reduxjs/toolkit'
import { Range } from 'slate'
import logos from 'public/logos.json'

type ILogo = typeof logos[number]

export interface IEditor {
	iconPicker: {
		show: boolean
		target: Range | null
		selectedIndex: number
		results: Array<ILogo>
	}
}

const initialState: IEditor = {
	iconPicker: {
		show: false,
		target: null,
		selectedIndex: 0,
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
		setShowIconPicker(state, action: { payload: boolean }) {
			state.iconPicker.show = action.payload
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
	setShowIconPicker,
	setTarget,
	setResults,
} = actions

import { createSlice } from '@reduxjs/toolkit'
import { Range } from 'slate'
import logos from 'public/logos.json'

type ILogo = typeof logos[number]

export interface IEditor {
	loading: boolean
	saved: boolean
	saving: boolean
	iconPicker: {
		show: boolean
		target: Range | null
		selectedIndex: number
		results: Array<ILogo>
	}
	blockPicker: {
		show: boolean
		selectedIndex: number
	}
}

const initialState: IEditor = {
	loading: false,
	saved: false,
	saving: false,
	iconPicker: {
		show: false,
		target: null,
		selectedIndex: 0,
		results: [],
	},
	blockPicker: {
		show: false,
		selectedIndex: 0,
	},
}

export const editorSlice = createSlice({
	name: 'editor',
	initialState,
	reducers: {
		setIconPickerSelectedIndex(state, action: { payload: number }) {
			state.iconPicker.selectedIndex = action.payload
		},
		setIconPickerShow(state, action: { payload: boolean }) {
			state.iconPicker.show = action.payload
		},
		setIconPickerTarget(state, action: { payload: Range | null }) {
			state.iconPicker.target = action.payload
		},
		setResults(state, action: { payload: Array<ILogo> }) {
			state.iconPicker.results = action.payload
		},
		setLoading(state, action: { payload: boolean }) {
			state.loading = action.payload
		},
		setSaved(state, action: { payload: boolean }) {
			state.saved = action.payload
		},
		setSaving(state, action: { payload: boolean }) {
			state.saving = action.payload
		},
		setBlockPickerShow(state, action: { payload: boolean }) {
			state.blockPicker.show = action.payload
		},
		setBlockPickerSelectedIndex(state, action: { payload: number }) {
			state.blockPicker.selectedIndex = action.payload
		},
	},
})

const { actions } = editorSlice

export const {
	setIconPickerSelectedIndex,
	setIconPickerShow,
	setIconPickerTarget,
	setResults,
	setLoading,
	setSaved,
	setSaving,
	setBlockPickerShow,
	setBlockPickerSelectedIndex,
} = actions

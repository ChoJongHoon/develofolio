import { combineReducers, AnyAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { editorSlice, IEditor } from '~/modules/editor/editor.reducer'

export interface State {
	editor: IEditor
}

const rootReducer = (state: State | undefined, action: AnyAction) => {
	switch (action.type) {
		case HYDRATE:
			console.log('HYDRATE')
			return action.payload

		default: {
			const combineReducer = combineReducers({
				[editorSlice.name]: editorSlice.reducer,
			})
			return combineReducer(state, action)
		}
	}
}

export default rootReducer

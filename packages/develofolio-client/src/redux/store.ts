import { createWrapper, Context } from 'next-redux-wrapper'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import rootReducer from './slices'

const makeStore = (context: Context) =>
	configureStore({
		reducer: rootReducer,
		devTools: process.env.NODE_ENV !== 'production',
		middleware: getDefaultMiddleware(),
	})

export const wrapper = createWrapper(makeStore, {
	debug: process.env.NODE_ENV !== 'production',
})

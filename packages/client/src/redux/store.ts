import { createWrapper } from 'next-redux-wrapper'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import rootReducer from './slices'

export const store = () =>
	configureStore({
		reducer: rootReducer,
		devTools: process.env.NODE_ENV !== 'production',
		middleware: getDefaultMiddleware(),
	})

export const wrapper = createWrapper(store, {
	debug: process.env.NODE_ENV !== 'production',
})

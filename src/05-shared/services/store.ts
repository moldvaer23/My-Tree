import {
	useDispatch as dispatchHook,
	useSelector as selectorHook,
	TypedUseSelectorHook,
} from 'react-redux'

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import canvasReducer from './slices/canvas-slice'

export const rootReducer = combineReducers({
	canvas: canvasReducer,
})

const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export const useDispatch: () => AppDispatch = () => dispatchHook()
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook

export default store

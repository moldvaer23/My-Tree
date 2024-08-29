import {
	useDispatch as dispatchHook,
	useSelector as selectorHook,
	TypedUseSelectorHook,
} from 'react-redux'

import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { globalReducer } from './slices/global-slice'
import { blocksReducer } from '../../02-widgets/blocks/lib/blocks-slice'
import { connectionsReducer } from '@widgets/connections'
import { rightContextReducer } from '@features/right-context'
import { panelParametersReducer } from '@widgets/panel-parameters'
import { textsReducer } from '@widgets/texts'

export const rootReducer = combineReducers({
	global: globalReducer,
	blocks: blocksReducer,
	connections: connectionsReducer,
	rightContext: rightContextReducer,
	panelParameters: panelParametersReducer,
	texts: textsReducer,
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

import { TGlobalSettings } from '@app-types'
import { globalStyleSettings } from '../../config'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TInitialState = {
	globalStyleSettings: TGlobalSettings
}

const initialState: TInitialState = {
	globalStyleSettings: globalStyleSettings,
}

const globalSlice = createSlice({
	initialState: initialState,
	name: 'global',
	reducers: {
		updateGlobalSettings: (store, action: PayloadAction<TGlobalSettings>) => {
			store.globalStyleSettings = action.payload
		},
	},
	selectors: {
		getGlobalStyleSettings: (store) => store.globalStyleSettings,
	},
})

export const { getGlobalStyleSettings } = globalSlice.selectors
export const { updateGlobalSettings } = globalSlice.actions
export const globalReducer = globalSlice.reducer

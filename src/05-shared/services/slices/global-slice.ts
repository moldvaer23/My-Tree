import { TGlobalSettings } from '@app-types'
import { globalStyleSettings } from '../../config'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TConnectionState, TConnectionWhere } from '@widgets/connections'

type TInitialState = {
	globalStyleSettings: TGlobalSettings
	connectionsState: TConnectionState
}

const initialState: TInitialState = {
	globalStyleSettings: globalStyleSettings,
	connectionsState: { from: null, to: null },
}

const globalSlice = createSlice({
	initialState: initialState,
	name: 'global',
	reducers: {
		updateGlobalSettings: (store, action: PayloadAction<TGlobalSettings>) => {
			store.globalStyleSettings = action.payload
		},

		setConnectionState: (
			store,
			action: PayloadAction<{
				variant: 'from' | 'to'
				state: TConnectionWhere | null
			}>
		) => {
			store.connectionsState[action.payload.variant] = action.payload.state
		},

		clearConnectionsState: (store) => {
			store.connectionsState = { from: null, to: null }
		},
	},
	selectors: {
		getGlobalStyleSettings: (store) => store.globalStyleSettings,
		getConnectionsState: (store) => store.connectionsState,
	},
})

export const { getGlobalStyleSettings, getConnectionsState } =
	globalSlice.selectors
export const {
	updateGlobalSettings,
	setConnectionState,
	clearConnectionsState,
} = globalSlice.actions
export const globalReducer = globalSlice.reducer

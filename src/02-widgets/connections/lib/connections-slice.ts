import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TConnectionStore } from '@widgets/connections'

type TInitialState = {
	connections: Record<string, TConnectionStore>
}

const initialState: TInitialState = {
	connections: {},
}

const connectionsSlice = createSlice({
	initialState: initialState,
	name: 'connections',
	reducers: {
		addConnection: (store, action: PayloadAction<TConnectionStore>) => {
			const data = action.payload
			store.connections[data.uuid] = data
		},

		removeConnection: (store, action: PayloadAction<string>) => {
			const uuid = action.payload
			if (store.connections[uuid]) delete store.connections[uuid]
		},

		updateLineColor: (
			store,
			action: PayloadAction<{ uuid: string; value: string }>
		) => {
			if (store.connections[action.payload.uuid]) {
				store.connections[action.payload.uuid].style.lineColor =
					action.payload.value
			}
		},
	},

	selectors: {
		getConnections: (store) => store.connections,
	},
})

export const { getConnections } = connectionsSlice.selectors

export const { addConnection, removeConnection, updateLineColor } =
	connectionsSlice.actions

export const connectionsReducer = connectionsSlice.reducer

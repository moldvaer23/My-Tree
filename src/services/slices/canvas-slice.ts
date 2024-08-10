import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TBlockStore, TConnectionStore } from '@utils/types'
import { TActiveGatewayState } from '@utils/ui-kit-types'

type TInitialState = {
	blocks: Record<string, TBlockStore>
	connections: Record<string, TConnectionStore>
}

const initialState: TInitialState = {
	blocks: {
		'0': {
			uuid: '0',
			position: {
				x: 100,
				y: 100,
			},
			parameters: null,
			title: 'Блок 0',
			activeGateway: null,
		},
		'1': {
			uuid: '1',
			position: {
				x: 500,
				y: 100,
			},
			parameters: null,
			title: 'Блок 1',
			activeGateway: null,
		},
		'2': {
			uuid: '2',
			position: {
				x: 100,
				y: 500,
			},
			parameters: null,
			title: 'Блок 2',
			activeGateway: null,
		},
	},
	connections: {},
}

const canvasSlice = createSlice({
	initialState: initialState,
	name: 'canvas',
	reducers: {
		setBlocks: (store, action: PayloadAction<Record<string, TBlockStore>>) => {
			store.blocks = action.payload
		},

		setBlockParameters: (
			store,
			action: PayloadAction<{ uuid: string; width: number; height: number }>
		) => {
			store.blocks[action.payload.uuid].parameters = {
				height: action.payload.height,
				width: action.payload.width,
			}
		},

		setBlockActiveGateway: (
			store,
			action: PayloadAction<{
				uuid: string
				activeGateway: TActiveGatewayState
			}>
		) => {
			if (store.blocks[action.payload.uuid]) {
				store.blocks[action.payload.uuid].activeGateway =
					action.payload.activeGateway
			}
		},

		addBlock: (store, action: PayloadAction<TBlockStore>) => {
			store.blocks[action.payload.uuid] = action.payload
		},

		addConnection: (store, action: PayloadAction<TConnectionStore>) => {
			store.connections[action.payload.uuid] = action.payload
		},

		removeBlock: (store, action: PayloadAction<string>) => {
			if (store.blocks[action.payload]) {
				delete store.blocks[action.payload]
			}
		},
	},
	selectors: {
		getBlocks: (store) => store.blocks,
		getConnections: (store) => store.connections,
	},
})

export const { getBlocks, getConnections } = canvasSlice.selectors
export const {
	setBlocks,
	setBlockParameters,
	setBlockActiveGateway,
	addBlock,
	addConnection,
	removeBlock,
} = canvasSlice.actions
export default canvasSlice.reducer

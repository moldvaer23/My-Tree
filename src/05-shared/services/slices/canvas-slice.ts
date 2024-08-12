import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TActiveGatewayState } from 'src/05-shared/types/ui-kit-types'
import {
	TBlockStore,
	TConnectionStore,
	TCoordinates,
} from 'src/05-shared/types/types'

type TInitialState = {
	blocks: Record<string, TBlockStore>
	connections: Record<string, TConnectionStore>
	blockDragging: boolean
}

const initialState: TInitialState = {
	blocks: {},
	connections: {},
	blockDragging: false,
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
				store.blocks[action.payload.uuid].gateways.activeGateway =
					action.payload.activeGateway
			}
		},

		setBlockDragging: (store, action: PayloadAction<boolean>) => {
			store.blockDragging = action.payload
		},

		addBlock: (store, action: PayloadAction<TBlockStore>) => {
			store.blocks[action.payload.uuid] = action.payload
		},

		addConnection: (store, action: PayloadAction<TConnectionStore>) => {
			const data = action.payload
			store.connections[data.uuid] = data

			/* Сообщаем блокам об подключении шлюзов */
			if (store.blocks[data.from.uuid]) {
				store.blocks[data.from.uuid].gateways.connectedGateways[
					data.from.gateway
				] = true
			}

			if (store.blocks[data.to.uuid]) {
				store.blocks[data.to.uuid].gateways.connectedGateways[data.to.gateway] =
					true
			}
		},

		updateBlockPosition: (
			store,
			action: PayloadAction<{ uuid: string; coordinates: TCoordinates }>
		) => {
			if (store.blocks[action.payload.uuid]) {
				store.blocks[action.payload.uuid].position = action.payload.coordinates
			}
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
		getBlockDragging: (store) => store.blockDragging,
	},
})

export const { getBlocks, getConnections, getBlockDragging } =
	canvasSlice.selectors
export const {
	setBlocks,
	setBlockParameters,
	setBlockActiveGateway,
	setBlockDragging,
	addBlock,
	addConnection,
	updateBlockPosition,
	removeBlock,
} = canvasSlice.actions
export default canvasSlice.reducer

import { TCoordinates, TGatewaysNames, TTypeTool } from '@app-types'
import { TBlockStore } from '@entities/block-text'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TConnectionStore } from '@widgets/connections'

type TTool = TBlockStore | TConnectionStore // Удалить TConnectionStore

type TInitialState = {
	blocks: Record<string, TBlockStore>
	connections: Record<string, TConnectionStore>
	dragging: {
		active: boolean
		uuid: string | null
	}
	toolView: {
		type: TTypeTool
		tool: TTool
	} | null
	rightContext: {
		coordinates: TCoordinates
		edit: {
			type: TTypeTool
			tool: TTool
		}
	} | null
}

const initialState: TInitialState = {
	blocks: {},
	connections: {},
	dragging: {
		active: false,
		uuid: null,
	},
	toolView: null,
	rightContext: null,
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

		setBlockDragging: (
			store,
			action: PayloadAction<{ uuid: string | null; active: boolean }>
		) => {
			store.dragging = action.payload
		},

		setToolView: (
			store,
			action: PayloadAction<{ tool: TTool; type: TTypeTool }>
		) => {
			store.toolView = action.payload
		},

		setRightContext: (
			store,
			action: PayloadAction<{
				coordinates: TCoordinates
				edit: {
					type: TTypeTool
					tool: TTool
				}
			} | null>
		) => {
			store.rightContext = action.payload
		},

		addBlock: (store, action: PayloadAction<TBlockStore>) => {
			store.blocks[action.payload.uuid] = action.payload
		},

		addConnection: (store, action: PayloadAction<TConnectionStore>) => {
			const data = action.payload
			store.connections[data.uuid] = data
		},

		updateBlockPosition: (
			store,
			action: PayloadAction<{ uuid: string; coordinates: TCoordinates }>
		) => {
			if (store.blocks[action.payload.uuid]) {
				store.blocks[action.payload.uuid].coordinates =
					action.payload.coordinates
			}
		},

		updateBlockActiveGateway: (
			store,
			action: PayloadAction<{
				uuid: string
				gatewayName: TGatewaysNames
				value: boolean
			}>
		) => {
			const data = action.payload

			if (store.blocks[data.uuid]) {
				store.blocks[data.uuid].gateways.connectedGateways[data.gatewayName] =
					data.value
			}
		},

		removeToolView: (store) => {
			store.toolView = null
		},

		removeBlock: (store, action: PayloadAction<string>) => {
			const uuid = action.payload
			if (store.blocks[uuid]) delete store.blocks[uuid]
		},

		removeConnection: (store, action: PayloadAction<string>) => {
			const uuid = action.payload
			if (store.connections[uuid]) delete store.connections[uuid]
		},
	},
	selectors: {
		getBlocks: (store) => store.blocks,
		getConnections: (store) => store.connections,
		getBlockDragging: (store) => store.dragging,
		getToolView: (store) => store.toolView,
		getRightContext: (store) => store.rightContext,
	},
})

export const {
	getBlocks,
	getConnections,
	getBlockDragging,
	getToolView,
	getRightContext,
} = canvasSlice.selectors

export const {
	setBlocks,
	setBlockParameters,
	setBlockDragging,
	setToolView,
	setRightContext,
	addBlock,
	addConnection,
	updateBlockPosition,
	updateBlockActiveGateway,
	removeToolView,
	removeBlock,
	removeConnection,
} = canvasSlice.actions

export default canvasSlice.reducer

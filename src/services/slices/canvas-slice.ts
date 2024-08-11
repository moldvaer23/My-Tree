import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TBlockStore, TConnectionStore, TCoordinates } from '@utils/types'
import { TActiveGatewayState } from '@utils/ui-kit-types'

type TInitialState = {
	blocks: Record<string, TBlockStore>
	connections: Record<string, TConnectionStore>
	blockDragging: boolean
}

const initialState: TInitialState = {
	blocks: {
		'0': {
			uuid: '0',
			position: {
				x: 700,
				y: 100,
			},
			parameters: null,
			title: 'React',
			activeGateway: null,
		},
		'1': {
			uuid: '1',
			position: {
				x: 700,
				y: 300,
			},
			parameters: null,
			title: 'Hooks',
			activeGateway: null,
		},
		'2': {
			uuid: '2',
			position: {
				x: 400,
				y: 300,
			},
			parameters: null,
			title: 'Redux',
			activeGateway: null,
		},
		'3': {
			uuid: '3',
			position: {
				x: 1000,
				y: 300,
			},
			parameters: null,
			title: 'Rect-router-dom',
			activeGateway: null,
		},
		'4': {
			uuid: '4',
			position: {
				x: 900,
				y: 500,
			},
			parameters: null,
			title: 'useState',
			activeGateway: null,
		},
		'5': {
			uuid: '5',
			position: {
				x: 500,
				y: 500,
			},
			parameters: null,
			title: 'useEffect',
			activeGateway: null,
		},
	},
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
				store.blocks[action.payload.uuid].activeGateway =
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
			store.connections[action.payload.uuid] = action.payload
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

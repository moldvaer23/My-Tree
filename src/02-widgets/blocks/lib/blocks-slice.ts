import { TCoordinates, TGatewaysNames } from '@app-types'
import { TBlockStore } from '@entities/block-text'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TInitialState = {
	blocks: Record<string, TBlockStore>
	blockDragging: string | null
}

const initialState: TInitialState = {
	blocks: {},
	blockDragging: null,
}

const blocksSlice = createSlice({
	initialState: initialState,
	name: 'blocks',
	reducers: {
		addBlock: (store, action: PayloadAction<TBlockStore>) => {
			store.blocks[action.payload.uuid] = action.payload
		},

		removeBlock: (store, action: PayloadAction<string>) => {
			const uuid = action.payload
			if (store.blocks[uuid]) delete store.blocks[uuid]
		},

		setBlocks: (store, action: PayloadAction<Record<string, TBlockStore>>) => {
			store.blocks = action.payload
		},

		setBlockParameters: (
			store,
			action: PayloadAction<{ uuid: string; width: number; height: number }>
		) => {
			const uuid = action.payload.uuid

			if (store.blocks[uuid]) {
				store.blocks[action.payload.uuid].parameters = {
					height: action.payload.height,
					width: action.payload.width,
				}
			}
		},

		setBlockDragging: (store, action: PayloadAction<string | null>) => {
			store.blockDragging = action.payload
		},

		updateBlockPosition: (
			store,
			action: PayloadAction<{ uuid: string; coordinates: TCoordinates }>
		) => {
			const uuid = action.payload.uuid

			if (store.blocks[uuid]) {
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

		updateBlockTitle: (
			store,
			action: PayloadAction<{ uuid: string; text: string }>
		) => {
			const uuid = action.payload.uuid

			if (store.blocks[uuid]) {
				store.blocks[action.payload.uuid].title = action.payload.text
			}
		},

		updateBlockColor: (
			store,
			action: PayloadAction<{ uuid: string; color: string }>
		) => {
			const uuid = action.payload.uuid

			if (store.blocks[uuid]) {
				store.blocks[action.payload.uuid].styles.color = action.payload.color
			}
		},

		updateBlockTextColor: (
			store,
			action: PayloadAction<{ uuid: string; color: string }>
		) => {
			const uuid = action.payload.uuid

			if (store.blocks[uuid]) {
				store.blocks[action.payload.uuid].styles.textColor =
					action.payload.color
			}
		},

		updateBlockFontSize: (
			store,
			action: PayloadAction<{ uuid: string; size: number }>
		) => {
			const uuid = action.payload.uuid

			if (store.blocks[uuid]) {
				store.blocks[action.payload.uuid].styles.fontSize = action.payload.size
			}
		},

		updateBlockFontBold: (
			store,
			action: PayloadAction<{ uuid: string; value: boolean }>
		) => {
			const uuid = action.payload.uuid

			if (store.blocks[uuid]) {
				store.blocks[action.payload.uuid].styles.fontBold = action.payload.value
			}
		},

		updateBlockCurs: (
			store,
			action: PayloadAction<{ uuid: string; value: boolean }>
		) => {
			const uuid = action.payload.uuid

			if (store.blocks[uuid]) {
				store.blocks[action.payload.uuid].styles.curs = action.payload.value
			}
		},
	},

	selectors: {
		getBlocks: (store) => store.blocks,
		getBlockDragging: (store) => store.blockDragging,
	},
})

export const { getBlocks, getBlockDragging } = blocksSlice.selectors

export const {
	addBlock,
	removeBlock,
	setBlockDragging,
	setBlockParameters,
	setBlocks,
	updateBlockActiveGateway,
	updateBlockColor,
	updateBlockCurs,
	updateBlockFontBold,
	updateBlockFontSize,
	updateBlockPosition,
	updateBlockTextColor,
	updateBlockTitle,
} = blocksSlice.actions

export const blocksReducer = blocksSlice.reducer

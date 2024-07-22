import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TBlockStore } from '@utils/types'

type TInitialState = {
	blocks: Record<string, TBlockStore>
}

const initialState: TInitialState = {
	blocks: {},
}

const canvasSlice = createSlice({
	initialState: initialState,
	name: 'canvas',
	reducers: {
		setBlocks: (store, action: PayloadAction<Record<string, TBlockStore>>) => {
			store.blocks = action.payload
		},

		addBlock: (store, action: PayloadAction<TBlockStore>) => {
			store.blocks[action.payload.uuid] = action.payload
		},

		removeBlock: (store, action: PayloadAction<string>) => {
			if (store.blocks[action.payload]) {
				delete store.blocks[action.payload]
			}
		},
	},
	selectors: {
		getBlocks: (store) => store.blocks,
	},
})

export const { getBlocks } = canvasSlice.selectors
export const { setBlocks, addBlock, removeBlock } = canvasSlice.actions
export default canvasSlice.reducer

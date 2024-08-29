import { TCoordinates, TTool, TTypeTool } from '@app-types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TInitialState = {
	rightContext: {
		coordinates: TCoordinates
		edit: {
			type: TTypeTool
			tool: TTool
		}
	} | null
}

const initialState: TInitialState = {
	rightContext: null,
}

const rightContextSlice = createSlice({
	initialState: initialState,
	name: 'rightContext',
	reducers: {
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
	},
	selectors: {
		getRightContext: (store) => store.rightContext,
	},
})

export const { getRightContext } = rightContextSlice.selectors
export const { setRightContext } = rightContextSlice.actions
export const rightContextReducer = rightContextSlice.reducer

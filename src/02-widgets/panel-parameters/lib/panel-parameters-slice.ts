import { TTool, TTypeTool } from '@app-types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TInitialState = {
	toolView: {
		type: TTypeTool
		tool: TTool
	} | null
}

const initialState: TInitialState = {
	toolView: null,
}

const panelParametersSlice = createSlice({
	initialState: initialState,
	name: 'panelParameters',
	reducers: {
		setToolView: (
			store,
			action: PayloadAction<{ tool: TTool; type: TTypeTool } | null>
		) => {
			store.toolView = action.payload
		},

		removeToolView: (store) => {
			store.toolView = null
		},
	},

	selectors: {
		getToolView: (store) => store.toolView,
	},
})

export const { getToolView } = panelParametersSlice.selectors
export const { setToolView, removeToolView } = panelParametersSlice.actions
export const panelParametersReducer = panelParametersSlice.reducer

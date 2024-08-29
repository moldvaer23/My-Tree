import { TCoordinates } from '@app-types'
import { TTextStore } from '@entities/text'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TInitialState = {
	texts: Record<string, TTextStore>
	textDragging: string | null
}

const initialState: TInitialState = {
	texts: {},
	textDragging: null,
}

const textsSlice = createSlice({
	initialState: initialState,
	name: 'texts',
	reducers: {
		addText: (store, action: PayloadAction<TTextStore>) => {
			const data = action.payload
			store.texts[data.uuid] = data
		},

		removeText: (store, action: PayloadAction<string>) => {
			const uuid = action.payload
			if (store.texts[uuid]) delete store.texts[uuid]
		},

		setTextParameters: (
			store,
			action: PayloadAction<{ uuid: string; width: number; height: number }>
		) => {
			const uuid = action.payload.uuid

			if (store.texts[uuid]) {
				store.texts[action.payload.uuid].parameters = {
					height: action.payload.height,
					width: action.payload.width,
				}
			}
		},

		setTextDragging: (store, action: PayloadAction<string | null>) => {
			store.textDragging = action.payload
		},

		updateTextPosition: (
			store,
			action: PayloadAction<{ uuid: string; coordinates: TCoordinates }>
		) => {
			const uuid = action.payload.uuid

			if (store.texts[uuid]) {
				store.texts[action.payload.uuid].coordinates =
					action.payload.coordinates
			}
		},

		updateTextColor: (
			store,
			action: PayloadAction<{ uuid: string; value: string }>
		) => {
			if (store.texts[action.payload.uuid]) {
				store.texts[action.payload.uuid].styles.color = action.payload.value
			}
		},
	},

	selectors: {
		getTexts: (store) => store.texts,
	},
})

export const { getTexts } = textsSlice.selectors

export const {
	addText,
	removeText,
	updateTextColor,
	setTextDragging,
	setTextParameters,
	updateTextPosition,
} = textsSlice.actions

export const textsReducer = textsSlice.reducer

import { TCoordinates, TGatewaysNames } from '@app-types'
import { TBlockStore } from '@entities/block-text'
import { TBlockTextGroupStore } from '@entities/block-text-group'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TInitialState = {
	blockGroups: Record<string, TBlockTextGroupStore>
	blockGroupDragging: string | null
}

const initialState: TInitialState = {
	blockGroups: {},
	blockGroupDragging: null,
}

const blocksGroupsSlice = createSlice({
	initialState: initialState,
	name: 'blocksGroups',
	reducers: {
		addBlockGroup: (store, action: PayloadAction<TBlockTextGroupStore>) => {
			const data = action.payload
			store.blockGroups[data.uuid] = data
		},

		addBlockToGroup: (
			store,
			action: PayloadAction<{ uuidGroup: string; blockText: TBlockStore }>
		) => {
			store.blockGroups[action.payload.uuidGroup].children.push(
				action.payload.blockText
			)
		},

		removeBlockGroup: (store, action: PayloadAction<string>) => {
			const uuid = action.payload
			if (store.blockGroups[uuid]) delete store.blockGroups[uuid]
		},

		setBlockGroupParameters: (
			store,
			action: PayloadAction<{ uuid: string; width: number; height: number }>
		) => {
			const uuid = action.payload.uuid

			if (store.blockGroups[uuid]) {
				store.blockGroups[action.payload.uuid].parameters = {
					height: action.payload.height,
					width: action.payload.width,
				}
			}
		},

		setBlockGroupDragging: (store, action: PayloadAction<string | null>) => {
			store.blockGroupDragging = action.payload
		},

		updateBlockGroupActiveGateway: (
			store,
			action: PayloadAction<{
				uuid: string
				gatewayName: TGatewaysNames
				value: boolean
			}>
		) => {
			const data = action.payload

			if (store.blockGroups[data.uuid]) {
				store.blockGroups[data.uuid].gateways.connectedGateways[
					data.gatewayName
				] = data.value
			}
		},

		updateBlockGroupPosition: (
			store,
			action: PayloadAction<{ uuid: string; coordinates: TCoordinates }>
		) => {
			const uuid = action.payload.uuid

			if (store.blockGroups[uuid]) {
				store.blockGroups[action.payload.uuid].coordinates =
					action.payload.coordinates
			}
		},

		/* updateBlockGroupColor: (
			store,
			action: PayloadAction<{ uuid: string; value: string }>
		) => {
			if (store.BlockGroups[action.payload.uuid]) {
				store.BlockGroups[action.payload.uuid].styles.color = action.payload.value
			}
		}, */
	},

	selectors: {
		getBlockGroups: (store) => store.blockGroups,
		getBlockGroupDragging: (store) => store.blockGroupDragging,
	},
})

export const { getBlockGroups, getBlockGroupDragging } =
	blocksGroupsSlice.selectors

export const {
	addBlockGroup,
	addBlockToGroup,
	removeBlockGroup,
	setBlockGroupDragging,
	setBlockGroupParameters,
	updateBlockGroupPosition,
	updateBlockGroupActiveGateway,
} = blocksGroupsSlice.actions

export const blocksGroupsReducer = blocksGroupsSlice.reducer

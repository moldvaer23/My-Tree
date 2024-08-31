import { TCoordinates, TGatewaysNames } from '@app-types'
import { TBlockTextGroupStore } from '@entities/block-text-group'
import { TChildBlockTextGroup } from '@entities/block-text-group/lib/types'
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
			action: PayloadAction<{
				uuidGroup: string
				blockText: TChildBlockTextGroup
			}>
		) => {
			store.blockGroups[action.payload.uuidGroup].children.push(
				action.payload.blockText
			)
		},

		removeBlockGroup: (store, action: PayloadAction<string>) => {
			const uuid = action.payload
			if (store.blockGroups[uuid]) delete store.blockGroups[uuid]
		},

		removeBlockGroupChild: (
			store,
			action: PayloadAction<{ uuidGroup: string; uuidChild: string }>
		) => {
			const group = store.blockGroups[action.payload.uuidGroup]

			if (group) {
				const index = group.children.findIndex(
					(child) => child.uuid === action.payload.uuidChild
				)

				if (index !== -1)
					store.blockGroups[action.payload.uuidGroup].children.splice(index, 1)
			}
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

		updateBlockGroupColors: (
			store,
			action: PayloadAction<{
				uuid: string
				type: 'childBgColor' | 'childTextColor' | 'borderColor'
				value: string
			}>
		) => {
			if (store.blockGroups[action.payload.uuid]) {
				store.blockGroups[action.payload.uuid].styles[action.payload.type] =
					action.payload.value
			}
		},
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
	removeBlockGroupChild,
	setBlockGroupDragging,
	setBlockGroupParameters,
	updateBlockGroupPosition,
	updateBlockGroupActiveGateway,
	updateBlockGroupColors,
} = blocksGroupsSlice.actions

export const blocksGroupsReducer = blocksGroupsSlice.reducer

import { FC, MouseEvent } from 'react'
import { TGatewaysNames } from '@app-types'
import { useDispatch, useSelector } from '@services/store'
import { BlockTextGroup, TOnClickAddChild } from '@entities/block-text-group'
import {
	getConnectionsState,
	setConnectionState,
} from '@services/slices/global-slice'
import {
	Draggable,
	TOnSetIsDragging,
	TOnSetParameters,
	TOnUpdateCoordinates,
} from '@features/draggable'

import {
	addBlockToGroup,
	getBlockGroups,
	setBlockGroupDragging,
	setBlockGroupParameters,
	updateBlockGroupPosition,
} from '../lib/blocks-group-slice'

export const BlocksTextGroupsRender: FC = () => {
	const blockGroupsStore = useSelector(getBlockGroups)
	const connectionsState = useSelector(getConnectionsState)
	const dispatch = useDispatch()

	const onClickGateway = (
		_: MouseEvent,
		gatewayName: TGatewaysNames,
		uuid: string
	) => {
		/* Если был произведен клик по включенному но */
		/* не подключенному шлюзу то выключаем его */
		if (connectionsState.from && connectionsState.from.uuid === uuid) {
			dispatch(
				setConnectionState({
					variant: 'from',
					state: null,
				})
			)
		}

		/* Если шлюз "от" не включен то */
		/* включаем его, а если нажали на шлюз "куда" и */
		/* его uuid не равен uuid "от" то включаем его */
		if (connectionsState.from === null) {
			dispatch(
				setConnectionState({
					variant: 'from',
					state: {
						uuid: uuid,
						gateway: gatewayName,
						typeTool: 'block-text-group',
					},
				})
			)
		} else if (connectionsState.from.uuid !== uuid) {
			dispatch(
				setConnectionState({
					variant: 'to',
					state: {
						uuid: uuid,
						gateway: gatewayName,
						typeTool: 'block-text-group',
					},
				})
			)
		}
	}

	return Object.values(blockGroupsStore).map((blockGroup) => {
		const onSetIsDragging: TOnSetIsDragging = (value: boolean) => {
			if (value) {
				dispatch(setBlockGroupDragging(blockGroup.uuid))
			} else {
				dispatch(setBlockGroupDragging(null))
			}
		}

		const onSetParameters: TOnSetParameters = ({ height, width }) => {
			dispatch(
				setBlockGroupParameters({
					uuid: blockGroup.uuid,
					height: height,
					width: width,
				})
			)
		}

		const onUpdateCoordinates: TOnUpdateCoordinates = (coordinates) => {
			dispatch(
				updateBlockGroupPosition({
					uuid: blockGroup.uuid,
					coordinates: coordinates,
				})
			)
		}

		const onClickAddChild: TOnClickAddChild = (_, blockText) => {
			dispatch(
				addBlockToGroup({
					uuidGroup: blockGroup.uuid,
					blockText: blockText,
				})
			)
		}

		return (
			<Draggable
				key={blockGroup.uuid}
				childrenData={blockGroup}
				childrenStoreArr={Object.values(blockGroupsStore)}
				onSetIsDragging={onSetIsDragging}
				onSetParameters={onSetParameters}
				onUpdateCoordinates={onUpdateCoordinates}
			>
				<BlockTextGroup
					data={blockGroup}
					onClickAddChild={onClickAddChild}
					onClickGateway={onClickGateway}
				/>
			</Draggable>
		)
	})
}

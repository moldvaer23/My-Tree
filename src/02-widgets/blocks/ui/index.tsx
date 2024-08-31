import { FC, MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import { TGatewaysNames } from '@app-types'
import { useSelector } from '@services/store'
import { BlockText } from '@entities/block-text'
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
	getBlocks,
	setBlockDragging,
	setBlockParameters,
	updateBlockPosition,
} from '../lib/blocks-slice'

export const BlocksRender: FC = () => {
	const connectionsState = useSelector(getConnectionsState)
	const blocksStore = useSelector(getBlocks)
	const blocks = Object.values(blocksStore)

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
						typeTool: 'block-text',
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
						typeTool: 'block-text',
					},
				})
			)
		}
	}

	if (!blocks.length) return null

	return blocks.map((block) => {
		const onSetIsDragging: TOnSetIsDragging = (value: boolean) => {
			if (value) {
				dispatch(setBlockDragging(block.uuid))
			} else {
				dispatch(setBlockDragging(null))
			}
		}

		const onSetParameters: TOnSetParameters = ({ height, width }) => {
			dispatch(
				setBlockParameters({
					uuid: block.uuid,
					height: height,
					width: width,
				})
			)
		}

		const onUpdateCoordinates: TOnUpdateCoordinates = (coordinates) => {
			dispatch(
				updateBlockPosition({
					uuid: block.uuid,
					coordinates: coordinates,
				})
			)
		}

		return (
			<Draggable
				childrenData={block}
				onSetIsDragging={onSetIsDragging}
				onSetParameters={onSetParameters}
				onUpdateCoordinates={onUpdateCoordinates}
				childrenStoreArr={blocks}
				key={block.uuid}
			>
				<BlockText data={block} onClickGateway={onClickGateway} />
			</Draggable>
		)
	})
}

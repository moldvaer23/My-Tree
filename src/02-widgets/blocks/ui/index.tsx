import { FC, MouseEvent, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useDispatch } from 'react-redux'
import { useSelector } from '@services/store'
import { BlockText } from '@entities/block-text'
import { TConnectionState } from '@app-types/types'
import { TGatewaysNames } from '@app-types/ui-kit-types'
import {
	addConnection,
	getBlocks,
	setBlockDragging,
	setBlockParameters,
	updateBlockPosition,
} from '@services/slices/canvas-slice'
import {
	Draggable,
	TOnSetIsDragging,
	TOnSetParameters,
	TOnUpdateCoordinates,
} from '@features/draggable'

export const BlocksRender: FC = () => {
	const [connectionsState, setConnectionsState] = useState<TConnectionState>({
		from: null,
		to: null,
	})
	const blocksArr = useSelector(getBlocks)
	const blocks = Object.values(blocksArr)
	const dispatch = useDispatch()

	/* Добавление нового подключения если два блока были соединены */
	useEffect(() => {
		if (connectionsState.from !== null && connectionsState.to !== null) {
			dispatch(
				addConnection({
					from: {
						uuid: connectionsState.from.uuid,
						gateway: connectionsState.from.gateway,
					},
					to: {
						uuid: connectionsState.to.uuid,
						gateway: connectionsState.to.gateway,
					},
					type: 'straight',
					uuid: uuid(),
				})
			)

			setConnectionsState({
				from: null,
				to: null,
			})
		}
	}, [connectionsState])

	const onClickBlock = (
		_: MouseEvent,
		gatewayName: TGatewaysNames,
		uuid: string
	) => {
		if (connectionsState.from === null) {
			setConnectionsState({
				...connectionsState,
				from: {
					uuid: uuid,
					gateway: gatewayName,
				},
			})
		} else {
			setConnectionsState({
				...connectionsState,
				to: {
					uuid: uuid,
					gateway: gatewayName,
				},
			})
		}
	}

	if (!blocks.length) return null

	return blocks.map((block, index) => {
		const onSetIsDragging: TOnSetIsDragging = (value: boolean) => {
			dispatch(
				setBlockDragging({
					active: value,
					uuid: block.uuid,
				})
			)
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
				key={index}
			>
				<BlockText
					data={block}
					onClickBlock={(e) => console.log(e)}
					onClickGateway={onClickBlock}
				/>
			</Draggable>
		)
	})
}

import { FC, MouseEvent, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useDispatch } from 'react-redux'
import { TGatewaysNames } from '@app-types'
import { useSelector } from '@services/store'
import { BlockText } from '@entities/block-text'
import {
	Draggable,
	TOnSetIsDragging,
	TOnSetParameters,
	TOnUpdateCoordinates,
} from '@features/draggable'
import {
	addConnection,
	getBlocks,
	setBlockDragging,
	setBlockParameters,
	updateBlockActiveGateway,
	updateBlockPosition,
} from '@services/slices/canvas-slice'

import { TConnectionState } from '../lib/types'

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
			/* Добавляем подключение */
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

			/* Обновляем у блоков информацию о включенных шлюзах */
			dispatch(
				updateBlockActiveGateway({
					uuid: connectionsState.from.uuid,
					gatewayName: connectionsState.from.gateway,
					value: true,
				})
			)

			dispatch(
				updateBlockActiveGateway({
					uuid: connectionsState.to.uuid,
					gatewayName: connectionsState.to.gateway,
					value: true,
				})
			)

			setConnectionsState({
				from: null,
				to: null,
			})
		}
	}, [connectionsState])

	const onClickGateway = (
		_: MouseEvent,
		gatewayName: TGatewaysNames,
		uuid: string
	) => {
		/* Если был произведен клик по включенному но */
		/* не подключенному шлюзу то выключаем его */
		if (connectionsState.from && connectionsState.from.uuid === uuid) {
			console.log('+')
			setConnectionsState({
				...connectionsState,
				from: null,
			})
		}

		/* Если шлюз "от" не включен то */
		/* включаем его, а если нажали на шлюз "куда" и */
		/* его uuid не равен uuid "от" то включаем его */
		if (connectionsState.from === null) {
			setConnectionsState({
				...connectionsState,
				from: {
					uuid: uuid,
					gateway: gatewayName,
				},
			})
		} else if (connectionsState.from.uuid !== uuid) {
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

	return blocks.map((block) => {
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
				key={block.uuid}
			>
				<BlockText data={block} onClickGateway={onClickGateway} />
			</Draggable>
		)
	})
}

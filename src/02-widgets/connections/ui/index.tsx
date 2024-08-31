import { FC, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { Line } from '@entities/line/ui'
import { LineSvgWrapper } from '@entities/line'
import { useDispatch, useSelector } from '@services/store'
import { calculateLineOffsets } from '@widgets/connections/utils/calculate-line-offset'
import {
	getBlockDragging,
	getBlocks,
	updateBlockActiveGateway,
} from '@widgets/blocks'
import {
	getBlockGroupDragging,
	getBlockGroups,
	updateBlockGroupActiveGateway,
} from '@widgets/blocks-group'
import {
	clearConnectionsState,
	getConnectionsState,
	getGlobalStyleSettings,
} from '@services/slices/global-slice'

import {
	addConnection,
	getConnections,
	removeConnection,
} from '../lib/connections-slice'

export const ConnectionsRender: FC = () => {
	const blocks = useSelector(getBlocks)
	const blockGroups = useSelector(getBlockGroups)

	const connectionsStore = useSelector(getConnections)
	const connections = Object.values(connectionsStore)

	const uuidBlockDragging = useSelector(getBlockDragging)
	const uuidBlockGroupDragging = useSelector(getBlockGroupDragging)

	const connectionsState = useSelector(getConnectionsState)
	const globalStyleSettings = useSelector(getGlobalStyleSettings)

	const dispatch = useDispatch()

	/* Смотрим на изменения листа блоков. */
	/* Если блок "от" или "куда" был удален то */
	/* удаляем связанное с ними подключения и оповещаем блоки об отключении */
	useEffect(() => {
		connections.forEach((connection) => {
			const toolFrom =
				connection.from.typeTool === 'block-text'
					? blocks[connection.from.uuid]
					: connection.from.typeTool === 'block-text-group' &&
						blockGroups[connection.from.uuid]

			const toolTo =
				connection.to.typeTool === 'block-text'
					? blocks[connection.to.uuid]
					: connection.to.typeTool === 'block-text-group' &&
						blockGroups[connection.to.uuid]

			if (!toolFrom || !toolTo) {
				if (
					connection.from.typeTool === 'block-text' ||
					connection.to.typeTool === 'block-text'
				) {
					dispatch(
						updateBlockActiveGateway({
							uuid: connection.from.uuid,
							gatewayName: connection.from.gateway,
							value: false,
						})
					)

					dispatch(
						updateBlockActiveGateway({
							uuid: connection.to.uuid,
							gatewayName: connection.to.gateway,
							value: false,
						})
					)
				}

				if (
					connection.from.typeTool === 'block-text-group' ||
					connection.to.typeTool === 'block-text-group'
				) {
					dispatch(
						updateBlockGroupActiveGateway({
							uuid: connection.from.uuid,
							gatewayName: connection.from.gateway,
							value: false,
						})
					)

					dispatch(
						updateBlockGroupActiveGateway({
							uuid: connection.to.uuid,
							gatewayName: connection.to.gateway,
							value: false,
						})
					)
				}

				dispatch(removeConnection(connection.uuid))
			}
		})
	}, [connections, blocks, blockGroups])

	/* Добавление нового подключения если два блока были соединены */
	useEffect(() => {
		if (connectionsState.from !== null && connectionsState.to !== null) {
			/* Добавляем подключение */
			dispatch(
				addConnection({
					from: {
						uuid: connectionsState.from.uuid,
						gateway: connectionsState.from.gateway,
						typeTool: connectionsState.from.typeTool,
					},
					to: {
						uuid: connectionsState.to.uuid,
						gateway: connectionsState.to.gateway,
						typeTool: connectionsState.to.typeTool,
					},
					type: 'straight',
					style: {
						lineColor: globalStyleSettings.lineColor,
					},
					uuid: uuid(),
				})
			)

			/* Обновляем у блоков информацию о включенных шлюзах */
			if (
				connectionsState.from.typeTool === 'block-text' ||
				connectionsState.to.typeTool === 'block-text'
			) {
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
			}

			/* Обновляем у групп блоков информацию о включенных шлюзах */
			if (
				connectionsState.from.typeTool === 'block-text-group' ||
				connectionsState.to.typeTool === 'block-text-group'
			) {
				dispatch(
					updateBlockGroupActiveGateway({
						uuid: connectionsState.from.uuid,
						gatewayName: connectionsState.from.gateway,
						value: true,
					})
				)

				dispatch(
					updateBlockGroupActiveGateway({
						uuid: connectionsState.to.uuid,
						gatewayName: connectionsState.to.gateway,
						value: true,
					})
				)
			}

			dispatch(clearConnectionsState())
		}
	}, [connectionsState])

	if (!connections.length) return null

	return (
		<LineSvgWrapper>
			{connections.map((connection) => {
				/* Из ходя из типа инструмента смотрим в нужном словаре объект */
				const toolFrom =
					connection.from.typeTool === 'block-text'
						? blocks[connection.from.uuid]
						: connection.from.typeTool === 'block-text-group' &&
							blockGroups[connection.from.uuid]

				const toolTo =
					connection.to.typeTool === 'block-text'
						? blocks[connection.to.uuid]
						: connection.to.typeTool === 'block-text-group' &&
							blockGroups[connection.to.uuid]

				/* Если необходимых данных нету то возвращаем null */
				if (!toolFrom || !toolTo) return null
				if (!toolFrom.parameters || !toolTo.parameters) return null

				/* Скрываем соединение если двигают блоки */
				if (
					uuidBlockDragging &&
					(toolFrom.uuid === uuidBlockDragging ||
						toolTo.uuid === uuidBlockDragging)
				) {
					return null
				}

				/* Скрываем соединение если двигают группы блоков */
				if (
					uuidBlockGroupDragging &&
					(toolFrom.uuid === uuidBlockGroupDragging ||
						toolTo.uuid === uuidBlockGroupDragging)
				) {
					return null
				}

				let from = { x: 0, y: 0 }
				let to = { x: 0, y: 0 }

				from = calculateLineOffsets({
					coordinates: toolFrom.coordinates,
					gatewayName: connection.from.gateway,
					height: toolFrom.parameters.height,
					width: toolFrom.parameters.width,
				})

				to = calculateLineOffsets({
					coordinates: toolTo.coordinates,
					gatewayName: connection.to.gateway,
					height: toolTo.parameters.height,
					width: toolTo.parameters.width,
				})

				return (
					<Line
						key={connection.uuid}
						coordinateFrom={from}
						coordinateTo={to}
						data={connection}
					/>
				)
			})}
		</LineSvgWrapper>
	)
}

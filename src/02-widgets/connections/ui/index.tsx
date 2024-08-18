import { FC, useEffect } from 'react'
import { Line, LineSvgWrapper } from '@ui-kit/line'
import { useDispatch, useSelector } from '@services/store'
import { calculateLineOffsets } from '@entities/block-text/utils/calculate-line-offset'
import {
	getBlockDragging,
	getBlocks,
	getConnections,
	removeConnection,
	updateBlockActiveGateway,
} from '@services/slices/canvas-slice'

export const ConnectionsRender: FC = () => {
	const blocks = useSelector(getBlocks)
	const connectionsArr = useSelector(getConnections)
	const connections = Object.values(connectionsArr)
	const dragging = useSelector(getBlockDragging)
	const dispatch = useDispatch()

	/* Смотри на изменения листа блоков. */
	/* Если блок "от" или "куда" был удален то */
	/* удаляем связанное с ними подключения и оповещаем блоки об отключении */
	useEffect(() => {
		connections.forEach((connection) => {
			const blockFrom = blocks[connection.from.uuid]
			const blockTo = blocks[connection.to.uuid]

			if (!blockFrom || !blockTo) {
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

				dispatch(removeConnection(connection.uuid))
			}
		})
	}, [connections, blocks])

	if (!connections.length) return null

	return (
		<LineSvgWrapper>
			{connections.map((connection) => {
				const blockFrom = blocks[connection.from.uuid]
				const blockTo = blocks[connection.to.uuid]

				/* Если необходимых данных нету то возвращаем null */
				if (!blockFrom || !blockTo) return null
				if (!blockFrom.parameters || !blockTo.parameters) return null

				if (
					dragging.active &&
					(blockFrom.uuid === dragging.uuid || blockTo.uuid === dragging.uuid)
				) {
					return null
				}

				let from = { x: 0, y: 0 }
				let to = { x: 0, y: 0 }

				from = calculateLineOffsets({
					coordinates: blockFrom.coordinates,
					gatewayName: connection.from.gateway,
					height: blockFrom.parameters.height,
					width: blockFrom.parameters.width,
				})

				to = calculateLineOffsets({
					coordinates: blockTo.coordinates,
					gatewayName: connection.to.gateway,
					height: blockTo.parameters.height,
					width: blockTo.parameters.width,
				})

				return (
					<Line
						key={connection.uuid}
						from={from}
						to={to}
						color={connection.style.lineColor}
						type={connection.type}
					/>
				)
			})}
		</LineSvgWrapper>
	)
}

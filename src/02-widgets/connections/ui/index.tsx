import { FC } from 'react'
import { useSelector } from '@services/store'
import { Line, LineSvgWrapper } from '@ui-kit/line'
import { calculateLineOffsets } from '@entities/block-text/utils/calculate-line-offset'
import {
	getBlockDragging,
	getBlocks,
	getConnections,
} from '@services/slices/canvas-slice'

export const ConnectionsRender: FC = () => {
	const blocks = useSelector(getBlocks)
	const connectionsArr = useSelector(getConnections)
	const connections = Object.values(connectionsArr)
	const dragging = useSelector(getBlockDragging)

	if (!connections.length) return <></>

	return (
		<LineSvgWrapper>
			{connections.map((connection, index) => {
				const blockFrom = blocks[connection.from.uuid]
				const blockTo = blocks[connection.to.uuid]

				/* Если необходимых данных нет то возвращаем null */
				if (
					!blockFrom ||
					!blockTo ||
					!blockFrom.parameters ||
					!blockTo.parameters
				) {
					return null
				}

				/* Если блок перетаскивают и uuid совпали с данными в линии, то */
				/* возвращаем null */
				if (
					dragging.active &&
					(blockFrom.uuid === dragging.uuid || blockTo.uuid === dragging.uuid)
				) {
					return null
				}

				/*
				 * Основная логика отрисовки линии
				 */

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
						key={index}
						from={from}
						to={to}
						color='#f8ad00'
						type={connection.type}
					/>
				)
			})}
		</LineSvgWrapper>
	)
}

import { FC, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { TConnectionState } from '@app-types/types'
import { useDispatch, useSelector } from '@services/store'
import {
	addConnection,
	getBlockDragging,
	getBlocks,
	getConnections,
	setConnectedGateway,
} from '@services/slices/canvas-slice'
import { MainPageUI } from './ui-page'

export const MainPage: FC = () => {
	const [connectionsState, setConnectionsState] = useState<TConnectionState>({
		from: null,
		to: null,
	})
	const blocks = useSelector(getBlocks)
	const connections = useSelector(getConnections)
	const blockDragging = useSelector(getBlockDragging)
	const dispatch = useDispatch()

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

			/* Устанавливаем для блока From активное подключение */
			dispatch(
				setConnectedGateway({
					uuid: connectionsState.from.uuid,
					gatewayName: connectionsState.from.gateway,
					isConnected: true,
				})
			)

			/* Устанавливаем для блока To активное подключение */
			dispatch(
				setConnectedGateway({
					uuid: connectionsState.to.uuid,
					gatewayName: connectionsState.to.gateway,
					isConnected: true,
				})
			)

			setConnectionsState({
				from: null,
				to: null,
			})
		}
	}, [connectionsState])

	return (
		<MainPageUI
			blockDragging={blockDragging}
			blocks={blocks}
			connectionState={connectionsState}
			connections={connections}
			setConnectionState={setConnectionsState}
		/>
	)
}

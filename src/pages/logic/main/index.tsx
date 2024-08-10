import { FC, useEffect, useState } from 'react'

import { v4 as uuid } from 'uuid'

import { MainPageUI } from '@pages/ui/main'
import { TConnectionState } from '@utils/types'
import { useDispatch, useSelector } from '@services/store'
import {
	addConnection,
	getBlockDragging,
	getBlocks,
	getConnections,
} from '@services/slices/canvas-slice'

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
					type: 'curved',
					uuid: uuid(),
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

import { FC, MouseEvent, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useDispatch } from 'react-redux'
import { useSelector } from '@services/store'
import { BlockText } from '@entities/block-text'
import { TConnectionState } from '@app-types/types'
import { TGatewaysNames } from '@app-types/ui-kit-types'
import { addConnection, getBlocks } from '@services/slices/canvas-slice'

export const BlocksRender: FC = () => {
	const [connectionsState, setConnectionsState] = useState<TConnectionState>({
		from: null,
		to: null,
	})
	const blocksArr = useSelector(getBlocks)
	const blocks = Object.values(blocksArr)
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

	if (!blocks.length) return <></>

	return blocks.map((block, index) => (
		<BlockText
			key={index}
			data={block}
			onClickBlock={(e) => console.log(e)}
			onClickGateway={onClickBlock}
		/>
	))
}

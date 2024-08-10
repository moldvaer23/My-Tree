import { FC } from 'react'

import { Header } from '@components/logic/header'
import { Canvas } from '@components/logic/canvas'
import { BlockText } from '@components/logic/block-text'
import { calculateGatewayOffsets } from '@utils/helpers'
import { AsideTools } from '@components/logic/aside-tools'
import { Line, LineSvgWrapper } from '@components/ui-kit/line'
import { TBlockStore, TConnectionState, TConnectionStore } from '@utils/types'

import style from './style.module.scss'

type TProps = {
	blocks: Record<string, TBlockStore>
	connectionState: TConnectionState
	connections: Record<string, TConnectionStore>
	setConnectionState: (T: TConnectionState) => void
	blockDragging: boolean
}

/* TODO: Вынести логику отрисовки из Page (Разбить компонент) */
/* TODO: Не удалять линии а скрывать их видимость во время передвижения блока */

export const MainPageUI: FC<TProps> = ({
	blocks,
	connectionState,
	connections,
	blockDragging,
	setConnectionState,
}) => {
	const blockArr = Object.values(blocks)
	const connectionsArr = Object.values(connections)

	return (
		<div className={style.page}>
			<Header />
			<main className={style.main}>
				<Canvas>
					{blockArr.length
						? blockArr.map((block, index) => (
								<BlockText
									key={index}
									data={block}
									onClickBlock={(e) => console.log(e)}
									onClickGateway={(_, position) => {
										if (connectionState.from === null) {
											setConnectionState({
												...connectionState,
												from: {
													uuid: block.uuid,
													gateway: position,
												},
											})
										} else {
											setConnectionState({
												...connectionState,
												to: {
													uuid: block.uuid,
													gateway: position,
												},
											})
										}
									}}
									blockPosition={block.position}
									title={block.title}
								/>
							))
						: null}
					{connectionsArr.length && !blockDragging ? (
						<LineSvgWrapper>
							{connectionsArr.map((connection, index) => {
								const blockFrom = blocks[connection.from.uuid]
								const blockTo = blocks[connection.to.uuid]

								let from = { x: 0, y: 0 }
								let to = { x: 0, y: 0 }

								if (blockFrom.parameters && blockTo.parameters) {
									from = calculateGatewayOffsets({
										coordinates: blockFrom.position,
										gatewayName: connection.from.gateway,
										height: blockFrom.parameters.height,
										width: blockFrom.parameters.width,
									})

									to = calculateGatewayOffsets({
										coordinates: blockTo.position,
										gatewayName: connection.to.gateway,
										height: blockTo.parameters.height,
										width: blockTo.parameters.width,
									})
								}

								return (
									<Line
										key={index}
										from={from}
										to={to}
										type={connection.type}
									/>
								)
							})}
						</LineSvgWrapper>
					) : null}
				</Canvas>
				<AsideTools />
			</main>
		</div>
	)
}

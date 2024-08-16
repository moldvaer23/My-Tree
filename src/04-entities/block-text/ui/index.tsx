import { FC, MouseEvent, useRef, useState } from 'react'
import { TGatewaysNames } from '@app-types'
import { useDispatch } from '@services/store'
import { setRightContext } from '@services/slices/canvas-slice'

import { GatewaysUI } from './gateways'
import style from './styles.module.scss'
import { TBlockStore } from '../lib/types'

type TProps = {
	data: TBlockStore
	onClickGateway: (e: MouseEvent, t: TGatewaysNames, y: string) => void
}

/* TODO: Придумать как будет пользователь вносить title */
/* TODO: Провести оптимизацию компонента */

export const BlockText: FC<TProps> = ({ data, onClickGateway }) => {
	const [isHover, setIsHover] = useState<boolean>(false)
	const rootRef = useRef<HTMLDivElement | null>(null)
	const dispatch = useDispatch()

	const onClickRightContext = (e: MouseEvent) => {
		e.preventDefault()
		dispatch(
			setRightContext({
				coordinates: {
					x: e.clientX,
					y: e.clientY,
				},
				edit: {
					tool: data,
					type: 'block-text',
				},
			})
		)
	}

	const onMouseDown = () => {
		dispatch(setRightContext(null))
	}

	return (
		<div
			className={style.wrapper}
			ref={rootRef}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			onContextMenu={onClickRightContext}
			onMouseDown={onMouseDown}
			{...(data.styles.bgColor && {
				style: {
					backgroundColor: data.styles.bgColor,
				},
			})}
			data-testid='block-text'
		>
			<span className={style.title}>{data.title}</span>

			<GatewaysUI
				connectedGateways={data.gateways.connectedGateways}
				isActive={isHover}
				uuidBlock={data.uuid}
				onClickGateway={onClickGateway}
			/>
		</div>
	)
}

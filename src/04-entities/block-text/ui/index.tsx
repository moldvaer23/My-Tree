import { FC, MouseEvent, useRef, useState } from 'react'
import { TGatewaysNames } from '@app-types'
import { Gateways } from '@ui-kit/gateways'
import { useDispatch } from '@services/store'
import { setRightContext } from '@features/right-context'

import style from './styles.module.scss'
import { TBlockStore } from '../lib/types'

type TProps = {
	data: TBlockStore
	hideGateways?: boolean
	onClickGateway?: (e: MouseEvent, t: TGatewaysNames, y: string) => void
}

export const BlockText: FC<TProps> = ({
	data,
	onClickGateway = () => {},
	hideGateways,
}) => {
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
			style={{
				backgroundColor: data.styles.color,
				color: data.styles.textColor,
				fontSize: `${data.styles.fontSize}px`,
				fontWeight: data.styles.fontBold ? 700 : 400,
				fontStyle: data.styles.curs ? 'italic' : 'normal',
			}}
			data-testid='block-text'
		>
			<span className={style.title}>{data.title}</span>

			{!hideGateways && (
				<Gateways
					connectedGateways={data.gateways.connectedGateways}
					isActive={isHover}
					uuidTool={data.uuid}
					onClickGateway={onClickGateway}
				/>
			)}
		</div>
	)
}

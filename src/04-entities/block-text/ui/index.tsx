import { FC, MouseEvent, useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'
import { useDispatch } from '@services/store'
import { TBlockStore, TCoordinates } from '@app-types/types'
import { TActiveGatewayState, TGatewaysNames } from '@app-types/ui-kit-types'
import {
	setBlockDragging,
	setBlockParameters,
	updateBlockPosition,
} from '@services/slices/canvas-slice'

import { GatewaysUI } from './gateways'
import style from './styles.module.scss'

type TProps = {
	className?: string
	data: TBlockStore
	onClickBlock: (e: MouseEvent) => void
	onClickGateway: (e: MouseEvent, position: TGatewaysNames) => void
}

/* TODO: Придумать как будет пользователь вносить title */
/* TODO: Починить баг блоки могут налетать друг на друга */
/* TODO: Провести оптимизацию компонента */

export const BlockText: FC<TProps> = ({
	className = 'undefined',
	data,
	onClickBlock,
	onClickGateway,
}) => {
	const [activeGateway, setActiveGateway] = useState<TActiveGatewayState>(null)
	const [dragging, setDragging] = useState<boolean>(false)
	const [isHover, setIsHover] = useState<boolean>(false)
	const [offset, setOffset] = useState<TCoordinates>({ x: 0, y: 0 })
	const [coordinates, setCoordinates] = useState<TCoordinates>({
		x: data.position.x,
		y: data.position.y,
	})
	const blockRef = useRef<HTMLButtonElement | null>(null)
	const dispatch = useDispatch()

	/*
	 * Хендлеры для работы с блоком
	 */
	const handleMouseDown = (e: MouseEvent) => {
		e.stopPropagation()
		setDragging(true)
		dispatch(setBlockDragging(true))
		setOffset({ x: e.clientX - coordinates.x, y: e.clientY - coordinates.y })
	}

	const handleMouseMove = (e: globalThis.MouseEvent) => {
		if (dragging) {
			setCoordinates({ x: e.clientX - offset.x, y: e.clientY - offset.y })
		}
	}

	const handleMouseUp = (e: globalThis.MouseEvent) => {
		setDragging(false)
		dispatch(setBlockDragging(false))
		dispatch(
			updateBlockPosition({
				uuid: data.uuid,
				coordinates: { x: e.clientX - offset.x, y: e.clientY - offset.y },
			})
		)
	}

	/* Отправляем данные о параметрах блока в Redux, */
	/* при изменении параметров блока сообщаем о том, */
	/* что они были изменены */
	useEffect(() => {
		const block = blockRef.current

		if (block) {
			dispatch(
				setBlockParameters({
					uuid: data.uuid,
					height: block.clientHeight,
					width: block.clientWidth,
				})
			)
		}
	}, [blockRef.current])

	/* Вешаем слушатели для передвижения блока */
	useEffect(() => {
		const block = blockRef.current

		if (block && dragging) {
			document.addEventListener('mousemove', handleMouseMove)
			document.addEventListener('mouseup', handleMouseUp)

			return () => {
				document.removeEventListener('mousemove', handleMouseMove)
				document.removeEventListener('mouseup', handleMouseUp)
			}
		}
	}, [dragging])

	return (
		<div
			className={style.wrapper}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			style={{
				position: 'absolute',
				top: coordinates.y,
				left: coordinates.x,
			}}
			data-testid='block-text'
		>
			<button
				ref={blockRef}
				onClick={onClickBlock}
				onMouseDown={handleMouseDown}
				className={clsx(
					{
						[className]: className !== 'undefined',
					},
					style.block_text
				)}
				{...(data.styles.bgColor && {
					style: {
						backgroundColor: data.styles.bgColor,
					},
				})}
			>
				<span className={style.title}>{data.title}</span>
			</button>

			<GatewaysUI
				activeGateway={activeGateway}
				connectedGateways={data.gateways.connectedGateways}
				isActive={isHover}
				onClickGateway={onClickGateway}
				setActiveGateway={setActiveGateway}
			/>
		</div>
	)
}

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
	onClickGateway: (e: MouseEvent, t: TGatewaysNames, y: string) => void
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

	/* Используется для синхронного хранения данных о координатах, */
	/* для того что бы отправить актуальный данные при отпускании мышки */
	const coordinatesRef = useRef<TCoordinates>({
		x: data.position.x,
		y: data.position.y,
	})
	const blockRef = useRef<HTMLButtonElement | null>(null)
	const dispatch = useDispatch()

	const handleMouseDown = (e: MouseEvent) => {
		e.stopPropagation()
		setDragging(true)
		dispatch(setBlockDragging(true))
		setOffset({ x: e.clientX - coordinates.x, y: e.clientY - coordinates.y })
	}

	const handleMouseMove = (e: globalThis.MouseEvent) => {
		const canvasRect =
			blockRef.current?.parentElement?.parentElement?.getBoundingClientRect()
		const blockRect = blockRef.current?.getBoundingClientRect()

		if (!canvasRect || !blockRect) return

		const newX = e.clientX - offset.x
		const newY = e.clientY - offset.y

		/* Проверяем, чтобы блок не выходил за границы холста */
		const clampedX = Math.min(
			Math.max(newX, 0),
			canvasRect.width - blockRect.width
		)
		const clampedY = Math.min(
			Math.max(newY, 0),
			canvasRect.height - blockRect.height
		)

		/* Обновляем координаты и `useRef` */
		setCoordinates({ x: clampedX, y: clampedY })
		coordinatesRef.current = { x: clampedX, y: clampedY }
	}

	const handleMouseUp = () => {
		setDragging(false)
		dispatch(setBlockDragging(false))

		/* Обновляем позицию блока в хранилище, */
		/* отправляя синхронные актуальные координаты */
		dispatch(
			updateBlockPosition({
				uuid: data.uuid,
				coordinates: coordinatesRef.current,
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
				uuidBlock={data.uuid}
				onClickGateway={onClickGateway}
				setActiveGateway={setActiveGateway}
			/>
		</div>
	)
}

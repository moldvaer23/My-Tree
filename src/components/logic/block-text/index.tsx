import { FC, MouseEvent, useEffect, useRef, useState } from 'react'

import { clsx } from 'clsx'

import { TBlockStore, TCoordinates } from '@utils/types'
import { useDispatch } from '@services/store'
import { TActiveGatewayState } from '@utils/ui-kit-types'
import {
	setBlockDragging,
	setBlockParameters,
	updateBlockPosition,
} from '@services/slices/canvas-slice'

import style from './styles.module.scss'

type TProps = {
	bgColor?: string
	blockPosition: TCoordinates
	className?: string
	data: TBlockStore
	onClickBlock: (e: MouseEvent) => void
	onClickGateway: (e: MouseEvent, position: TActiveGatewayState) => void
	title: string
}

/* TODO: Придумать как будет пользователь вносить title */
/* TODO: Убрать ошибку с handleMouseMove */
/* TODO: Починить баг с быстрым вылетом мышки */
/* TODO: Починить баг при отдалении поля перемещение работает криво */
/* TODO: Починить баг блоки могут налетать друг на друга */
/* TODO: Разбить компонент что бы сделать меньше */
/* TODO: Провести оптимизацию компонента */

export const BlockText: FC<TProps> = ({
	bgColor,
	blockPosition,
	className = 'undefined',
	data,
	onClickBlock,
	onClickGateway,
	title,
}) => {
	const [isHover, setIsHover] = useState<boolean>(false)
	const [activeGateway, setActiveGateway] = useState<TActiveGatewayState>(null)
	const [dragging, setDragging] = useState(false)
	const [position, setPosition] = useState({
		x: blockPosition.x,
		y: blockPosition.y,
	})
	const [offset, setOffset] = useState<TCoordinates>({ x: 0, y: 0 })

	const blockRef = useRef<HTMLButtonElement | null>(null)
	const dispatch = useDispatch()

	const onClickGatewayWrapper = (e: MouseEvent) => {
		/* Достаем атрибут который хранит в себе позицию шлюза */
		const position = e.currentTarget.getAttribute(
			'data-gateway-position'
		) as TActiveGatewayState

		if (!position) return

		if (!activeGateway || activeGateway !== position) {
			setActiveGateway(position)
			onClickGateway(e, position)
		} else if (activeGateway === position) {
			setActiveGateway(null)
		}
	}

	const handleMouseDown = (e: MouseEvent) => {
		setDragging(true)
		dispatch(setBlockDragging(true))
		setOffset({ x: e.clientX - position.x, y: e.clientY - position.y })
	}

	const handleMouseMove = (e: globalThis.MouseEvent) => {
		if (dragging) {
			setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y })
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
			onMouseLeave={() => {
				if (!activeGateway) setIsHover(false)
			}}
			style={{
				position: 'absolute',
				top: position.y,
				left: position.x,
			}}
		>
			<button
				ref={blockRef}
				onClick={onClickBlock}
				onMouseDown={handleMouseDown}
			>
				<article
					className={clsx(
						{
							[className]: className !== 'undefined',
						},
						style.block_text
					)}
					style={{
						backgroundColor: bgColor,
					}}
				>
					<span className={style.title}>{title}</span>
				</article>
			</button>
			{isHover && (
				<>
					<button
						className={clsx(style.gateway, style.top, {
							[style.active_gateway]: activeGateway === 'top',
						})}
						data-gateway-position='top'
						onClick={onClickGatewayWrapper}
					/>
					<button
						className={clsx(style.gateway, style.right, {
							[style.active_gateway]: activeGateway === 'right',
						})}
						data-gateway-position='right'
						onClick={onClickGatewayWrapper}
					/>
					<button
						className={clsx(style.gateway, style.bottom, {
							[style.active_gateway]: activeGateway === 'bottom',
						})}
						data-gateway-position='bottom'
						onClick={onClickGatewayWrapper}
					/>
					<button
						className={clsx(style.gateway, style.left, {
							[style.active_gateway]: activeGateway === 'left',
						})}
						data-gateway-position='left'
						onClick={onClickGatewayWrapper}
					/>
				</>
			)}
		</div>
	)
}

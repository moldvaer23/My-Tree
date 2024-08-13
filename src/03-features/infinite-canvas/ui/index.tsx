import { FC, MouseEvent, ReactNode, useRef, useState, WheelEvent } from 'react'
import { useSelector } from '@services/store'
import { TCoordinates } from '@app-types/types'
import { getBlockDragging } from '@services/slices/canvas-slice'

import style from './style.module.scss'
import { CANVAS_SIZES, CANVAS_START_VIEW_POSITION } from '../config/canvas'

type TProps = {
	children?: ReactNode
}

export const InfiniteCanvas: FC<TProps> = ({ children }) => {
	const [isPanning, setIsPanning] = useState(false)
	const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })
	const [offset, setOffset] = useState<TCoordinates>(CANVAS_START_VIEW_POSITION)
	const [scale, setScale] = useState(1)
	const canvasRef = useRef<HTMLDivElement>(null)
	const isBlockDragging = useSelector(getBlockDragging)

	const handleWheel = (e: WheelEvent) => {
		const scaleAmount = e.deltaY * -0.0001
		const newScale = Math.min(Math.max(scale + scaleAmount, 0.1), 10)
		setScale(newScale)
	}

	const handleMouseDown = (e: MouseEvent) => {
		setIsPanning(true)
		setLastMousePos({ x: e.clientX, y: e.clientY })
	}

	const handleMouseMove = (e: MouseEvent) => {
		if (!isPanning || isBlockDragging) return

		const dx = e.clientX - lastMousePos.x
		const dy = e.clientY - lastMousePos.y

		const canvas = canvasRef.current
		if (!canvas) return

		const canvasRect = canvas.getBoundingClientRect()
		const parentRect = canvas.parentElement?.getBoundingClientRect()

		if (!parentRect) return

		/* Новые значения offset с учетом перемещения */
		let newOffsetX = offset.x + dx
		let newOffsetY = offset.y + dy

		/* Ограничение смещения по горизонтали */
		if (newOffsetX > 0) {
			newOffsetX = 0
		} else if (newOffsetX < parentRect.width - canvasRect.width * scale) {
			newOffsetX = parentRect.width - canvasRect.width * scale
		}

		/* Ограничение смещения по вертикали */
		if (newOffsetY > 0) {
			newOffsetY = 0
		} else if (newOffsetY < parentRect.height - canvasRect.height * scale) {
			newOffsetY = parentRect.height - canvasRect.height * scale
		}

		/* Обновление состояния offset */
		setOffset({ x: newOffsetX, y: newOffsetY })
		setLastMousePos({ x: e.clientX, y: e.clientY })
	}

	const handleMouseUp = () => {
		setIsPanning(false)
	}

	return (
		<div
			onWheel={handleWheel}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
			style={{
				width: '100vw',
				height: '100vh',
				overflow: 'hidden',
				position: 'relative',
				cursor: isPanning ? 'grabbing' : 'grab',
			}}
		>
			<div
				ref={canvasRef}
				className={style.canvas_inner}
				style={{
					transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
					transformOrigin: '0 0',
					width: `${CANVAS_SIZES.WIDTH}`,
					height: `${CANVAS_SIZES.HEIGHT}`,
				}}
			>
				{children}
			</div>
		</div>
	)
}

import { FC, MouseEvent, ReactNode, useRef, useState, WheelEvent } from 'react'
import { TCoordinates } from '@app-types'
import { useSelector } from '@services/store'

import style from './style.module.scss'
import {
	CANVAS_SCROLL,
	CANVAS_SIZES,
	CANVAS_START_VIEW_POSITION,
} from '../config/canvas'
import { getBlockDragging } from '@widgets/blocks'

type TProps = {
	children?: ReactNode
}

export const InfiniteCanvas: FC<TProps> = ({ children }) => {
	const [isPanning, setIsPanning] = useState(false)
	const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })
	const [offset, setOffset] = useState<TCoordinates>(CANVAS_START_VIEW_POSITION)
	const [scale, setScale] = useState(1)
	const uuidBlockDragging = useSelector(getBlockDragging)
	const canvasRef = useRef<HTMLDivElement>(null)
	const canvasSizesRef = useRef({
		width: CANVAS_SIZES.WIDTH,
		height: CANVAS_SIZES.HEIGHT,
	})

	const handleWheel = (e: WheelEvent) => {
		const scaleAmount = e.deltaY * CANVAS_SCROLL.STEP
		const newScale = Math.min(
			Math.max(scale + scaleAmount, CANVAS_SCROLL.OUT),
			CANVAS_SCROLL.IN
		)

		/* Если произошел scroll удваиваем ширину и высоту поля */
		if (newScale !== CANVAS_SCROLL.IN) {
			canvasSizesRef.current.width = CANVAS_SIZES.WIDTH * 2
			canvasSizesRef.current.height = CANVAS_SIZES.HEIGHT * 2
		}

		setScale(newScale)
	}

	const handleMouseDown = (e: MouseEvent) => {
		setIsPanning(true)
		setLastMousePos({ x: e.clientX, y: e.clientY })
	}

	const handleMouseMove = (e: MouseEvent) => {
		if (!isPanning || uuidBlockDragging) return

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
					width: `${canvasSizesRef.current.width}px`,
					height: `${canvasSizesRef.current.height}px`,
				}}
			>
				{children}
			</div>
		</div>
	)
}

import { useState, useRef, useEffect, FC, ReactNode } from 'react'
import style from './style.module.scss'
import { useSelector } from '@services/store'
import { getBlockDragging } from '@services/slices/canvas-slice'

interface TProps {
	children: ReactNode
}

/* TODO: Убрать баг с нахлестом элементов на другие элементы страниц */
/* TODO: Убрать баг с выходом блоков за поле */
/* TODO: Подумать над тем что поле с верху сразу является концом поля */
/* TODO: Решить добавлять ли зум */

/*
 * У компонента отключен scale при scroll-е
 */

export const PanZoomContainer: FC<TProps> = ({ children }) => {
	/* const [scale, setScale] = useState(1) */
	const [isDragging, setIsDragging] = useState(false)
	const [startPoint, setStartPoint] = useState({ x: 0, y: 0 })
	const [translate, setTranslate] = useState({ x: 0, y: 0 })
	const canvasInnerRef = useRef<HTMLDivElement | null>(null)
	const isBlockDragging = useSelector(getBlockDragging)

	/* 	const maxScale = 2
	const minScale = 1
	const stepScale = -0.01
 */
	/* 	const handleWheel = (e: WheelEvent) => {
		e.preventDefault()
		const newScale = Math.min(
			Math.max(scale + e.deltaY * stepScale, minScale),
			maxScale
		)
		setScale(newScale)
	} */

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		// Начинаем перетаскивание только если не перетаскивается блок
		if (!isBlockDragging) {
			e.preventDefault()
			setIsDragging(true)
			setStartPoint({ x: e.clientX - translate.x, y: e.clientY - translate.y })
		}
	}

	const handleMouseMove = (e: MouseEvent) => {
		if (isDragging && !isBlockDragging) {
			setTranslate({
				x: e.clientX - startPoint.x,
				y: e.clientY - startPoint.y,
			})
		}
	}

	const handleMouseUp = () => {
		setIsDragging(false)
	}

	useEffect(() => {
		const canvas = canvasInnerRef.current

		if (canvas) {
			/* canvas.addEventListener('wheel', handleWheel) */
			document.addEventListener('mousemove', handleMouseMove)
			document.addEventListener('mouseup', handleMouseUp)

			return () => {
				/* 	canvas.removeEventListener('wheel', handleWheel) */
				document.removeEventListener('mousemove', handleMouseMove)
				document.removeEventListener('mouseup', handleMouseUp)
			}
		}
	}, [isDragging, isBlockDragging, startPoint])

	return (
		<div className={style.canvas} onMouseDown={handleMouseDown}>
			<div
				ref={canvasInnerRef}
				className={style.canvasInner}
				style={{
					// transform: `scale(${scale}) translate(${translate.x}px, ${translate.y}px)`,
					transform: `translate(${translate.x}px, ${translate.y}px)`,
					transformOrigin: '0 0',
				}}
			>
				{children}
			</div>
		</div>
	)
}

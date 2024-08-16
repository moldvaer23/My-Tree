import { MouseEvent, ReactNode, useEffect, useRef, useState } from 'react'
import { TCoordinates, TExampleToolStore } from '@app-types'

import style from './style.module.scss'
import { checkingToolOverlay } from '../utils/checking-tool-overlay'
import {
	TOnSetIsDragging,
	TOnSetParameters,
	TOnUpdateCoordinates,
} from '../lib/types'

type TProps<T> = {
	children: ReactNode | ReactNode[]
	childrenData: TExampleToolStore
	childrenStoreArr: T[]
	onSetIsDragging: TOnSetIsDragging
	onSetParameters: TOnSetParameters
	onUpdateCoordinates: TOnUpdateCoordinates
}

export const Draggable = <T extends TExampleToolStore>({
	children,
	childrenData,
	childrenStoreArr,
	onSetIsDragging,
	onSetParameters,
	onUpdateCoordinates,
}: TProps<T>): JSX.Element => {
	const [dragging, setDragging] = useState<boolean>(false)
	const [offset, setOffset] = useState<TCoordinates>({ x: 0, y: 0 })
	const [coordinates, setCoordinates] = useState<TCoordinates>({
		x: childrenData.coordinates.x,
		y: childrenData.coordinates.y,
	})
	const rootRef = useRef<HTMLDivElement | null>(null)

	const handleMouseDown = (e: MouseEvent) => {
		e.stopPropagation()

		setDragging(true)
		onSetIsDragging(true)
		setOffset({ x: e.clientX - coordinates.x, y: e.clientY - coordinates.y })
	}

	const handleMouseMove = (e: globalThis.MouseEvent) => {
		const canvasRect = rootRef.current?.parentElement?.getBoundingClientRect()
		const toolRect = rootRef.current?.getBoundingClientRect()

		if (!canvasRect || !toolRect) return

		const newX = e.clientX - offset.x
		const newY = e.clientY - offset.y

		/* Проверяем, чтобы инструмент не выходил за границы холста */
		const clampedX = Math.min(
			Math.max(newX, 0),
			canvasRect.width - toolRect.width
		)
		const clampedY = Math.min(
			Math.max(newY, 0),
			canvasRect.height - toolRect.height
		)

		/* Обновляем координаты */
		setCoordinates({ x: clampedX, y: clampedY })
	}

	const handleMouseUp = (e: globalThis.MouseEvent) => {
		const root = rootRef.current

		setDragging(false)
		onSetIsDragging(false)

		/* Проверка наложения инструментов */
		const verifiedCoordinates = checkingToolOverlay(
			{
				coordinates: {
					x: e.clientX - offset.x,
					y: e.clientY - offset.y,
				},
				parameters: {
					width: root ? root.clientWidth : 200,
					height: root ? root.clientHeight : 200,
				},
				uuid: childrenData.uuid,
			},
			childrenStoreArr
		)

		/* Если после проверки на наложение координаты были пересчитаны то */
		/* обновляет позицию инструмента с учетом новых данных иначе */
		/* отправляем данные без пересчета */
		if (
			verifiedCoordinates.x !== e.clientX - offset.x ||
			verifiedCoordinates.y !== e.clientY - offset.y
		) {
			setCoordinates(verifiedCoordinates)
			onUpdateCoordinates(verifiedCoordinates)
		} else {
			onUpdateCoordinates({
				x: e.clientX - offset.x,
				y: e.clientY - offset.y,
			})
		}
	}

	/* Отправляем данные о параметрах инструмента в Redux, */
	/* при изменении параметров инструмента сообщаем о том, */
	/* что они были изменены */
	useEffect(() => {
		const root = rootRef.current
		if (root) {
			const handleResize = () => {
				onSetParameters({
					height: root.clientHeight,
					width: root.clientWidth,
				})
			}

			const resizeObserver = new ResizeObserver(handleResize)
			resizeObserver.observe(root)

			// Вызываем для отправки начальных размеров
			handleResize()

			return () => {
				resizeObserver.disconnect()
			}
		}
	}, [rootRef])

	/* Вешаем слушатели для передвижения инструмента */
	useEffect(() => {
		const root = rootRef.current

		if (root && dragging) {
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
			className={style.draggable}
			onMouseDown={handleMouseDown}
			ref={rootRef}
			style={{
				top: coordinates.y,
				left: coordinates.x,
			}}
		>
			{children}
		</div>
	)
}

import React, { useState, useRef, useEffect, FC } from 'react'
import style from './style.module.scss'

interface TProps {
	children: React.ReactNode
}

export const Canvas: FC<TProps> = ({ children }) => {
	const canvasRef = useRef<HTMLDivElement | null>(null)
	const [scale, setScale] = useState(1)

	const handleWheel = (e: WheelEvent) => {
		e.preventDefault()
		const newScale = Math.min(Math.max(scale + e.deltaY * -0.01, 0.5), 2) // Ограничение масштаба
		setScale(newScale)
	}

	useEffect(() => {
		const canvas = canvasRef.current
		if (canvas) {
			canvas.addEventListener('wheel', handleWheel)

			return () => {
				canvas.removeEventListener('wheel', handleWheel)
			}
		}
	}, [scale])

	return (
		<div ref={canvasRef} className={style.canvas}>
			<div
				style={{
					transform: `scale(${1 / scale})`, // Обратное масштабирование для вложенных элементов
					transformOrigin: '0 0',
				}}
			>
				{children}
			</div>
		</div>
	)
}

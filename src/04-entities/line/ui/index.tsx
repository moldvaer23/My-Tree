import { FC, MouseEvent } from 'react'
import { TCoordinates } from '@app-types'
import { useDispatch } from '@services/store'
import { TConnectionStore } from '@widgets/connections'
import { setRightContext } from '@features/right-context'

import style from './style.module.scss'

type TProps = {
	data: TConnectionStore
	coordinateFrom: TCoordinates
	coordinateTo: TCoordinates
}

export const Line: FC<TProps> = ({ data, coordinateFrom, coordinateTo }) => {
	const dispatch = useDispatch()

	const onRightContext = (e: MouseEvent) => {
		e.preventDefault()
		dispatch(
			setRightContext({
				coordinates: {
					x: e.clientX,
					y: e.clientY,
				},
				edit: {
					tool: data,
					type: 'line',
				},
			})
		)
	}

	const lineElements = {
		straight: (
			<line
				x1={coordinateFrom.x}
				y1={coordinateFrom.y}
				x2={coordinateTo.x}
				y2={coordinateTo.y}
				stroke={data.style.lineColor}
				strokeWidth='2'
				onContextMenu={onRightContext}
				className={style.line}
			/>
		),
		curved: (
			<path
				d={`M${coordinateFrom.x},${coordinateFrom.y} Q ${(coordinateFrom.x + coordinateTo.x) / 2},${Math.min(coordinateFrom.y, coordinateTo.y) - 50} ${coordinateTo.x},${coordinateTo.y}`}
				stroke={data.style.lineColor}
				strokeWidth='2'
				fill='none'
				onContextMenu={onRightContext}
				className={style.line}
			/>
		),
		dashed: (
			<line
				x1={coordinateFrom.x}
				y1={coordinateFrom.y}
				x2={coordinateTo.x}
				y2={coordinateTo.y}
				stroke={data.style.lineColor}
				strokeWidth='2'
				strokeDasharray='4 4'
				onContextMenu={onRightContext}
				className={style.line}
			/>
		),
	}

	return lineElements[data.type]
}

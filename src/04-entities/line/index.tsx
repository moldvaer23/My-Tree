import { FC, MouseEvent, ReactElement } from 'react'
import { TCoordinates } from '@app-types'

import style from './style.module.scss'
import { useDispatch } from '@services/store'
import { setRightContext } from '@services/slices/canvas-slice'
import { TConnectionStore } from '@widgets/connections'

interface LineProps {
	data: TConnectionStore
	coordinateFrom: TCoordinates
	coordinateTo: TCoordinates
}

type TLineSvgWrapperProps = {
	children: (ReactElement | null)[]
}

export const LineSvgWrapper: FC<TLineSvgWrapperProps> = ({ children }) => (
	<svg
		style={{
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			pointerEvents: 'none',
		}}
		data-testid='connection-line'
	>
		{children}
	</svg>
)

export const Line: React.FC<LineProps> = ({
	data,
	coordinateFrom,
	coordinateTo,
}) => {
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

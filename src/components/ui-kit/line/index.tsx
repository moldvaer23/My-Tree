import { TLineType } from '@utils/ui-kit-types'
import React from 'react'

interface Point {
	x: number
	y: number
}

interface LineProps {
	type: TLineType
	from: Point
	to: Point
}

export const Line: React.FC<LineProps> = ({ type, from, to }) => {
	const lineElements = {
		straight: (
			<line
				x1={from.x}
				y1={from.y}
				x2={to.x}
				y2={to.y}
				stroke='black'
				strokeWidth='2'
			/>
		),
		curved: (
			<path
				d={`M${from.x},${from.y} Q ${(from.x + to.x) / 2},${Math.min(from.y, to.y) - 50} ${to.x},${to.y}`}
				stroke='black'
				strokeWidth='2'
				fill='none'
			/>
		),
		dashed: (
			<line
				x1={from.x}
				y1={from.y}
				x2={to.x}
				y2={to.y}
				stroke='black'
				strokeWidth='2'
				strokeDasharray='4 4'
			/>
		),
	}

	return (
		<svg
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				pointerEvents: 'none',
			}}
		>
			{lineElements[type]}
		</svg>
	)
}

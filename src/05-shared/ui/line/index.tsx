import React, { FC, ReactElement } from 'react'
import { TCoordinates } from '@app-types/types'
import { TLineType } from '@app-types/ui-kit-types'

interface LineProps {
	type: TLineType
	from: TCoordinates
	to: TCoordinates
	color: string
}

type TLineSvgWrapperProps = {
	children: ReactElement[]
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

export const Line: React.FC<LineProps> = ({ type, from, to, color }) => {
	const lineElements = {
		straight: (
			<line
				x1={from.x}
				y1={from.y}
				x2={to.x}
				y2={to.y}
				stroke={color}
				strokeWidth='2'
			/>
		),
		curved: (
			<path
				d={`M${from.x},${from.y} Q ${(from.x + to.x) / 2},${Math.min(from.y, to.y) - 50} ${to.x},${to.y}`}
				stroke={color}
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
				stroke={color}
				strokeWidth='2'
				strokeDasharray='4 4'
			/>
		),
	}

	return lineElements[type]
}

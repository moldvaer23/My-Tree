import { TCoordinates } from '@utils/types'
import { TLineType } from '@utils/ui-kit-types'
import React, { FC, ReactElement } from 'react'

interface LineProps {
	type: TLineType
	from: TCoordinates
	to: TCoordinates
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
			color: 'red',
		}}
		data-testid='connection-line'
	>
		{children}
	</svg>
)

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

	return lineElements[type]
}

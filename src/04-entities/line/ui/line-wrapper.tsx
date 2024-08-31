import { FC, ReactElement } from 'react'

type TProps = {
	children: (ReactElement | null)[]
}

export const LineSvgWrapper: FC<TProps> = ({ children }) => (
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

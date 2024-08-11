import { TActiveGatewayState } from '@app-types/ui-kit-types'

export const calculateGatewayOffsets = ({
	coordinates,
	height,
	width,
	gatewayName,
}: {
	coordinates: { x: number; y: number }
	height: number
	width: number
	gatewayName: TActiveGatewayState
}) => {
	const result = {
		x: 0,
		y: 0,
	}
	const paddingOffset = 4

	switch (gatewayName) {
		case 'top': {
			result.x = coordinates.x + paddingOffset + width / 2
			result.y = coordinates.y + paddingOffset
			break
		}
		case 'right': {
			result.x = coordinates.x + width
			result.y = coordinates.y + paddingOffset + height / 2
			break
		}
		case 'bottom': {
			result.x = coordinates.x + paddingOffset + width / 2
			result.y = coordinates.y + height
			break
		}
		case 'left': {
			result.x = coordinates.x + paddingOffset
			result.y = coordinates.y + paddingOffset + height / 2
			break
		}

		default: {
			break
		}
	}

	return result
}

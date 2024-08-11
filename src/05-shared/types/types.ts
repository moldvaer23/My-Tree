import { TActiveGatewayState, TLineType } from './ui-kit-types'

export type TCoordinates = {
	x: number
	y: number
}

export type TConnectionState = {
	from: {
		uuid: string
		gateway: TActiveGatewayState
	} | null
	to: {
		uuid: string
		gateway: TActiveGatewayState
	} | null
}

export type TBlockStore = {
	uuid: string
	title: string
	activeGateway: TActiveGatewayState | null
	parameters: {
		width: number
		height: number
	} | null
	position: {
		x: number
		y: number
	}
}

export type TConnectionStore = {
	uuid: string
	from: {
		uuid: string
		gateway: TActiveGatewayState
	}
	to: {
		uuid: string
		gateway: TActiveGatewayState
	}
	type: TLineType
}

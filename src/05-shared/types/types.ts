import { TActiveGatewayState, TGatewaysNames, TLineType } from './ui-kit-types'

export type TCoordinates = {
	x: number
	y: number
}

export type TConnectedGateways = {
	top: boolean
	right: boolean
	bottom: boolean
	left: boolean
}

export type TConnectionState = {
	from: {
		uuid: string
		gateway: TGatewaysNames
	} | null
	to: {
		uuid: string
		gateway: TGatewaysNames
	} | null
}

export type TBlockStore = {
	uuid: string
	title: string
	gateways: {
		activeGateway: TActiveGatewayState
		connectedGateways: TConnectedGateways
	}
	parameters: {
		width: number
		height: number
	} | null
	position: {
		x: number
		y: number
	}
	styles: {
		bgColor: string | null
	}
}

export type TConnectionStore = {
	uuid: string
	from: {
		uuid: string
		gateway: TGatewaysNames
	}
	to: {
		uuid: string
		gateway: TGatewaysNames
	}
	type: TLineType
}

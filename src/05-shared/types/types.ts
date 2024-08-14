import { TGatewaysNames, TLineType } from './ui-kit-types'

export type TCoordinates = {
	x: number
	y: number
}

type TConnectedGateways = {
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

/**
 * Производный тип для инструментов
 */
export type TExampleToolStore = {
	uuid: string
	parameters: {
		width: number
		height: number
	} | null
	coordinates: TCoordinates
}

/**
 * Тип объекта для хранения данных о блоке с текстом
 */
export type TBlockStore = TExampleToolStore & {
	title: string
	gateways: {
		connectedGateways: TConnectedGateways
	}
	styles: {
		bgColor: string | null
	}
}

/**
 * Тип объекта для хранения данных о подключении
 */
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

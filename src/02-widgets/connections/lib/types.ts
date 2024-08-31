import { TConnectingTools, TGatewaysNames, TLineType } from '@app-types'

export type TConnectionWhere = {
	uuid: string
	gateway: TGatewaysNames
	typeTool: TConnectingTools
}

/**
 * Тип объекта для хранения данных о подключении
 */
export type TConnectionStore = {
	uuid: string
	from: TConnectionWhere
	to: TConnectionWhere
	style: {
		lineColor: string
	}
	type: TLineType
}

export type TConnectionState = {
	from: TConnectionWhere | null
	to: TConnectionWhere | null
}

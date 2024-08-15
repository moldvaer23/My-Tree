import { TGatewaysNames, TLineType } from '@app-types'

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

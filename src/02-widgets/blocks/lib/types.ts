import { TGatewaysNames } from '@app-types'

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

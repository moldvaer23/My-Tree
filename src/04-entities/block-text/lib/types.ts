import { TExampleToolStore } from '@app-types'

export type TConnectedGateways = {
	top: boolean
	right: boolean
	bottom: boolean
	left: boolean
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

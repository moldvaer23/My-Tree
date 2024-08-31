import { TExampleToolStore } from '@app-types'
import { TGatewaysProperty } from '@ui-kit/gateways'

/**
 * Тип объекта для хранения данных о блоке с текстом
 */
export type TBlockStore = TExampleToolStore & {
	title: string
	gateways: TGatewaysProperty
	styles: {
		color: string
		textColor: string
		fontSize: number
		fontBold: boolean
		curs: boolean
	}
}

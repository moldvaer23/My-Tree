import { TBlockStore } from '@entities/block-text'
import { TConnectionStore } from '@widgets/connections'
import { FunctionComponent } from 'react'

export type TIcon = FunctionComponent<
	React.SVGProps<SVGSVGElement> & {
		title?: string | undefined
	}
>
export type TTypeTool = 'block-text' | 'line'
export type TLineType = 'straight' | 'curved' | 'dashed'
export type TSize = 'small' | 'medium' | 'large'
export type TGatewaysNames = 'top' | 'right' | 'bottom' | 'left'
export type TActiveGatewayState = TGatewaysNames | null
export type TDropDownMenuItems = { Icon: TIcon; type: string; text: string }
export type TTool = TBlockStore | TConnectionStore

export type TCoordinates = {
	x: number
	y: number
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

export type TGlobalSettings = {
	color: string
	lineColor: string
	textColor: string
	fontSize: number
}

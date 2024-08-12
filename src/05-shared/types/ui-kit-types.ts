import { MouseEvent } from 'react'

export type TIconData = {
	cdn: string
	alt: string
}

export type TLineType = 'straight' | 'curved' | 'dashed'
export type TSize = 'small' | 'medium' | 'large'
export type TGatewaysNames = 'top' | 'right' | 'bottom' | 'left'
export type TActiveGatewayState = TGatewaysNames | null
export type TDropDownMenuItems = TIconData & { type: string; text?: string }

export type TIconProps = {
	iconData: TIconData
	size: TSize
	iconColorRevert?: boolean
	className?: string
}

export type TDropDownMenuProps = {
	activeMenuItem: number
	size: TSize
	menuItems: TDropDownMenuItems[]
	onClickMenuItem: (e: MouseEvent) => void
}

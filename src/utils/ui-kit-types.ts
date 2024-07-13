export type TIconData = {
	cdn: string
	alt: string
}

export type TLineType = 'straight' | 'curved' | 'dashed'
export type TSize = 'small' | 'medium' | 'large'
export type TActiveGatewayState = 'top' | 'right' | 'bottom' | 'left' | null

export type TIconProps = {
	iconData: TIconData
	size: TSize
	iconColorRevert?: boolean
	className?: string
}

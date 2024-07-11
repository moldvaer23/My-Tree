export type TIconData = {
	cdn: string
	alt: string
}

export type TSize = 'small' | 'medium' | 'large'

export type TIconProps = {
	iconData: TIconData
	size: TSize
	iconColorRevert?: boolean
	className?: string
}

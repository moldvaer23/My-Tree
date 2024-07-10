export type TIconData = {
	cdn: string
	alt: string
}

export type TIconProps = {
	iconData: TIconData
	size: 'small' | 'medium' | 'large'
	iconColorRevert?: boolean
}

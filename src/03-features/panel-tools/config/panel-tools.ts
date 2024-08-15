import { ICON_CURVED_LINE, ICON_DOTTED_LINE, ICON_STRAIGHT_LINE } from '@assets'
import { TDropDownMenuItems } from '@app-types'

export const CONFIG_LINE_DROPDOWN: TDropDownMenuItems[] = [
	{
		cdn: ICON_STRAIGHT_LINE,
		alt: 'Создать прямую линию',
		type: 'straight',
	},
	{
		cdn: ICON_CURVED_LINE,
		alt: 'Создать кривую линию',
		type: 'curved',
	},
	{
		cdn: ICON_DOTTED_LINE,
		alt: 'Создать пунктирную прямую линию',
		type: 'dotted',
	},
]

import { TDropDownMenuItems } from '@app-types'
import IconCurvedLine from '@assets/icon-curved-line.svg?react'
import IconDottedLine from '@assets/icon-dotted-line.svg?react'
import IconStraightLine from '@assets/icon-straight-line.svg?react'

export const CONFIG_LINE_DROPDOWN: TDropDownMenuItems[] = [
	{
		Icon: IconStraightLine,
		type: 'straight',
		text: 'Прямая линия',
	},
	{
		Icon: IconCurvedLine,
		type: 'curved',
		text: 'Кривая линия',
	},
	{
		Icon: IconDottedLine,
		type: 'dotted',
		text: 'Пунктирная линия',
	},
]

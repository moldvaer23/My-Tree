import IconCurvedLine from '@assets/icon-curved-line.svg?react'
import IconDottedLine from '@assets/icon-dotted-line.svg?react'
import IconStraightLine from '@assets/icon-straight-line.svg?react'
import type { Meta, StoryObj } from '@storybook/react'
import { DropDownMenu } from './index'

const meta = {
	title: 'UI-KIT/Drop-down-menu',
	component: DropDownMenu,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof DropDownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		menuItems: [
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
		],
		onClickMenuItem: (e) =>
			console.log(e.currentTarget.getAttribute('data-item-type')),
		activeMenuItem: 0,
		size: 'small',
	},
}

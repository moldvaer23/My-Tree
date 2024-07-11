import type { Meta, StoryObj } from '@storybook/react'
import { DropDownMenu } from './index'
import {
	ICON_CURVED_LINE,
	ICON_DOTTED_LINE,
	ICON_STRAIGHT_LINE,
} from '@assets/index'

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
				cdn: ICON_DOTTED_LINE,
				alt: 'Пунктирная линия',
				type: 'dotted',
			},
			{
				cdn: ICON_CURVED_LINE,
				alt: 'Кривая линия',
				type: 'curved',
			},
			{
				cdn: ICON_STRAIGHT_LINE,
				alt: 'Прямая линия',
				type: 'straight',
			},
		],
		onClickMenuItem: (e) =>
			console.log(e.currentTarget.getAttribute('data-item-type')),
		activeMenuItem: 0,
		size: 'small',
	},
}

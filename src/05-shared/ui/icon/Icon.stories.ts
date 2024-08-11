import { ICON_BLOCK_TEXT } from '@assets'
import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from './index'

const meta = {
	title: 'UI-KIT/Icon',
	component: Icon,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		iconData: {
			cdn: ICON_BLOCK_TEXT,
			alt: 'Создать блок с информацией',
		},
		size: 'small',
	},
}

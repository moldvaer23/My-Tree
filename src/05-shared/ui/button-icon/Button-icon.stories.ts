import { ICON_BLOCK_TEXT } from '@assets'
import type { Meta, StoryObj } from '@storybook/react'
import { ButtonIcon } from './index'

const meta = {
	title: 'UI-KIT/Button-icon',
	component: ButtonIcon,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof ButtonIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		iconData: {
			cdn: ICON_BLOCK_TEXT,
			alt: 'Создать блок с информацией',
		},
		size: 'small',
		onClick: () => console.log('Click button-icon'),
	},
}

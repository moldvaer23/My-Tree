import IconBlockText from '@assets/icon-block-text.svg?react'
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
		Icon: IconBlockText,
		size: 'small',
	},
}

import IconBlockText from '@assets/icon-block-text.svg?react'
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
		Icon: IconBlockText,
		size: 'small',
		onClick: () => console.log('Click button-icon'),
	},
}

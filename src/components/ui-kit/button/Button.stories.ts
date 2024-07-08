import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './index'

const meta = {
	title: 'UI-KIT/Button',
	component: Button,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Outlined: Story = {
	args: {
		children: 'Сохранить',
		variant: 'outlined',
		size: 'small',
	},
}

export const Сontained: Story = {
	args: {
		children: 'Сохранить',
		variant: 'contained',
		size: 'small',
	},
}

import type { Meta, StoryObj } from '@storybook/react'
import { LayoutWrapper } from './index'
import { Input } from '../input'

const meta = {
	title: 'UI-KIT/Layout-wrapper',
	component: LayoutWrapper,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof LayoutWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		children: (
			<div>
				<Input id='q' inputType='text' labelText='Что то там' />
				<Input id='q' inputType='text' labelText='Что то там' />
			</div>
		),
	},
}

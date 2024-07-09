import type { Meta, StoryObj } from '@storybook/react'
import { BlockText } from './index'

const meta = {
	title: 'UI-KIT/Block-text',
	component: BlockText,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof BlockText>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		onClickBlock: () => {
			console.log('Click block')
		},
		onClickGateway: () => {
			console.log('Click Gateway')
		},
		title: 'StoryBook',
	},
}

export const AccentColor: Story = {
	args: {
		bgColor: '#e8157b',
		onClickBlock: () => {
			console.log('Click block')
		},
		onClickGateway: () => {
			console.log('Click Gateway')
		},
		title: 'StoryBook',
	},
}

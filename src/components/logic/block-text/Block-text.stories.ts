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
		blockPosition: {
			x: 100,
			y: 100,
		},
		data: {
			activeGateway: null,
			parameters: null,
			position: {
				x: 100,
				y: 100,
			},
			title: 'StoryBook',
			uuid: '0',
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
		blockPosition: {
			x: 100,
			y: 100,
		},
		data: {
			activeGateway: null,
			parameters: null,
			position: {
				x: 100,
				y: 100,
			},
			title: 'StoryBook',
			uuid: '0',
		},
		title: 'StoryBook',
	},
}

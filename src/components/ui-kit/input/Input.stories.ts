import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './index'

const meta = {
	title: 'UI-KIT/Input',
	component: Input,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Type_Text: Story = {
	args: {
		className: 'input__form',
		placeholder: 'Введите текст блока',
		labelText: 'Текст блока',
		id: 'block-text',
		inputType: 'text',
	},
}

export const Type_Color: Story = {
	args: {
		className: 'input__form',
		labelText: 'Цвет блока',
		id: 'block-color',
		inputType: 'color',
	},
}

export const Type_Number: Story = {
	args: {
		className: 'input__form',
		labelText: 'Размер шрифта',
		id: 'font-size',
		inputType: 'number',
		max: 20,
		min: 1,
	},
}

export const Type_Checkbox: Story = {
	args: {
		className: 'input__form',
		labelText: 'Курсив',
		id: 'kur',
		inputType: 'checkbox',
	},
}

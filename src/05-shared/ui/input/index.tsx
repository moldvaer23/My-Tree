import { FC, HTMLInputTypeAttribute, InputHTMLAttributes } from 'react'
import { clsx } from 'clsx'
import style from './styles.module.scss'

type TProps = InputHTMLAttributes<HTMLInputElement> & {
	labelText: string
	id: string
	inputType: HTMLInputTypeAttribute
	className?: string
}

export const Input: FC<TProps> = ({
	className = 'undefined',
	labelText,
	id,
	inputType,
	...args
}) => {
	const classNameWrapper = clsx(
		{
			[className]: className !== 'undefined',
		},
		style.input,
		{
			[style.text]: inputType === 'text',
			[style.color]: inputType === 'color',
			[style.number]: inputType === 'number',
			[style.checkbox]: inputType === 'checkbox',
		}
	)

	return (
		<label className={style.label} htmlFor={id}>
			<span>{labelText}</span>
			<input className={classNameWrapper} type={inputType} id={id} {...args} />
		</label>
	)
}

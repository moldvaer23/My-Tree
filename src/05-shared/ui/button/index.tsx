import { clsx } from 'clsx'
import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import style from './styles.module.scss'

type TProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children: string | ReactNode
	variant: 'outlined' | 'contained'
	size: 'small' | 'medium' | 'large'
	className?: string
}

export const Button: FC<TProps> = ({
	children,
	variant,
	size,
	className = 'undefined',
	...args
}) => {
	const classNameWrapper = clsx(
		{
			[className]: className !== 'undefined',
		},
		style.button,
		{
			[style.contained]: variant === 'contained',
			[style.outlined]: variant === 'outlined',

			[style.small]: size === 'small',
			[style.medium]: size === 'medium',
			[style.large]: size === 'large',
		}
	)

	return (
		<button className={classNameWrapper} {...args}>
			{children}
		</button>
	)
}

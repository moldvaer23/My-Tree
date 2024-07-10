import { clsx } from 'clsx'
import { ButtonHTMLAttributes, FC, MouseEventHandler } from 'react'
import style from './styles.module.scss'

type TIconData = {
	cdn: string
	alt: string
}

type TProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	iconData: TIconData
	size: 'small' | 'medium' | 'large'
	onClick: (e: MouseEventHandler<HTMLButtonElement>) => void
	className?: string
}

export const ButtonIcon: FC<TProps> = ({
	iconData,
	size,
	onClick,
	className = 'undefined',
	...args
}) => {
	const classNameButtonWrapper = clsx(
		{
			[className]: className !== 'undefined',
		},
		style.button_icon
	)

	const classNameIconWrapper = clsx(style.icon, {
		[style.small]: size === 'small',
		[style.medium]: size === 'medium',
		[style.large]: size === 'large',
	})

	return (
		<button
			className={classNameButtonWrapper}
			type='button'
			onClick={onClick}
			{...args}
		>
			<img
				className={classNameIconWrapper}
				src={iconData.cdn}
				alt={iconData.alt}
			/>
		</button>
	)
}

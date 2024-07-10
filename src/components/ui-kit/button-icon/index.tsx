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
	iconColorRevert?: boolean
	animateHover?: boolean
	animateRotate?: boolean
	onClick: (e: MouseEventHandler<HTMLButtonElement>) => void
	className?: string
}

export const ButtonIcon: FC<TProps> = ({
	iconData,
	size,
	iconColorRevert = true,
	animateHover = true,
	animateRotate,
	className = 'undefined',
	onClick,

	...args
}) => {
	const classNameButtonWrapper = clsx(
		{
			[className]: className !== 'undefined',
		},
		style.button_icon,
		{
			[style.animate_hover]: animateHover === true && !animateRotate,
			[style.animate_rotate]: animateRotate === true,
		}
	)

	const classNameIconWrapper = clsx({
		[style.small]: size === 'small',
		[style.medium]: size === 'medium',
		[style.large]: size === 'large',

		[style.icon_color_revert]: iconColorRevert === true,
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

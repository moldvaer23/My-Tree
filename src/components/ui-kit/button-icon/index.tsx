import { clsx } from 'clsx'
import { ButtonHTMLAttributes, FC, MouseEvent } from 'react'
import style from './styles.module.scss'
import { Icon } from '../icon'
import { TIconProps } from '@utils/ui-kit-types'

type TProps = ButtonHTMLAttributes<HTMLButtonElement> &
	TIconProps & {
		onClick?: (e: MouseEvent) => void
		className?: string
		animatedRotation?: boolean
	}

export const ButtonIcon: FC<TProps> = ({
	iconData,
	iconColorRevert = true,
	animatedRotation,
	size,
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
			[style.animated_hover]: !animatedRotation,
			[style.animated_rotation]: animatedRotation,
		}
	)

	return (
		<button
			className={classNameButtonWrapper}
			type='button'
			onClick={onClick}
			{...args}
		>
			<Icon iconData={iconData} size={size} iconColorRevert={iconColorRevert} />
		</button>
	)
}

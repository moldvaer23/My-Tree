import { ButtonHTMLAttributes, FC, MouseEvent } from 'react'
import { clsx } from 'clsx'
import { TIconProps } from '@app-types/ui-kit-types'
import { Icon } from '../icon'
import style from './styles.module.scss'

type TProps = ButtonHTMLAttributes<HTMLButtonElement> &
	TIconProps & {
		onClick?: (e: MouseEvent) => void
		className?: string
	}

export const ButtonIcon: FC<TProps> = ({
	iconData,
	iconColorRevert = true,
	size,
	className = 'undefined',
	onClick,
	...args
}) => {
	const classNameButtonWrapper = clsx(
		{
			[className]: className !== 'undefined',
		},
		style.button_icon
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

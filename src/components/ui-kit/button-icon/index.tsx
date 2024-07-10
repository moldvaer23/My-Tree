import { clsx } from 'clsx'
import { ButtonHTMLAttributes, FC, MouseEventHandler } from 'react'
import { TIconProps } from '@utils/ui-kit-types'
import style from './styles.module.scss'
import { Icon } from '../icon'

type TProps = ButtonHTMLAttributes<HTMLButtonElement> &
	TIconProps & {
		onClick: (e: MouseEventHandler<HTMLButtonElement>) => void
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

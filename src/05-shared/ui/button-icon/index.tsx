import { ButtonHTMLAttributes, FC, MouseEvent } from 'react'
import { clsx } from 'clsx'

import { Icon as IconUiKit } from '../icon'
import style from './styles.module.scss'
import { TIcon, TSize } from '@app-types'

type TProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	Icon: TIcon
	size: TSize
	onClick?: (e: MouseEvent) => void
	className?: string
}

export const ButtonIcon: FC<TProps> = ({
	Icon,
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
			<IconUiKit size={size} Icon={Icon} />
		</button>
	)
}

import { clsx } from 'clsx'
import { FC } from 'react'
import style from './styles.module.scss'
import { TIcon as IconType, TSize } from '@app-types'

export type TProps = {
	Icon: IconType
	size: TSize
	className?: string
}

export const Icon: FC<TProps> = ({ Icon, size, className = 'undefined' }) => {
	const classNameWrapper = clsx({
		[className]: className !== 'undefined',

		[style.small]: size === 'small',
		[style.medium]: size === 'medium',
		[style.large]: size === 'large',
	})

	return <Icon className={classNameWrapper} />
}

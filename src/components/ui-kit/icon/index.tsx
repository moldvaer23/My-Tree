import { clsx } from 'clsx'
import { FC } from 'react'
import { TIconProps } from '@utils/ui-kit-types'
import style from './styles.module.scss'

export const Icon: FC<TIconProps> = ({
	iconData,
	size,
	iconColorRevert,
	className = 'undefined',
}) => {
	const classNameWrapper = clsx({
		[className]: className !== 'undefined',

		[style.small]: size === 'small',
		[style.medium]: size === 'medium',
		[style.large]: size === 'large',

		[style.icon_color_revert]: iconColorRevert === true,
	})

	return (
		<img className={classNameWrapper} src={iconData.cdn} alt={iconData.alt} />
	)
}

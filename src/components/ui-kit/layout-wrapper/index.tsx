import { clsx } from 'clsx'
import { FC, HTMLAttributes, ReactNode } from 'react'
import style from './styles.module.scss'

type TProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode
	className?: string
}

export const LayoutWrapper: FC<TProps> = ({
	children,
	className = 'undefined',
	...args
}) => {
	const classNameWrapper = clsx(
		{
			[className]: className !== 'undefined',
		},
		style.wrapper
	)

	return (
		<div className={classNameWrapper} {...args}>
			{children}
		</div>
	)
}

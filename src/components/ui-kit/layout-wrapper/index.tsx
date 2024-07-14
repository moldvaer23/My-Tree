import { clsx } from 'clsx'
import { CSSProperties, FC, HTMLAttributes, ReactNode } from 'react'
import style from './styles.module.scss'

type TProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode
	borderRadius?: string
	className?: string
}

export const LayoutWrapper: FC<TProps> = ({
	children,
	borderRadius = '10px',
	className = 'undefined',
	...args
}) => {
	const classNameWrapper = clsx(
		{
			[className]: className !== 'undefined',
		},
		style.wrapper
	)

	const styleWrapper: CSSProperties | undefined = {
		borderRadius: borderRadius,
	}

	return (
		<div className={classNameWrapper} style={styleWrapper} {...args}>
			{children}
		</div>
	)
}

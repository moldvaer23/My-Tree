import { clsx } from 'clsx'
import { CSSProperties, FC, MouseEvent, useState } from 'react'
import style from './styles.module.scss'

type TProps = {
	bgColor?: string
	className?: string
	onClickBlock: (e: MouseEvent) => void
	onClickGateway: (e: MouseEvent) => void
	title: string
}

type TActiveGatewayState = 'top' | 'right' | 'bottom' | 'left' | null

/* TODO: Придумать как будет пользователь вносить title */

export const BlockText: FC<TProps> = ({
	bgColor,
	className = 'undefined',
	onClickBlock,
	onClickGateway,
	title,
}) => {
	const [isHover, setIsHover] = useState<boolean>(false)
	const [activeGateway, setActiveGateway] = useState<TActiveGatewayState>(null)

	const classNameWrapper = clsx(
		{
			[className]: className !== 'undefined',
		},
		style.block_text
	)

	const styleWrapper: CSSProperties | undefined = {
		backgroundColor: bgColor,
	}

	const onClickGatewayWrapper = (e: MouseEvent) => {
		/* Достаем атрибут который хранит в себе позицию шлюза */
		const position = e.currentTarget.getAttribute(
			'data-gateway-position'
		) as TActiveGatewayState

		if (
			(position && !activeGateway) ||
			(position && activeGateway !== position)
		) {
			setActiveGateway(position)
			onClickGateway(e)
		} else if (position && activeGateway === position) {
			setActiveGateway(null)
		}
	}

	return (
		<div
			className={style.wrapper}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => {
				if (!activeGateway) setIsHover(false)
			}}
		>
			<button onClick={onClickBlock}>
				<article className={classNameWrapper} style={styleWrapper}>
					<span className={style.title}>{title}</span>
				</article>
			</button>
			{isHover && (
				<>
					<button
						className={clsx(style.gateway, style.top, {
							[style.active_gateway]: activeGateway === 'top',
						})}
						data-gateway-position='top'
						onClick={onClickGatewayWrapper}
					/>
					<button
						className={clsx(style.gateway, style.right, {
							[style.active_gateway]: activeGateway === 'right',
						})}
						data-gateway-position='right'
						onClick={onClickGatewayWrapper}
					/>
					<button
						className={clsx(style.gateway, style.bottom, {
							[style.active_gateway]: activeGateway === 'bottom',
						})}
						data-gateway-position='bottom'
						onClick={onClickGatewayWrapper}
					/>
					<button
						className={clsx(style.gateway, style.left, {
							[style.active_gateway]: activeGateway === 'left',
						})}
						data-gateway-position='left'
						onClick={onClickGatewayWrapper}
					/>
				</>
			)}
		</div>
	)
}

import { FC, MouseEvent } from 'react'
import style from './styles.module.scss'
import { TActiveGatewayState } from '@utils/ui-kit-types'
import { clsx } from 'clsx'

type TProps = {
	bgColor?: string
	className?: string
	onClickBlock: (e: MouseEvent) => void
	onClickGatewayWrapper: (e: MouseEvent) => void
	title: string
	activeGateway: TActiveGatewayState
	setIsHover: (T: boolean) => void
	isHover: boolean
}

export const BlockTextUI: FC<TProps> = ({
	onClickBlock,
	onClickGatewayWrapper,
	title,
	className = 'undefined',
	bgColor,
	activeGateway,
	setIsHover,
	isHover,
}) => (
	<div
		className={style.wrapper}
		onMouseEnter={() => setIsHover(true)}
		onMouseLeave={() => {
			if (!activeGateway) setIsHover(false)
		}}
	>
		<button onClick={onClickBlock}>
			<article
				className={clsx(
					{
						[className]: className !== 'undefined',
					},
					style.block_text
				)}
				style={{
					backgroundColor: bgColor,
				}}
			>
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

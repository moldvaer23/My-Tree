import { FC, MouseEvent, useEffect, useRef, useState } from 'react'
import { TActiveGatewayState } from '@utils/ui-kit-types'
import { clsx } from 'clsx'
import style from './styles.module.scss'

type TProps = {
	bgColor?: string
	className?: string
	onClickBlock: (e: MouseEvent) => void
	onClickGateway: (e: MouseEvent) => void
	title: string
	blockPosition: {
		x: number
		y: number
	}
}

/* TODO: Придумать как будет пользователь вносить title */
/* TODO: Убрать ошибку с handleMouseMove */
/* TODO: Починить баг с быстрым вылетом мышки */
/* TODO: Починить баг при отдалении поля перемещение работает криво */
/* TODO: Починить баг блоки могут налетать друг на друга */

export const BlockText: FC<TProps> = ({
	bgColor,
	className = 'undefined',
	onClickBlock,
	onClickGateway,
	blockPosition,
	title,
}) => {
	const [isHover, setIsHover] = useState<boolean>(false)
	const [activeGateway, setActiveGateway] = useState<TActiveGatewayState>(null)
	const [dragging, setDragging] = useState(false)
	const [position, setPosition] = useState({
		x: blockPosition.x,
		y: blockPosition.y,
	})
	const [offset, setOffset] = useState({ x: 0, y: 0 })

	const blockRef = useRef<HTMLButtonElement | null>(null)

	const onClickGatewayWrapper = (e: MouseEvent) => {
		/* Достаем атрибут который хранит в себе позицию шлюза */
		const position = e.currentTarget.getAttribute(
			'data-gateway-position'
		) as TActiveGatewayState

		if (!position) return

		if (!activeGateway || activeGateway !== position) {
			setActiveGateway(position)
			onClickGateway(e)
		} else if (activeGateway === position) {
			setActiveGateway(null)
		}
	}

	const handleMouseDown = (e: MouseEvent) => {
		setDragging(true)
		setOffset({ x: e.clientX - position.x, y: e.clientY - position.y })
	}

	const handleMouseMove = (e: MouseEvent) => {
		if (dragging) {
			setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y })
		}
	}

	const handleMouseUp = () => {
		setDragging(false)
	}

	useEffect(() => {
		const block = blockRef.current

		if (block) {
			if (dragging) {
				block.addEventListener('mousemove', handleMouseMove)
				block.addEventListener('mouseup', handleMouseUp)
			} else {
				block.removeEventListener('mousemove', handleMouseMove)
				block.removeEventListener('mouseup', handleMouseUp)
			}

			return () => {
				block.removeEventListener('mousemove', handleMouseMove)
				block.removeEventListener('mouseup', handleMouseUp)
			}
		}
	}, [dragging])

	return (
		<div
			className={style.wrapper}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => {
				if (!activeGateway) setIsHover(false)
			}}
			style={{
				position: 'absolute',
				top: position.y,
				left: position.x,
			}}
		>
			<button
				ref={blockRef}
				onClick={onClickBlock}
				onMouseDown={handleMouseDown}
			>
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
}

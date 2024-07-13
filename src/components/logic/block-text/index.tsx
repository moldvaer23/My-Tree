import { FC, MouseEvent, useState } from 'react'
import { BlockTextUI } from '@components/ui/block-text'
import { TActiveGatewayState } from '@utils/ui-kit-types'

type TProps = {
	bgColor?: string
	className?: string
	onClickBlock: (e: MouseEvent) => void
	onClickGateway: (e: MouseEvent) => void
	title: string
}

/* TODO: Придумать как будет пользователь вносить title */

export const BlockText: FC<TProps> = ({
	bgColor,
	className,
	onClickBlock,
	onClickGateway,
	title,
}) => {
	const [isHover, setIsHover] = useState<boolean>(false)
	const [activeGateway, setActiveGateway] = useState<TActiveGatewayState>(null)

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

	return (
		<BlockTextUI
			activeGateway={activeGateway}
			className={className}
			isHover={isHover}
			onClickBlock={onClickBlock}
			onClickGatewayWrapper={onClickGatewayWrapper}
			setIsHover={setIsHover}
			title={title}
			bgColor={bgColor}
		/>
	)
}

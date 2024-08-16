import { CSSProperties, FC, MouseEvent, useEffect, useState } from 'react'
import { clsx } from 'clsx'
import { TActiveGatewayState, TGatewaysNames } from '@app-types'

import style from './styles.module.scss'
import { TConnectedGateways } from '../lib/types'
import { GATEWAY_VARIANTS } from '../config/gateways'

type TProps = {
	connectedGateways: TConnectedGateways
	isActive: boolean
	uuidBlock: string
	onClickGateway: (e: MouseEvent, t: TGatewaysNames, y: string) => void
}

export const GatewaysUI: FC<TProps> = ({
	connectedGateways,
	isActive,
	uuidBlock,
	onClickGateway,
}) => {
	const [activeGateway, setActiveGateway] = useState<TActiveGatewayState>(null)

	const handleClickGateway = (e: MouseEvent) => {
		/* Достаем атрибут который хранит в себе позицию шлюза */
		const position = e.currentTarget.getAttribute(
			'data-gateway-position'
		) as TActiveGatewayState

		if (!position) return

		if (
			!activeGateway ||
			activeGateway !== position ||
			connectedGateways[position]
		) {
			setActiveGateway(position)
			onClickGateway(e, position, uuidBlock)
		} else if (activeGateway === position) {
			setActiveGateway(null)
			onClickGateway(e, position, uuidBlock)
		}
	}

	/* Синхронизируем данные в Redux и активный шлюз блока */
	useEffect(() => {
		if (activeGateway && !connectedGateways[activeGateway]) {
			setActiveGateway(null)
		}
	}, [connectedGateways])

	/* Если показ шлюзов активен или название активного шлюза */
	/* равно названию этого шлюза или этот шлюз является подключенным */
	/* то показываем этот шлюз пользователю */
	return (
		<>
			{GATEWAY_VARIANTS.map((gatewayName, index) => {
				/* Собираем название класса */
				const className = clsx(style.gateway, style[gatewayName], {
					[style.active_gateway]:
						activeGateway === gatewayName ||
						connectedGateways[gatewayName] === true,
				})

				/* Собираем стили */
				const inlineStyle: CSSProperties = {
					opacity: isActive
						? 1
						: 0 ||
							  activeGateway === gatewayName ||
							  connectedGateways[gatewayName] === true
							? 1
							: 0,
				}

				return (
					<button
						key={index}
						className={className}
						data-gateway-position={gatewayName}
						data-testid={`gateway-${gatewayName}`}
						onClick={handleClickGateway}
						style={inlineStyle}
						tabIndex={isActive ? 0 : 1}
					/>
				)
			})}
		</>
	)
}

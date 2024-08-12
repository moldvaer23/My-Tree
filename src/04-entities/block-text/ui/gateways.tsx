import { CSSProperties, FC, MouseEvent } from 'react'
import { clsx } from 'clsx'
import { TConnectedGateways } from '@app-types/types'
import { TActiveGatewayState, TGatewaysNames } from '@app-types/ui-kit-types'

import style from './styles.module.scss'
import { GATEWAY_VARIANTS } from '../config/gateways'

type TProps = {
	activeGateway: TActiveGatewayState
	connectedGateways: TConnectedGateways
	isActive: boolean
	onClickGateway: (e: MouseEvent, position: TGatewaysNames) => void
	setActiveGateway: (T: TActiveGatewayState) => void
}

export const GatewaysUI: FC<TProps> = ({
	activeGateway,
	connectedGateways,
	isActive,
	onClickGateway,
	setActiveGateway,
}) => {
	const tabIndex = isActive ? 0 : 1

	const handleClickGateway = (e: MouseEvent) => {
		/* Достаем атрибут который хранит в себе позицию шлюза */
		const position = e.currentTarget.getAttribute(
			'data-gateway-position'
		) as TActiveGatewayState

		if (!position) return

		if (!activeGateway || activeGateway !== position) {
			setActiveGateway(position)
			onClickGateway(e, position)
		} else if (activeGateway === position) {
			setActiveGateway(null)
		}
	}

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
						tabIndex={tabIndex}
					/>
				)
			})}
		</>
	)
}

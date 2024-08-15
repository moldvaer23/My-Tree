import { FC, MouseEvent, useState } from 'react'
import { TGatewaysNames } from '@app-types'

import { GatewaysUI } from './gateways'
import style from './styles.module.scss'
import { TBlockStore } from '../lib/types'

type TProps = {
	data: TBlockStore
	onClickBlock: (e: MouseEvent) => void
	onClickGateway: (e: MouseEvent, t: TGatewaysNames, y: string) => void
}

/* TODO: Придумать как будет пользователь вносить title */
/* TODO: Починить баг блоки могут налетать друг на друга */
/* TODO: Провести оптимизацию компонента */

export const BlockText: FC<TProps> = ({
	data,
	onClickBlock,
	onClickGateway,
}) => {
	const [isHover, setIsHover] = useState<boolean>(false)

	return (
		<div
			className={style.wrapper}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			<button
				onClick={onClickBlock}
				className={style.block_text}
				{...(data.styles.bgColor && {
					style: {
						backgroundColor: data.styles.bgColor,
					},
				})}
				data-testid='block-text'
			>
				<span className={style.title}>{data.title}</span>
			</button>

			<GatewaysUI
				connectedGateways={data.gateways.connectedGateways}
				isActive={isHover}
				uuidBlock={data.uuid}
				onClickGateway={onClickGateway}
			/>
		</div>
	)
}

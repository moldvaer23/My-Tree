import { FC, MouseEvent, ReactNode, useState } from 'react'
import style from './style.module.scss'
import { TBlockTextGroupStore, TOnClickAddChild } from '../lib/types'
import { TBlockStore } from '@entities/block-text/lib/types'
import { v4 as uuid } from 'uuid'
import { Gateways } from '@ui-kit/gateways'
import { TGatewaysNames } from '@app-types'

type TProps = {
	data: TBlockTextGroupStore
	children: ReactNode[] // Блоки текста в виде JSX
	onClickAddChild: TOnClickAddChild
	onClickGateway: (e: MouseEvent, t: TGatewaysNames, y: string) => void
}

export const BlockTextGroup: FC<TProps> = ({
	data,
	children,
	onClickAddChild,
	onClickGateway,
}) => {
	const [isHover, setIsHover] = useState<boolean>(false)

	/* Заготовка блока */
	const block: TBlockStore = {
		coordinates: {
			x: 0,
			y: 0,
		},
		gateways: {
			connectedGateways: {
				bottom: false,
				left: false,
				right: false,
				top: false,
			},
		},
		parameters: null,
		styles: {
			color: '#ffffff',
			curs: false,
			fontBold: false,
			fontSize: 16,
			textColor: '#000000',
		},
		title: 'Новый блок',
		uuid: uuid(),
	}

	return (
		<div
			className={style.wrapper}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			<ul className={style.list}>
				{children.map((child, index) => (
					<li key={index}>{child}</li>
				))}
			</ul>

			{isHover && (
				<button
					className={style.add__button}
					onClick={(e) => onClickAddChild(e, block)}
				>
					+
				</button>
			)}

			<Gateways
				connectedGateways={data.gateways.connectedGateways}
				isActive={isHover}
				onClickGateway={onClickGateway}
				uuidTool={data.uuid}
			/>
		</div>
	)
}

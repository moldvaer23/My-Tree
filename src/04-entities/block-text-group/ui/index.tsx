import { FC, MouseEvent, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { TGatewaysNames } from '@app-types'
import { Gateways } from '@ui-kit/gateways'
import { useDispatch } from '@services/store'
import { setRightContext } from '@features/right-context'

import style from './style.module.scss'
import { ChildBlockTextGroup } from './child'
import {
	TBlockTextGroupStore,
	TChildBlockTextGroup,
	TOnClickAddChild,
} from '../lib/types'

type TProps = {
	data: TBlockTextGroupStore
	onClickAddChild: TOnClickAddChild
	onClickGateway: (e: MouseEvent, t: TGatewaysNames, y: string) => void
}

export const BlockTextGroup: FC<TProps> = ({
	data,
	onClickAddChild,
	onClickGateway,
}) => {
	const [isHover, setIsHover] = useState<boolean>(false)
	const dispatch = useDispatch()

	/* Заготовка блока */
	const block: TChildBlockTextGroup = {
		text: 'Новый блок',
		uuid: uuid(),
	}

	const onClickRightContext = (e: MouseEvent) => {
		e.preventDefault()
		dispatch(
			setRightContext({
				coordinates: {
					x: e.clientX,
					y: e.clientY,
				},
				edit: {
					tool: data,
					type: 'block-text-group',
				},
			})
		)
	}

	return (
		<div
			className={style.wrapper}
			onContextMenu={onClickRightContext}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			style={{
				border: `2px solid ${data.styles.borderColor}`,
			}}
		>
			<ul className={style.list}>
				{data.children.map((child, index) => (
					<li key={index}>
						<ChildBlockTextGroup
							data={child}
							uuidGroup={data.uuid}
							bgColor={data.styles.childBgColor}
							textColor={data.styles.childTextColor}
						/>
					</li>
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

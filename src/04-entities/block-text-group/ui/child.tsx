import { FC, useState } from 'react'

import { Icon } from '@ui-kit/icon'
import IconClose from '@assets/icon-close.svg?react'

import style from './style.module.scss'
import { TChildBlockTextGroup } from '../lib/types'
import { useDispatch } from '@services/store'
import { removeBlockGroupChild } from '@widgets/blocks-group'

type TProps = {
	data: TChildBlockTextGroup
	uuidGroup: string
	bgColor: string
	textColor: string
}

export const ChildBlockTextGroup: FC<TProps> = ({
	data,
	uuidGroup,
	bgColor,
	textColor,
}) => {
	const [isHover, setIsHover] = useState<boolean>(false)
	const dispatch = useDispatch()

	return (
		<div
			className={style.child}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			style={{
				backgroundColor: bgColor,
				color: textColor,
			}}
		>
			<button
				onClick={() =>
					dispatch(
						removeBlockGroupChild({
							uuidChild: data.uuid,
							uuidGroup: uuidGroup,
						})
					)
				}
				style={{
					opacity: isHover ? 1 : 0,
					pointerEvents: isHover ? 'auto' : 'none',
				}}
				className={style.delete__button}
			>
				<Icon size='small' Icon={IconClose} className={style.delete__icon} />
			</button>
			<span>{data.text}</span>
		</div>
	)
}

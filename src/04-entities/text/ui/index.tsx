import { FC, MouseEvent } from 'react'
import { useDispatch } from '@services/store'
import { setRightContext } from '@features/right-context'

import style from './style.module.scss'
import { TTextStore } from '../lib/types'
import { boldVariable } from '@app-config'

type TProps = {
	data: TTextStore
}

export const Text: FC<TProps> = ({ data }) => {
	const dispatch = useDispatch()

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
					type: 'text',
				},
			})
		)
	}

	return (
		<div
			className={style.wrapper}
			style={{
				color: data.styles.color,
				fontSize: `${data.styles.fontSize}px`,
				fontWeight: data.styles.bold ? boldVariable : 400,
				fontStyle: data.styles.curs ? 'italic' : 'normal',
			}}
			onContextMenu={onClickRightContext}
		>
			<span>{data.content}</span>
		</div>
	)
}

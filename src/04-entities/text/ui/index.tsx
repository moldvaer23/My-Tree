import { FC, MouseEvent } from 'react'
import style from './style.module.scss'
import { TTextStore } from '../lib/types'
import { useDispatch } from '@services/store'
import { setRightContext } from '@features/right-context'

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
				fontWeight: data.styles.bold ? 700 : 400,
				fontStyle: data.styles.curs ? 'italic' : 'normal',
			}}
			onContextMenu={onClickRightContext}
		>
			<span>{data.content}</span>
		</div>
	)
}

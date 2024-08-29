import { FC } from 'react'
import style from './style.module.scss'

type TProps = {
	content: string
}

export const Text: FC<TProps> = ({ content }) => {
	return (
		<div className={style.wrapper}>
			<span>{content}</span>
		</div>
	)
}

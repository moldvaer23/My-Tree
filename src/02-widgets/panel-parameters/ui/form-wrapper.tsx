import { FC, ReactNode } from 'react'

import { Icon } from '@ui-kit/icon'
import { useDispatch } from '@services/store'
import IconBackArrow from '@assets/icon-back-arrow.svg?react'

import style from './style.module.scss'
import { setToolView } from '../lib/panel-parameters-slice'

type TProps = {
	children: ReactNode
}

export const FormWrapper: FC<TProps> = ({ children }) => {
	const dispatch = useDispatch()

	return (
		<form>
			<button
				className={style.close__button}
				type='button'
				onClick={() => dispatch(setToolView(null))}
			>
				<Icon className={style.icon} Icon={IconBackArrow} size='small' />
			</button>
			{children}
		</form>
	)
}

import { FC } from 'react'

import clsx from 'clsx'

import icon from '@assets/react.svg'

import style from './style.module.scss'

export const App: FC = () => (
	<div>
		<span className={clsx(style.red__text, 'font-extrabold')}>App Started</span>
		<img src={icon} alt='1' />
	</div>
)

import { FC } from 'react'

import style from './style.module.scss'
import clsx from 'clsx'

export const App: FC = () => (
	<div>
		<span className={clsx(style.red__text, 'font-extrabold')}>App Started</span>
	</div>
)

import { router } from '@services/router'
import { FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import style from './style.module.scss'

export const App: FC = () => (
	<div className={style.page}>
		<RouterProvider router={router} />
	</div>
)

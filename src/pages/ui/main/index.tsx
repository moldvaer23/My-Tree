import { AsideTools } from '@components/logic/aside-tools'
import { Header } from '@components/logic/header'
import { FC } from 'react'
import style from './style.module.scss'

export const MainPageUI: FC = () => (
	<div className={style.page}>
		<Header />
		<main className={style.main}>
			<div>Main</div>
			<AsideTools />
		</main>
	</div>
)

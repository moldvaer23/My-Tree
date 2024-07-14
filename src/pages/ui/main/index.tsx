import { AsideTools } from '@components/logic/aside-tools'
import { Header } from '@components/logic/header'
import { FC } from 'react'
import style from './style.module.scss'
import { WorkSpace } from '@components/logic/work-space'

export const MainPageUI: FC = () => (
	<div className={style.page}>
		<Header />
		<main className={style.main}>
			<WorkSpace />
			<AsideTools />
		</main>
	</div>
)

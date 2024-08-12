import { FC } from 'react'
import { Header } from '@widgets/header'
import { AsideTools } from '@widgets/aside-tools'
import { BlocksRender } from '@widgets/blocks'
import { PanZoomContainer } from '@features/pan-zoom-container'
import { ConnectionsRender } from '@widgets/connections'

import style from './style.module.scss'

export const MainPage: FC = () => (
	<div className={style.page} data-testid='main-page'>
		<Header />
		<main className={style.main}>
			<PanZoomContainer>
				<BlocksRender />
				<ConnectionsRender />
			</PanZoomContainer>
			<AsideTools />
		</main>
	</div>
)

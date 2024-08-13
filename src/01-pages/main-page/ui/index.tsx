import { FC } from 'react'
import { Header } from '@widgets/header'
import { BlocksRender } from '@widgets/blocks'
import { AsideTools } from '@widgets/aside-tools'
import { ConnectionsRender } from '@widgets/connections'
import { InfiniteCanvas } from '@features/infinite-canvas'

import style from './style.module.scss'

export const MainPage: FC = () => (
	<div className={style.page} data-testid='main-page'>
		<Header />
		<main className={style.main}>
			<InfiniteCanvas>
				<BlocksRender />
				<ConnectionsRender />
			</InfiniteCanvas>
			<AsideTools />
		</main>
	</div>
)

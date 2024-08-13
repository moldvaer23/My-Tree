import { FC } from 'react'
import { BlocksRender } from '@widgets/blocks'
import { PanelMenu } from '@features/panel-menu'
import { AsideTools } from '@widgets/aside-tools'
import { PanelTools } from '@features/panel-tools'
import { ConnectionsRender } from '@widgets/connections'
import { InfiniteCanvas } from '@features/infinite-canvas'

import style from './style.module.scss'

export const MainPage: FC = () => (
	<div className={style.page} data-testid='main-page'>
		{/* Панели ui */}
		<PanelTools />
		<PanelMenu />

		<main className={style.main}>
			{/* Рабочая область */}
			<InfiniteCanvas>
				<BlocksRender />
				<ConnectionsRender />
			</InfiniteCanvas>

			<AsideTools />
		</main>
	</div>
)

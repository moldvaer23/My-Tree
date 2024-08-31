import { FC } from 'react'
import { TextsRender } from '@widgets/texts'
import { BlocksRender } from '@widgets/blocks'
import { PanelMenu } from '@widgets/panel-menu'
import { PanelTools } from '@widgets/panel-tools'
import { RightContext } from '@features/right-context'
import { ConnectionsRender } from '@widgets/connections'
import { InfiniteCanvas } from '@widgets/infinite-canvas'
import { PanelParameters } from '@widgets/panel-parameters'
import { BlocksTextGroupsRender } from '@widgets/blocks-group'

import style from './style.module.scss'

export const MainPage: FC = () => (
	<div className={style.page} data-testid='main-page'>
		{/* Панели ui */}
		<PanelTools />
		<PanelMenu />
		<PanelParameters />

		{/* Контекстное меню */}
		<RightContext />

		<main className={style.main}>
			{/* Рабочая область */}
			<InfiniteCanvas>
				<BlocksRender />
				<ConnectionsRender />
				<TextsRender />
				<BlocksTextGroupsRender />
			</InfiniteCanvas>
		</main>
	</div>
)

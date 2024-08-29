import { FC } from 'react'
import { BlocksRender } from '@widgets/blocks'
import { PanelMenu } from '@widgets/panel-menu'
import { PanelTools } from '@widgets/panel-tools'
import { RightContext } from '@features/right-context'
import { ConnectionsRender } from '@widgets/connections'
import { InfiniteCanvas } from '@widgets/infinite-canvas'
import { PanelParameters } from '@widgets/panel-parameters'

import style from './style.module.scss'
import { TextsRender } from '@widgets/texts'

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
			</InfiniteCanvas>
		</main>
	</div>
)

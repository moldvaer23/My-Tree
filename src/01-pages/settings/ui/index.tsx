import { LayoutWrapper } from '@ui-kit/layout-wrapper'
import { GlobalParameters } from '@widgets/panel-parameters'
import { FC } from 'react'

import style from './style.module.scss'
import { Link } from 'react-router-dom'
import { Icon } from '@ui-kit/icon'
import { ICON_BACK_ARROW } from '@assets'

export const SettingsPage: FC = () => (
	<div className={style.page}>
		<Link to='/'>
			<Icon
				iconData={{
					alt: 'Назад',
					cdn: ICON_BACK_ARROW,
				}}
				size='small'
			/>
		</Link>
		<LayoutWrapper>
			<GlobalParameters />
		</LayoutWrapper>
	</div>
)

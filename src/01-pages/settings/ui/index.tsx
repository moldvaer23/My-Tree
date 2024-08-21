import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@ui-kit/icon'
import { LayoutWrapper } from '@ui-kit/layout-wrapper'
import { GlobalParameters } from '@widgets/panel-parameters'
import IconBackArrow from '@assets/icon-back-arrow.svg?react'

import style from './style.module.scss'

export const SettingsPage: FC = () => (
	<div className={style.page}>
		<Link to='/'>
			<Icon Icon={IconBackArrow} size='small' />
		</Link>
		<LayoutWrapper>
			<GlobalParameters />
		</LayoutWrapper>
	</div>
)

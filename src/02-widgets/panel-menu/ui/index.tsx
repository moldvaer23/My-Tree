import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@ui-kit/icon'
import { Button } from '@ui-kit/button'
import { LayoutWrapper } from '@ui-kit/layout-wrapper'
import IconSettings from '@assets/icon-settings.svg?react'

import style from './style.module.scss'

export const PanelMenu: FC = () => (
	<LayoutWrapper className={style.menu} borderRadius='2px'>
		<Link className={style.link_settings} to={'/settings'}>
			<Icon Icon={IconSettings} size='small' />
		</Link>
		<Button variant='contained' size='medium'>
			Сохранить
		</Button>
	</LayoutWrapper>
)

import { FC } from 'react'

import { Tooltip } from 'react-tooltip'

import { TSize } from '@utils/ui-kit-types'
import { Button } from '@components/ui-kit/button'
import { CONFIG_LINE_DROPDOWN } from '@configs/header'
import { ButtonIcon } from '@components/ui-kit/button-icon'
import { DropDownMenu } from '@components/ui-kit/Drop-down-menu'
import { LayoutWrapper } from '@components/ui-kit/layout-wrapper'
import {
	ICON_BLOCK_TEXT,
	ICON_GROUP,
	ICON_SETTINGS,
	ICON_TEXT,
} from '@assets/index'

import style from './style.module.scss'

/* TODO: Убрать баг с tooltip у drop down menu */
/* TODO: Передавать onClick у каждой кнопки drop down menu */

export const HeaderUI: FC = () => {
	const buttonSize: TSize = 'small'

	return (
		<header className={style.header}>
			<LayoutWrapper className={style.panel_wrapper} borderRadius='0 0 5px 5px'>
				<ul className={style.panel}>
					<li>
						<ButtonIcon
							iconData={{
								cdn: ICON_BLOCK_TEXT,
								alt: 'Создать блок с текстом',
							}}
							size={buttonSize}
							onClick={(e) => console.log(e)}
							data-tooltip-id='btn-block-text'
							data-tooltip-content='Создать блок с текстом'
						/>
						<Tooltip id='btn-block-text' variant='light' />
					</li>
					<li>
						<DropDownMenu
							activeMenuItem={0}
							onClickMenuItem={(e) => console.log(e)}
							size='small'
							menuItems={CONFIG_LINE_DROPDOWN}
						/>
					</li>
					<li>
						<ButtonIcon
							iconData={{
								cdn: ICON_TEXT,
								alt: 'Создать область с текстом',
							}}
							size={buttonSize}
							onClick={(e) => console.log(e)}
							data-tooltip-id='btn-text'
							data-tooltip-content='Создать область с текстом'
						/>
						<Tooltip id='btn-text' variant='light' />
					</li>
					<li>
						<ButtonIcon
							iconData={{
								cdn: ICON_GROUP,
								alt: 'Создать группу блоков',
							}}
							size={buttonSize}
							onClick={(e) => console.log(e)}
							data-tooltip-id='btn-group'
							data-tooltip-content='Создать группу блоков'
						/>
						<Tooltip id='btn-group' variant='light' />
					</li>
				</ul>
			</LayoutWrapper>
			<div className={style.buttons}>
				<ButtonIcon
					iconData={{
						cdn: ICON_SETTINGS,
						alt: 'Настройки',
					}}
					size='small'
					animatedRotation
				/>
				<Button variant='contained' size='small'>
					Сохранить
				</Button>
			</div>
		</header>
	)
}

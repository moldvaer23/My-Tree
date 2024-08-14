import { FC } from 'react'
import { v4 as uuid } from 'uuid'
import { Tooltip } from 'react-tooltip'
import { ICON_BLOCK_TEXT, ICON_GROUP, ICON_TEXT } from '@assets'
import { useDispatch } from '@services/store'
import { TSize } from '@app-types/ui-kit-types'
import { ButtonIcon } from '@ui-kit/button-icon'
import { DropDownMenu } from '@ui-kit/drop-down-menu'
import { LayoutWrapper } from '@ui-kit/layout-wrapper'
import { addBlock } from '@services/slices/canvas-slice'

import style from './style.module.scss'
import { CONFIG_LINE_DROPDOWN } from '../config/panel-tools'

export const PanelTools: FC = () => {
	const buttonSize: TSize = 'small'
	const dispatch = useDispatch()

	const onClickBlockText = () => {
		dispatch(
			addBlock({
				uuid: uuid(),
				coordinates: {
					x: 2700,
					y: 2700,
				},
				gateways: {
					connectedGateways: {
						top: false,
						right: false,
						bottom: false,
						left: false,
					},
				},
				styles: {
					bgColor: null,
				},
				parameters: null,
				title: 'Блок',
			})
		)
	}

	return (
		<LayoutWrapper className={style.tools} borderRadius='0 0 5px 5px'>
			<ul className={style.list}>
				<li>
					<ButtonIcon
						iconData={{
							cdn: ICON_BLOCK_TEXT,
							alt: 'Создать блок с текстом',
						}}
						size={buttonSize}
						onClick={onClickBlockText}
						data-tooltip-id='btn-block-text'
						data-tooltip-content='Создать блок с текстом'
						data-testid='button-block-text'
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
	)
}

import { FC } from 'react'
import { v4 as uuid } from 'uuid'
import { TSize } from '@app-types'
import { Tooltip } from 'react-tooltip'
import IconBlockText from '@assets/icon-block-text.svg?react'
import IconText from '@assets/icon-text.svg?react'
import IconGroup from '@assets/icon-group.svg?react'
import { useDispatch, useSelector } from '@services/store'
import { ButtonIcon } from '@ui-kit/button-icon'
import { DropDownMenu } from '@ui-kit/drop-down-menu'
import { LayoutWrapper } from '@ui-kit/layout-wrapper'
import { addBlock, getGlobalStyleSettings } from '@services/slices/canvas-slice'

import style from './style.module.scss'
import { CONFIG_LINE_DROPDOWN } from '../config/panel-tools'

export const PanelTools: FC = () => {
	const buttonSize: TSize = 'small'
	const globalStyleSettings = useSelector(getGlobalStyleSettings)
	const dispatch = useDispatch()

	const onClickBlockText = () => {
		const uuidBlock = uuid()

		dispatch(
			addBlock({
				uuid: uuidBlock,
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
					color: globalStyleSettings.color,
					curs: false,
					fontBold: false,
					fontSize: globalStyleSettings.fontSize,
					textColor: globalStyleSettings.textColor,
				},
				parameters: null,
				title: uuidBlock,
			})
		)
	}

	return (
		<LayoutWrapper className={style.tools} borderRadius='2px'>
			<ul className={style.list}>
				<li>
					<ButtonIcon
						Icon={IconBlockText}
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
						Icon={IconText}
						size={buttonSize}
						onClick={(e) => console.log(e)}
						data-tooltip-id='btn-text'
						data-tooltip-content='Создать область с текстом'
					/>
					<Tooltip id='btn-text' variant='light' />
				</li>
				<li>
					<ButtonIcon
						Icon={IconGroup}
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

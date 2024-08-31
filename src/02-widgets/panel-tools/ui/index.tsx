import { FC } from 'react'
import { v4 as uuid } from 'uuid'
import { TSize } from '@app-types'
import { Tooltip } from 'react-tooltip'
import { addBlock } from '@widgets/blocks'
import { ButtonIcon } from '@ui-kit/button-icon'
import IconText from '@assets/icon-text.svg?react'
import IconGroup from '@assets/icon-group.svg?react'
import { DropDownMenu } from '@ui-kit/drop-down-menu'
import { LayoutWrapper } from '@ui-kit/layout-wrapper'
import { useDispatch, useSelector } from '@services/store'
import IconBlockText from '@assets/icon-block-text.svg?react'
import { getGlobalStyleSettings } from '@services/slices/global-slice'

import style from './style.module.scss'
import { CONFIG_LINE_DROPDOWN } from '../config/panel-tools'
import { addText } from '@widgets/texts'
import { addBlockGroup } from '@widgets/blocks-group'

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

	const onClickText = () => {
		dispatch(
			addText({
				content: 'Hello',
				coordinates: {
					x: 2500,
					y: 2500,
				},
				parameters: null,
				styles: {
					color: '#ffffff',
					bold: false,
					curs: false,
					fontSize: 36,
				},
				uuid: uuid(),
			})
		)
	}

	const onClickBlockTextGroup = () => {
		dispatch(
			addBlockGroup({
				children: [],
				coordinates: {
					x: 2500,
					y: 2500,
				},
				gateways: {
					connectedGateways: {
						bottom: false,
						left: false,
						right: false,
						top: false,
					},
				},
				styles: {
					borderColor: '#ffffff',
					childBgColor: '#ffffff',
					childTextColor: '#000000',
				},
				parameters: null,
				uuid: uuid(),
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
						onClick={onClickText}
						data-tooltip-id='btn-text'
						data-tooltip-content='Создать область с текстом'
					/>
					<Tooltip id='btn-text' variant='light' />
				</li>
				<li>
					<ButtonIcon
						Icon={IconGroup}
						size={buttonSize}
						onClick={onClickBlockTextGroup}
						data-tooltip-id='btn-group'
						data-tooltip-content='Создать группу блоков'
					/>
					<Tooltip id='btn-group' variant='light' />
				</li>
			</ul>
		</LayoutWrapper>
	)
}

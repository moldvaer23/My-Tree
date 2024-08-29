import { FC } from 'react'
import { useSelector } from '@services/store'
import { TBlockStore } from '@entities/block-text'
import { LayoutWrapper } from '@ui-kit/layout-wrapper'
import { TConnectionStore } from '@widgets/connections'

import { LineParameters } from './line'
import style from './style.module.scss'
import { BlockTextParameters } from './block-text'
import { getToolView } from '../lib/panel-parameters-slice'

export const PanelParameters: FC = () => {
	const toolView = useSelector(getToolView)

	if (!toolView) return null

	/* Проверяем тип инструмента что бы вернуть его параметры */
	switch (toolView.type) {
		case 'block-text': {
			return (
				<LayoutWrapper className={style.parameters} borderRadius='5px 0 0 5px'>
					<BlockTextParameters block={toolView.tool as TBlockStore} />
				</LayoutWrapper>
			)
		}

		case 'line': {
			return (
				<LayoutWrapper className={style.parameters}>
					<LineParameters line={toolView.tool as TConnectionStore} />
				</LayoutWrapper>
			)
		}

		default: {
			return <div>Не известный инструмент</div>
		}
	}
}

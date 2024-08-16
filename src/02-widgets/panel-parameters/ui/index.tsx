import { FC } from 'react'
import { LineParameters } from './line'
import { BlockTextParameters } from './block-text'
import { useSelector } from '@services/store'
import { getToolView } from '@services/slices/canvas-slice'
import { TBlockStore } from '@entities/block-text'
import { LayoutWrapper } from '@ui-kit/layout-wrapper'
import style from './style.module.scss'

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
					<LineParameters />
				</LayoutWrapper>
			)
		}

		default: {
			return <div>Не известный инструмент</div>
		}
	}
}

import { FC } from 'react'
import { TTextStore } from '@entities/text'
import { useSelector } from '@services/store'
import { TBlockStore } from '@entities/block-text'
import { LayoutWrapper } from '@ui-kit/layout-wrapper'
import { TConnectionStore } from '@widgets/connections'
import { TBlockTextGroupStore } from '@entities/block-text-group'

import { LineParameters } from './line'
import style from './style.module.scss'
import { TextParameters } from './text'
import { FormWrapper } from './form-wrapper'
import { BlockTextParameters } from './block-text'
import { getToolView } from '../lib/panel-parameters-slice'
import { BlockTextGroupParameters } from './block-text-group'

export const PanelParameters: FC = () => {
	const toolView = useSelector(getToolView)

	if (!toolView) return null

	/* Проверяем тип инструмента что бы вернуть его параметры */
	switch (toolView.type) {
		case 'block-text': {
			return (
				<LayoutWrapper className={style.parameters} borderRadius='5px 0 0 5px'>
					<FormWrapper>
						<BlockTextParameters block={toolView.tool as TBlockStore} />
					</FormWrapper>
				</LayoutWrapper>
			)
		}

		case 'line': {
			return (
				<LayoutWrapper className={style.parameters}>
					<FormWrapper>
						<LineParameters line={toolView.tool as TConnectionStore} />
					</FormWrapper>
				</LayoutWrapper>
			)
		}

		case 'block-text-group': {
			return (
				<LayoutWrapper className={style.parameters}>
					<FormWrapper>
						<BlockTextGroupParameters
							group={toolView.tool as TBlockTextGroupStore}
						/>
					</FormWrapper>
				</LayoutWrapper>
			)
		}

		case 'text': {
			return (
				<LayoutWrapper className={style.parameters}>
					<FormWrapper>
						<TextParameters textData={toolView.tool as TTextStore} />
					</FormWrapper>
				</LayoutWrapper>
			)
		}

		default: {
			return <div>Не известный инструмент</div>
		}
	}
}

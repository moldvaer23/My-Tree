import { FC } from 'react'
import { v4 as uuid } from 'uuid'
import { useDispatch } from '@services/store'
import { addBlock } from '@services/slices/canvas-slice'
import { HeaderUI } from './ui-header'

export const Header: FC = () => {
	const dispatch = useDispatch()

	const onClickBlockText = () => {
		dispatch(
			addBlock({
				uuid: uuid(),
				position: {
					x: 100,
					y: 100,
				},
				gateways: {
					activeGateway: null,
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

	return <HeaderUI onClickBlockText={onClickBlockText} />
}

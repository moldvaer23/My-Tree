import { FC, useEffect, useRef } from 'react'
import { Button } from '@ui-kit/button'
import { LayoutWrapper } from '@ui-kit/layout-wrapper'
import { useDispatch, useSelector } from '@services/store'
import {
	getRightContext,
	removeBlock,
	removeConnection,
	setRightContext,
	setToolView,
} from '@services/slices/canvas-slice'

import style from './style.module.scss'

export const RightContext: FC = () => {
	const contextData = useSelector(getRightContext)
	const rootRef = useRef<HTMLUListElement | null>(null)
	const dispatch = useDispatch()

	useEffect(() => {
		const handleOutClick = (e: Event) => {
			if (
				rootRef.current &&
				e.target instanceof Node &&
				!rootRef.current.contains(e.target)
			) {
				dispatch(setRightContext(null))
			}
		}

		if (contextData) document.addEventListener('mousedown', handleOutClick)

		return () => document.removeEventListener('mousedown', handleOutClick)
	}, [contextData])

	if (!contextData) return null

	const onClickRemove = () => {
		/* Запускаем удаление определенного инструмента */
		/* в зависимости от его типа */
		switch (contextData.edit.type) {
			case 'block-text': {
				dispatch(removeBlock(contextData.edit.tool.uuid))
				break
			}
			case 'line': {
				dispatch(removeConnection(contextData.edit.tool.uuid))
				break
			}
			default: {
				break
			}
		}

		dispatch(setRightContext(null))
	}

	return (
		<LayoutWrapper
			className={style.context}
			style={{
				left: contextData.coordinates.x,
				top: contextData.coordinates.y,
			}}
		>
			<ul ref={rootRef}>
				<li>
					<Button
						size='medium'
						variant='outlined'
						onClick={() => {
							dispatch(setToolView(contextData.edit))
							dispatch(setRightContext(null))
						}}
					>
						Редактировать
					</Button>
				</li>
				<li>
					<Button
						className={style.button}
						size='medium'
						variant='outlined'
						onClick={onClickRemove}
					>
						Удалить
					</Button>
				</li>
			</ul>
		</LayoutWrapper>
	)
}

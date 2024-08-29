import { FC, useEffect, useState } from 'react'
import { Icon } from '@ui-kit/icon'
import { Input } from '@ui-kit/input'
import { useDispatch } from '@services/store'
import IconBackArrow from '@assets/icon-back-arrow.svg?react'
import { TConnectionStore, updateLineColor } from '@widgets/connections'

import style from './style.module.scss'
import { setToolView } from '../lib/panel-parameters-slice'

type TProps = {
	line: TConnectionStore
}

export const LineParameters: FC<TProps> = ({ line }) => {
	const [formState, setFormState] = useState({
		...line.style,
	})

	const dispatch = useDispatch()

	useEffect(() => {
		setFormState({
			...line.style,
		})
	}, [line])

	return (
		<form>
			<button
				className={style.close__button}
				type='button'
				onClick={() => dispatch(setToolView(null))}
			>
				<Icon className={style.icon} Icon={IconBackArrow} size='small' />
			</button>
			<ul className={style.list}>
				<li className={style.item}>
					<Input
						inputType='color'
						id='lineColor'
						labelText='Цвет линии'
						onBlurCapture={() =>
							dispatch(
								updateLineColor({
									uuid: line.uuid,
									value: formState.lineColor,
								})
							)
						}
						onChange={(e) =>
							setFormState({
								...formState,
								lineColor: e.target.value,
							})
						}
						value={formState.lineColor}
					/>
				</li>
			</ul>
		</form>
	)
}

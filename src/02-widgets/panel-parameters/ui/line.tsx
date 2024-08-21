import { FC, useEffect, useState } from 'react'
import { ICON_CLOSE } from '@assets'
import { Icon } from '@ui-kit/icon'
import { Input } from '@ui-kit/input'
import { useDispatch } from '@services/store'
import { TConnectionStore } from '@widgets/connections'
import { setToolView, updateLineColor } from '@services/slices/canvas-slice'

import style from './style.module.scss'

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
				<Icon
					className={style.icon}
					iconData={{
						alt: 'Закрыть',
						cdn: ICON_CLOSE,
					}}
					size='small'
					iconColorRevert={true}
				/>
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

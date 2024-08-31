import { FC, useEffect, useState } from 'react'
import { Input } from '@ui-kit/input'
import { useDispatch } from '@services/store'
import { TConnectionStore, updateLineColor } from '@widgets/connections'

import style from './style.module.scss'

type TProps = {
	line: TConnectionStore
}

export const LineParameters: FC<TProps> = ({ line }) => {
	const [formState, setFormState] = useState(line.style)

	const dispatch = useDispatch()

	useEffect(() => {
		setFormState(line.style)
	}, [line])

	return (
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
	)
}

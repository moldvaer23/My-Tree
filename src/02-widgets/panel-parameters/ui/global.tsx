import { FC, FormEvent, useState } from 'react'
import { Input } from '@ui-kit/input'
import { Button } from '@ui-kit/button'
import { useDispatch, useSelector } from '@services/store'
import {
	getGlobalStyleSettings,
	updateGlobalSettings,
} from '@services/slices/global-slice'

import style from './style.module.scss'

export const GlobalParameters: FC = () => {
	const globalStyleSettings = useSelector(getGlobalStyleSettings)
	const [formState, setFormState] = useState(globalStyleSettings)

	const dispatch = useDispatch()

	const onSubmit = (e: FormEvent) => {
		e.preventDefault()
		dispatch(updateGlobalSettings(formState))
	}

	return (
		<form onSubmit={onSubmit}>
			<ul className={style.list}>
				<li className={style.item}>
					<Input
						inputType='color'
						id='color'
						labelText='Цвет блоков'
						onChange={(e) =>
							setFormState({ ...formState, color: e.target.value })
						}
						value={formState.color}
					/>
				</li>
				<li className={style.item}>
					<Input
						inputType='color'
						id='lineColor'
						labelText='Цвет Линий'
						onChange={(e) =>
							setFormState({ ...formState, lineColor: e.target.value })
						}
						value={formState.lineColor}
					/>
				</li>
				<li className={style.item}>
					<Input
						inputType='color'
						id='textColor'
						labelText='Цвет текста'
						onChange={(e) =>
							setFormState({ ...formState, textColor: e.target.value })
						}
						value={formState.textColor}
					/>
				</li>
				<li className={style.item}>
					<Input
						inputType='number'
						id='fontSize'
						labelText='Размер шрифта'
						onChange={(e) =>
							setFormState({ ...formState, fontSize: Number(e.target.value) })
						}
						value={formState.fontSize}
					/>
				</li>
			</ul>

			<Button type='submit' size='small' variant='contained'>
				Применить
			</Button>
		</form>
	)
}

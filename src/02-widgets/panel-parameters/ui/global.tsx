import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { TGlobalSettings } from '@app-types'
import { Input } from '@ui-kit/input'
import { Button } from '@ui-kit/button'
import { useDispatch, useSelector } from '@services/store'
import {
	getGlobalStyleSettings,
	updateGlobalSettings,
} from '@services/slices/global-slice'

import style from './style.module.scss'

export type TIdVariants = 'color' | 'textColor' | 'fontSize'

export const GlobalParameters: FC = () => {
	const globalStyleSettings = useSelector(getGlobalStyleSettings)
	const [formState, setFormState] =
		useState<TGlobalSettings>(globalStyleSettings)

	const dispatch = useDispatch()

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const id: TIdVariants = e.target.getAttribute('id') as TIdVariants

		if (!id) return

		setFormState({
			...formState,
			[id]: id === 'fontSize' ? Number(e.target.value) : e.target.value,
		})
	}

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
						onChange={onChange}
						value={formState.color}
					/>
				</li>
				<li className={style.item}>
					<Input
						inputType='color'
						id='lineColor'
						labelText='Цвет Линий'
						onChange={onChange}
						value={formState.lineColor}
					/>
				</li>
				<li className={style.item}>
					<Input
						inputType='color'
						id='textColor'
						labelText='Цвет текста'
						onChange={onChange}
						value={formState.textColor}
					/>
				</li>
				<li className={style.item}>
					<Input
						inputType='number'
						id='fontSize'
						labelText='Размер шрифта'
						onChange={onChange}
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

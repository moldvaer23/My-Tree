import { FC, useEffect, useState } from 'react'
import { Input } from '@ui-kit/input'
import { TTextStore } from '@entities/text'
import { useDispatch } from '@services/store'
import {
	updateTextColor,
	updateTextFontBold,
	updateTextFontCurs,
	updateTextFontSize,
} from '@widgets/texts'

import style from './style.module.scss'

type TProps = {
	textData: TTextStore
}

export const TextParameters: FC<TProps> = ({ textData }) => {
	const [formState, setFormState] = useState(textData.styles)

	const dispatch = useDispatch()

	useEffect(() => {
		setFormState(textData.styles)
	}, [textData])

	return (
		<ul className={style.list}>
			<li className={style.item}>
				<Input
					inputType='color'
					id='textColor'
					labelText='Цвет текста'
					onBlurCapture={() =>
						dispatch(
							updateTextColor({
								uuid: textData.uuid,
								value: formState.color,
							})
						)
					}
					onChange={(e) =>
						setFormState({
							...formState,
							color: e.target.value,
						})
					}
					value={formState.color}
				/>
			</li>
			<li className={style.item}>
				<Input
					inputType='number'
					id='fontSize'
					labelText='Размер шрифта'
					onBlurCapture={() =>
						dispatch(
							updateTextFontSize({
								uuid: textData.uuid,
								value: formState.fontSize,
							})
						)
					}
					onChange={(e) =>
						setFormState({
							...formState,
							fontSize: Number(e.target.value),
						})
					}
					value={formState.fontSize}
				/>
			</li>
			<li className={style.item}>
				<Input
					inputType='checkbox'
					id='fontCurs'
					labelText='Курсив'
					onChange={(e) => {
						dispatch(
							updateTextFontCurs({
								uuid: textData.uuid,
								value: e.target.checked,
							})
						)
						setFormState({
							...formState,
							curs: e.target.checked,
						})
					}}
					checked={formState.curs}
				/>
			</li>
			<li className={style.item}>
				<Input
					inputType='checkbox'
					id='fontBold'
					labelText='Жирный шрифт'
					onChange={(e) => {
						dispatch(
							updateTextFontBold({
								uuid: textData.uuid,
								value: e.target.checked,
							})
						)
						setFormState({
							...formState,
							bold: e.target.checked,
						})
					}}
					checked={formState.bold}
				/>
			</li>
		</ul>
	)
}

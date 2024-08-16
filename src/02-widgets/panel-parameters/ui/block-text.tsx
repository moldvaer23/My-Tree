import { TBlockStore } from '@entities/block-text'
import { Input } from '@ui-kit/input'
import { ChangeEvent, FC, FocusEvent, useEffect, useState } from 'react'

import style from './style.module.scss'
import { Icon } from '@ui-kit/icon'
import { ICON_CLOSE } from '@assets'
import { useDispatch } from '@services/store'
import {
	setToolView,
	updateBlockColor,
	updateBlockCurs,
	updateBlockFontBold,
	updateBlockFontSize,
	updateBlockTextColor,
	updateBlockTitle,
} from '@services/slices/canvas-slice'
import { TIdCheckboxVariants, TIdVariants } from '../lib/types'

type TProps = {
	block: TBlockStore
}

export const BlockTextParameters: FC<TProps> = ({ block }) => {
	const [formState, setFormState] = useState({
		text: '',
		color: '',
		textColor: '',
		fontSize: '',
		fontBold: false,
		curs: false,
	})

	const dispatch = useDispatch()

	const onBlurCapture = (e: FocusEvent) => {
		const id: TIdVariants | null = e.currentTarget.getAttribute(
			'id'
		) as TIdVariants | null

		if (!id) return

		switch (id) {
			case 'text': {
				dispatch(updateBlockTitle({ uuid: block.uuid, text: formState.text }))
				break
			}
			case 'color': {
				dispatch(updateBlockColor({ uuid: block.uuid, color: formState.color }))
				break
			}
			case 'textColor': {
				dispatch(
					updateBlockTextColor({ uuid: block.uuid, color: formState.textColor })
				)
				break
			}
			case 'fontSize': {
				dispatch(
					updateBlockFontSize({
						uuid: block.uuid,
						size: Number(formState.fontSize),
					})
				)
				break
			}
			default: {
				break
			}
		}
	}

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const id: TIdVariants | null = e.currentTarget.getAttribute(
			'id'
		) as TIdVariants | null

		if (!id) return

		setFormState({
			...formState,
			[id]: e.target.value,
		})
	}

	const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
		const id: TIdCheckboxVariants | null = e.currentTarget.getAttribute(
			'id'
		) as TIdCheckboxVariants | null

		if (!id) return

		switch (id) {
			case 'fontBold': {
				dispatch(
					updateBlockFontBold({ uuid: block.uuid, value: e.target.checked })
				)
				break
			}
			case 'curs': {
				dispatch(updateBlockCurs({ uuid: block.uuid, value: e.target.checked }))
				break
			}
		}

		setFormState({
			...formState,
			[id]: e.target.checked,
		})
	}

	const onClickClose = () => {
		dispatch(setToolView(null))
	}

	useEffect(() => {
		setFormState({
			color: block.styles.color,
			curs: block.styles.curs,
			fontBold: block.styles.fontBold,
			fontSize: block.styles.fontSize.toString(),
			textColor: block.styles.textColor,
			text: block.title,
		})
	}, [block])

	return (
		<form>
			<button
				className={style.close__button}
				type='button'
				onClick={onClickClose}
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
						inputType='text'
						id='text'
						labelText='Текст блока'
						onBlurCapture={onBlurCapture}
						onChange={onChange}
						autoComplete='off'
						value={formState.text}
					/>
				</li>
				<li className={style.item}>
					<Input
						inputType='color'
						id='color'
						labelText='Цвет блока'
						onBlurCapture={onBlurCapture}
						onChange={onChange}
						value={formState.color}
					/>
				</li>
				<li className={style.item}>
					<Input
						inputType='color'
						id='textColor'
						labelText='Цвет текста'
						onBlurCapture={onBlurCapture}
						onChange={onChange}
						value={formState.textColor}
					/>
				</li>
				<li className={style.item}>
					<Input
						inputType='number'
						id='fontSize'
						labelText='Размер шрифта'
						onBlurCapture={onBlurCapture}
						onChange={onChange}
						value={formState.fontSize}
					/>
				</li>
				<li className={style.item}>
					<Input
						inputType='checkbox'
						id='fontBold'
						labelText='Жирный текст'
						onBlurCapture={onBlurCapture}
						onChange={onChangeCheckbox}
						checked={formState.fontBold}
					/>
				</li>
				<li className={style.item}>
					<Input
						inputType='checkbox'
						id='curs'
						labelText='Курсив'
						onBlurCapture={onBlurCapture}
						onChange={onChangeCheckbox}
						checked={formState.curs}
					/>
				</li>
			</ul>
		</form>
	)
}

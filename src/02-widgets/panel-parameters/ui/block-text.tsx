import { FC, useEffect, useState } from 'react'
import IconBackArrow from '@assets/icon-back-arrow.svg?react'
import { Icon } from '@ui-kit/icon'
import { Input } from '@ui-kit/input'
import { useDispatch } from '@services/store'
import { TBlockStore } from '@entities/block-text'
import {
	setToolView,
	updateBlockColor,
	updateBlockCurs,
	updateBlockFontBold,
	updateBlockFontSize,
	updateBlockTextColor,
	updateBlockTitle,
} from '@services/slices/canvas-slice'

import style from './style.module.scss'

type TProps = {
	block: TBlockStore
}

export const BlockTextParameters: FC<TProps> = ({ block }) => {
	const [formState, setFormState] = useState({
		...block.styles,
		text: '',
	})

	const dispatch = useDispatch()

	useEffect(() => {
		setFormState({
			...block.styles,
			text: block.title,
		})
	}, [block])

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
						inputType='text'
						id='text'
						labelText='Текст блока'
						onBlurCapture={() =>
							dispatch(
								updateBlockTitle({ uuid: block.uuid, text: formState.text })
							)
						}
						onChange={(e) =>
							setFormState({
								...formState,
								text: e.target.value,
							})
						}
						autoComplete='off'
						value={formState.text}
					/>
				</li>
				<li className={style.item}>
					<Input
						inputType='color'
						id='color'
						labelText='Цвет блока'
						onBlurCapture={() =>
							dispatch(
								updateBlockColor({ uuid: block.uuid, color: formState.color })
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
						inputType='color'
						id='textColor'
						labelText='Цвет текста'
						onBlurCapture={() =>
							dispatch(
								updateBlockTextColor({
									uuid: block.uuid,
									color: formState.textColor,
								})
							)
						}
						onChange={(e) =>
							setFormState({
								...formState,
								textColor: e.target.value,
							})
						}
						value={formState.textColor}
					/>
				</li>
				<li className={style.item}>
					<Input
						inputType='number'
						id='fontSize'
						labelText='Размер шрифта'
						onBlurCapture={() =>
							dispatch(
								updateBlockFontSize({
									uuid: block.uuid,
									size: Number(formState.fontSize),
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
						id='fontBold'
						labelText='Жирный текст'
						onChange={(e) => {
							dispatch(
								updateBlockFontBold({
									uuid: block.uuid,
									value: e.target.checked,
								})
							)
							setFormState({
								...formState,
								fontBold: e.target.checked,
							})
						}}
						checked={formState.fontBold}
					/>
				</li>
				<li className={style.item}>
					<Input
						inputType='checkbox'
						id='curs'
						labelText='Курсив'
						onChange={(e) => {
							dispatch(
								updateBlockCurs({ uuid: block.uuid, value: e.target.checked })
							)
							setFormState({
								...formState,
								curs: e.target.checked,
							})
						}}
						checked={formState.curs}
					/>
				</li>
			</ul>
		</form>
	)
}

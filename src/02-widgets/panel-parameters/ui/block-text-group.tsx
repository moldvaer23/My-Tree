import { FC, useEffect, useState } from 'react'
import { Input } from '@ui-kit/input'
import { useDispatch } from '@services/store'
import { updateBlockGroupColors } from '@widgets/blocks-group'
import { TBlockTextGroupStore } from '@entities/block-text-group'

import style from './style.module.scss'

type TProps = {
	group: TBlockTextGroupStore
}

export const BlockTextGroupParameters: FC<TProps> = ({ group }) => {
	const [formState, setFormState] = useState(group.styles)

	const dispatch = useDispatch()

	useEffect(() => {
		setFormState(group.styles)
	}, [group])

	return (
		<ul className={style.list}>
			<li className={style.item}>
				<Input
					inputType='color'
					id='childBgColor'
					labelText='Цвет блоков'
					onBlurCapture={() =>
						dispatch(
							updateBlockGroupColors({
								type: 'childBgColor',
								uuid: group.uuid,
								value: formState.childBgColor,
							})
						)
					}
					onChange={(e) =>
						setFormState({
							...formState,
							childBgColor: e.target.value,
						})
					}
					value={formState.childBgColor}
				/>
			</li>
			<li className={style.item}>
				<Input
					inputType='color'
					id='childTextColor'
					labelText='Цвет текста блоков'
					onBlurCapture={() =>
						dispatch(
							updateBlockGroupColors({
								type: 'childTextColor',
								uuid: group.uuid,
								value: formState.childTextColor,
							})
						)
					}
					onChange={(e) =>
						setFormState({
							...formState,
							childTextColor: e.target.value,
						})
					}
					value={formState.childTextColor}
				/>
			</li>
			<li className={style.item}>
				<Input
					inputType='color'
					id='borderColor'
					labelText='Цвет границы группы'
					onBlurCapture={() =>
						dispatch(
							updateBlockGroupColors({
								type: 'borderColor',
								uuid: group.uuid,
								value: formState.borderColor,
							})
						)
					}
					onChange={(e) =>
						setFormState({
							...formState,
							borderColor: e.target.value,
						})
					}
					value={formState.borderColor}
				/>
			</li>
		</ul>
	)
}

import { useDispatch, useSelector } from '@services/store'
import { FC } from 'react'
import {
	getTexts,
	setTextDragging,
	setTextParameters,
	updateTextPosition,
} from '../lib/texts-slice'
import {
	Draggable,
	TOnSetIsDragging,
	TOnSetParameters,
	TOnUpdateCoordinates,
} from '@features/draggable'
import { Text } from '@entities/text'

export const TextsRender: FC = () => {
	const textsStore = useSelector(getTexts)
	const dispatch = useDispatch()

	return Object.values(textsStore).map((text) => {
		const onSetIsDragging: TOnSetIsDragging = (value: boolean) => {
			if (value) {
				dispatch(setTextDragging(text.uuid))
			} else {
				dispatch(setTextDragging(null))
			}
		}

		const onSetParameters: TOnSetParameters = ({ height, width }) => {
			dispatch(
				setTextParameters({
					uuid: text.uuid,
					height: height,
					width: width,
				})
			)
		}

		const onUpdateCoordinates: TOnUpdateCoordinates = (coordinates) => {
			dispatch(
				updateTextPosition({
					uuid: text.uuid,
					coordinates: coordinates,
				})
			)
		}

		return (
			<Draggable
				childrenData={text}
				childrenStoreArr={Object.values(textsStore)}
				onSetIsDragging={onSetIsDragging}
				onSetParameters={onSetParameters}
				onUpdateCoordinates={onUpdateCoordinates}
				key={text.uuid}
			>
				<Text content={text.content} />
			</Draggable>
		)
	})
}

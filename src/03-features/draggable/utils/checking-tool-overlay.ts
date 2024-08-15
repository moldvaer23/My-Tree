import { TCoordinates, TExampleToolStore } from '@app-types'

export const checkingToolOverlay = <T extends TExampleToolStore>(
	thisTool: TExampleToolStore,
	toolsArr: T[]
): TCoordinates => {
	const result = thisTool.coordinates

	toolsArr.forEach((otherTool) => {
		if (otherTool.uuid === thisTool.uuid) return
		if (!otherTool.parameters || !thisTool.parameters) return

		if (
			thisTool.coordinates.x <
				otherTool.coordinates.x + otherTool.parameters.width &&
			thisTool.coordinates.x + thisTool.parameters.width >
				otherTool.coordinates.x &&
			thisTool.coordinates.y <
				otherTool.coordinates.y + otherTool.parameters.height &&
			thisTool.coordinates.y + thisTool.parameters.height >
				otherTool.coordinates.y
		) {
			// Корректировка позиции по X
			if (thisTool.coordinates.x < otherTool.coordinates.x) {
				result.x = otherTool.coordinates.x - thisTool.parameters.width
			} else {
				result.x = otherTool.coordinates.x + otherTool.parameters.width
			}

			// Корректировка позиции по Y
			if (thisTool.coordinates.y < otherTool.coordinates.y) {
				result.y = otherTool.coordinates.y - thisTool.parameters.height
			} else {
				result.y = otherTool.coordinates.y + otherTool.parameters.height
			}
		}
	})

	return result
}

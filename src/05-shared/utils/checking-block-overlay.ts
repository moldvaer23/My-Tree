import { TBlockStore, TCoordinates } from '@app-types/types'

type TProps = {
	blocks: TBlockStore[]
	thisBlock: {
		uuid: string
		position: TCoordinates
		parameters: {
			width: number
			height: number
		} | null
	}
}

export const checkingBlockOverlay = ({
	blocks,
	thisBlock,
}: TProps): TCoordinates => {
	const result = thisBlock.position

	blocks.forEach((otherBlock) => {
		if (otherBlock.uuid !== thisBlock.uuid) {
			if (otherBlock.parameters && thisBlock.parameters) {
				console.log(
					`Координаты другого блока x: ${otherBlock.position.x}; y: ${otherBlock.position.y}`
				)
				console.log(
					`Координаты этого блока x: ${thisBlock.position.x}; y: ${thisBlock.position.y}`
				)

				if (
					thisBlock.position.x <
						otherBlock.position.x + otherBlock.parameters.width &&
					thisBlock.position.x + thisBlock.parameters.width >
						otherBlock.position.x &&
					thisBlock.position.y <
						otherBlock.position.y + otherBlock.parameters.height &&
					thisBlock.position.y + thisBlock.parameters.height >
						otherBlock.position.y
				) {
					// Корректировка позиции по X
					if (thisBlock.position.x < otherBlock.position.x) {
						result.x = otherBlock.position.x - thisBlock.parameters.width
					} else {
						result.x = otherBlock.position.x + otherBlock.parameters.width
					}

					// Корректировка позиции по Y
					if (thisBlock.position.y < otherBlock.position.y) {
						result.y = otherBlock.position.y - thisBlock.parameters.height
					} else {
						result.y = otherBlock.position.y + otherBlock.parameters.height
					}
				}
			}
		}
	})

	console.log(`Координаты после подсчета x: ${result.x}; y: ${result.y}`)

	return result
}

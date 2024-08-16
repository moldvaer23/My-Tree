import { TBlockStore } from '@entities/block-text'
import { FC } from 'react'

type TProps = {
	block: TBlockStore
}

export const BlockTextParameters: FC<TProps> = ({ block }) => {
	return <div>Blocks-text:{block.uuid}</div>
}

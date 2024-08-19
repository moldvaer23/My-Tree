import { TConnectionStore } from '@widgets/connections'
import { FC } from 'react'

type TProps = {
	line: TConnectionStore
}

export const LineParameters: FC<TProps> = ({ line }) => {
	return <div>Line: {line.uuid}</div>
}

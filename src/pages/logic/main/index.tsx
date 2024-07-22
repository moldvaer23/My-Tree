import { MainPageUI } from '@pages/ui/main'
import { getBlocks } from '@services/slices/canvas-slice'
import { useSelector } from '@services/store'
import { FC } from 'react'

export const MainPage: FC = () => {
	const blocks = useSelector(getBlocks)

	return <MainPageUI blocks={Object.values(blocks)} />
}

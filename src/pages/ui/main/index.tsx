import { AsideTools } from '@components/logic/aside-tools'
import { Header } from '@components/logic/header'
import { FC } from 'react'
import style from './style.module.scss'
import { Canvas } from '@components/logic/canvas'
import { BlockText } from '@components/logic/block-text'
import { TBlockStore } from '@utils/types'

type TProps = {
	blocks: TBlockStore[]
}

export const MainPageUI: FC<TProps> = ({ blocks }) => (
	<div className={style.page}>
		<Header />
		<main className={style.main}>
			<Canvas>
				{blocks.length
					? blocks.map((block, index) => (
							<BlockText
								key={index}
								onClickBlock={(e) => console.log(e)}
								onClickGateway={(e) => console.log(e)}
								blockPosition={block.position}
								title={block.title}
							/>
						))
					: null}
			</Canvas>
			<AsideTools />
		</main>
	</div>
)

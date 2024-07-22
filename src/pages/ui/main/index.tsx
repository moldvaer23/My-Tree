import { AsideTools } from '@components/logic/aside-tools'
import { Header } from '@components/logic/header'
import { FC } from 'react'
import style from './style.module.scss'
import { Canvas } from '@components/logic/canvas'
import { BlockText } from '@components/logic/block-text'

export const MainPageUI: FC = () => (
	<div className={style.page}>
		<Header />
		<main className={style.main}>
			<Canvas>
				<BlockText
					onClickBlock={(e) => console.log(e)}
					onClickGateway={(e) => console.log(e)}
					title='qwerty'
					blockPosition={{
						x: 100,
						y: 100,
					}}
				/>
				<BlockText
					onClickBlock={(e) => console.log(e)}
					onClickGateway={(e) => console.log(e)}
					title='qwerty'
					blockPosition={{
						x: 500,
						y: 500,
					}}
				/>
			</Canvas>
			<AsideTools />
		</main>
	</div>
)

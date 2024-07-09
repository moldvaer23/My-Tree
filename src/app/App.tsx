import { FC } from 'react'
import clsx from 'clsx'
import icon from '@assets/react.svg'
import style from './style.module.scss'
import { Button } from '@components/ui-kit/button'
import { BlockText } from '@components/ui-kit/block-text'

export const App: FC = () => (
	<div>
		<span className={clsx(style.red__text, 'font-extrabold')}>App Started</span>
		<span className={style.blue__text}>Blue text</span>
		<Button className='qwe' variant='contained' size='small'>
			Сохранить
		</Button>
		<BlockText
			onClickBlock={() => console.log('Click block')}
			onClickGateway={(e) =>
				console.log(e.currentTarget.getAttribute('data-gateway-position'))
			}
			title='React-router-dom'
			bgColor='#000000'
		/>
		<img src={icon} alt='1' />
	</div>
)

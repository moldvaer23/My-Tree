import { FC } from 'react'
import clsx from 'clsx'
import { Button } from '@components/ui-kit/button'
import { BlockText } from '@components/ui-kit/block-text'
import { Input } from '@components/ui-kit/input'
import { Icon } from '@components/ui-kit/icon'
import { ICON_BACK_ARROW } from '@assets/index'
import { ButtonIcon } from '@components/ui-kit/button-icon'
import style from './style.module.scss'

export const MainPage: FC = () => (
	<div className={style.app}>
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
		<Input
			id='q'
			labelText='Текст блока'
			placeholder='Введите текст блока'
			inputType='text'
			onChange={(e) => console.log(e.target.value)}
		/>
		<Icon iconData={{ alt: 'q', cdn: ICON_BACK_ARROW }} size='large' />
		<ButtonIcon
			iconData={{ alt: 'q', cdn: ICON_BACK_ARROW }}
			size='large'
			onClick={() => {}}
		/>
	</div>
)
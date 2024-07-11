import { FC } from 'react'
import clsx from 'clsx'
import { Button } from '@components/ui-kit/button'
import { BlockText } from '@components/ui-kit/block-text'
import { Input } from '@components/ui-kit/input'
import { Icon } from '@components/ui-kit/icon'
import {
	ICON_BACK_ARROW,
	ICON_CURVED_LINE,
	ICON_DOTTED_LINE,
	ICON_STRAIGHT_LINE,
} from '@assets/index'
import { ButtonIcon } from '@components/ui-kit/button-icon'
import style from './style.module.scss'
import { DropDownMenu } from '@components/ui-kit/drop-down-menu'
import { LayoutWrapper } from '@components/ui-kit/layout-wrapper'

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
		<DropDownMenu
			menuItems={[
				{
					cdn: ICON_DOTTED_LINE,
					alt: 'Пунктирная линия',
					type: 'dotted',
				},
				{
					cdn: ICON_CURVED_LINE,
					alt: 'Кривая линия',
					type: 'curved',
				},
				{
					cdn: ICON_STRAIGHT_LINE,
					alt: 'Прямая линия',
					type: 'straight',
				},
			]}
			activeMenuItem={0}
			onClickMenuItem={(e) =>
				console.log(e.currentTarget.getAttribute('data-type-line'))
			}
			size={'small'}
		/>
		<LayoutWrapper>
			<div>
				<Input
					id='q'
					labelText='Текст блока'
					placeholder='Введите текст блока'
					inputType='text'
					onChange={(e) => console.log(e.target.value)}
				/>
				<Input
					id='q'
					labelText='Текст блока'
					placeholder='Введите текст блока'
					inputType='text'
					onChange={(e) => console.log(e.target.value)}
				/>
				<Input
					id='q'
					labelText='Текст блока'
					placeholder='Введите текст блока'
					inputType='text'
					onChange={(e) => console.log(e.target.value)}
				/>
				<Button className='qwe' variant='contained' size='small'>
					Сохранить
				</Button>
				<Button className='qwe' variant='outlined' size='small'>
					Сохранить
				</Button>
			</div>
		</LayoutWrapper>
	</div>
)

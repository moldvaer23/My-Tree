import { FC, MouseEvent, useEffect, useRef, useState } from 'react'

import { ICON_ARROW_DOWN } from '@assets/index'
import { TIconData, TSize } from '@utils/ui-kit-types'

import { Icon } from '../icon'
import style from './styles.module.scss'
import { ButtonIcon } from '../button-icon'

type TProps = {
	activeMenuItem: number
	size: TSize
	menuItems: (TIconData & { type: string; text?: string })[]
	onClickMenuItem: (e: MouseEvent<HTMLButtonElement>) => void
}

export const DropDownMenu: FC<TProps> = ({
	menuItems,
	activeMenuItem,
	size,
	onClickMenuItem,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const rootRef = useRef<HTMLDivElement | null>(null)

	const onClickMenuItemWrapper = (e: MouseEvent<HTMLButtonElement>) => {
		onClickMenuItem(e)
		setIsOpen(false)
	}

	useEffect(() => {
		const handleOutClick = (e: Event) => {
			if (
				rootRef.current &&
				e.target instanceof Node &&
				!rootRef.current.contains(e.target)
			) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleOutClick)

		return () => document.removeEventListener('mousedown', handleOutClick)
	}, [])

	if (activeMenuItem + 1 > menuItems.length) return <div>Пустое меню</div>

	return (
		<div className={style.wrapper} ref={rootRef}>
			<ButtonIcon
				iconData={{
					cdn: menuItems[activeMenuItem].cdn,
					alt: menuItems[activeMenuItem].alt,
				}}
				size={size}
				onClick={() => setIsOpen((prev) => !prev)}
			/>
			<Icon
				className={style.icon_arrow}
				iconData={{ cdn: ICON_ARROW_DOWN, alt: 'Развернуть меню' }}
				size='small'
				iconColorRevert
			/>

			{isOpen && (
				<div className={style.menu}>
					<ul className={style.list}>
						{menuItems.map((item, index) =>
							index !== activeMenuItem ? (
								<li className={style.item} key={index}>
									<ButtonIcon
										iconData={{ cdn: item.cdn, alt: item.alt }}
										size={size}
										iconColorRevert
										data-item-type={item.type}
										onClick={onClickMenuItemWrapper}
									/>
									{item.text && <span>{item.text}</span>}
								</li>
							) : null
						)}
					</ul>
				</div>
			)}
		</div>
	)
}

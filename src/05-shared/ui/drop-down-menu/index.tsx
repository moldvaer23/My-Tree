import { FC, MouseEvent, useEffect, useRef, useState } from 'react'

import { Tooltip } from 'react-tooltip'
import IconArrowDown from '@assets/icon-arrow-down.svg?react'

import { Icon } from '../icon'
import style from './styles.module.scss'
import { ButtonIcon } from '../button-icon'
import { TDropDownMenuItems, TSize } from '@app-types'

export type TProps = {
	activeMenuItem: number
	size: TSize
	menuItems: TDropDownMenuItems[]
	onClickMenuItem: (e: MouseEvent) => void
}

export const DropDownMenu: FC<TProps> = ({
	menuItems,
	activeMenuItem,
	size,
	onClickMenuItem,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const rootRef = useRef<HTMLDivElement | null>(null)

	const onClickMenuItemWrapper = (e: MouseEvent) => {
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

		if (isOpen) document.addEventListener('mousedown', handleOutClick)

		return () => document.removeEventListener('mousedown', handleOutClick)
	}, [isOpen])

	if (activeMenuItem + 1 > menuItems.length) return <div>Пустое меню</div>

	return (
		<div className={style.wrapper} ref={rootRef}>
			<ButtonIcon
				Icon={menuItems[activeMenuItem].Icon}
				size={size}
				onClick={() => setIsOpen((prev) => !prev)}
				data-tooltip-id={`button-${menuItems[activeMenuItem].type}`}
				data-tooltip-content={menuItems[activeMenuItem].text}
			/>
			<Icon className={style.icon_arrow} Icon={IconArrowDown} size='small' />
			<Tooltip
				id={`button-${menuItems[activeMenuItem].type}`}
				variant='light'
			/>

			{isOpen && (
				<div className={style.menu}>
					<ul className={style.list}>
						{menuItems.map((item, index) =>
							index !== activeMenuItem ? (
								<li className={style.item} key={index}>
									<ButtonIcon
										Icon={item.Icon}
										size={size}
										onClick={onClickMenuItemWrapper}
										data-item-type={item.type}
										data-tooltip-id={`button-${item.type}`}
										data-tooltip-content={item.text}
									/>
									<Tooltip id={`button-${item.type}`} variant='light' />
								</li>
							) : null
						)}
					</ul>
				</div>
			)}
		</div>
	)
}

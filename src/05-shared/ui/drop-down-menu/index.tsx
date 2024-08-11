import { FC, MouseEvent, useEffect, useRef, useState } from 'react'

import { Tooltip } from 'react-tooltip'
import { ICON_ARROW_DOWN } from '@assets'

import { TDropDownMenuProps } from '@app-types/ui-kit-types'

import { Icon } from '../icon'
import style from './styles.module.scss'
import { ButtonIcon } from '../button-icon'

export const DropDownMenu: FC<TDropDownMenuProps> = ({
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
				iconData={{
					cdn: menuItems[activeMenuItem].cdn,
					alt: menuItems[activeMenuItem].alt,
				}}
				size={size}
				onClick={() => setIsOpen((prev) => !prev)}
				data-tooltip-id={`button-${menuItems[activeMenuItem].type}`}
				data-tooltip-content={menuItems[activeMenuItem].alt}
			/>
			<Icon
				className={style.icon_arrow}
				iconData={{ cdn: ICON_ARROW_DOWN, alt: 'Развернуть меню' }}
				size='small'
				iconColorRevert
			/>
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
										iconData={{ cdn: item.cdn, alt: item.alt }}
										size={size}
										iconColorRevert
										onClick={onClickMenuItemWrapper}
										data-item-type={item.type}
										data-tooltip-id={`button-${item.type}`}
										data-tooltip-content={item.alt}
									/>
									<Tooltip id={`button-${item.type}`} variant='light' />
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

import { TExampleToolStore } from '@app-types'
import { TGatewaysProperty } from '@ui-kit/gateways'
import { MouseEvent } from 'react'

export type TChildBlockTextGroup = {
	uuid: string
	text: string
}

export type TBlockTextGroupStore = TExampleToolStore & {
	gateways: TGatewaysProperty
	children: TChildBlockTextGroup[]
	styles: {
		childBgColor: string
		childTextColor: string
		borderColor: string
	}
}

export type TOnClickAddChild = (e: MouseEvent, t: TChildBlockTextGroup) => void

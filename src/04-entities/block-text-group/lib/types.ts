import { TExampleToolStore } from '@app-types'
import { TBlockStore } from '@entities/block-text/lib/types'
import { TGatewaysProperty } from '@ui-kit/gateways'
import { MouseEvent } from 'react'

export type TBlockTextGroupStore = TExampleToolStore & {
	gateways: TGatewaysProperty
	children: TBlockStore[]
}

export type TOnClickAddChild = (e: MouseEvent, blockText: TBlockStore) => void

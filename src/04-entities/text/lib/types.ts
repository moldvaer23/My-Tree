import { TExampleToolStore } from '@app-types'

export type TTextStore = TExampleToolStore & {
	content: string
	styles: {
		color: string
	}
}

import { TCoordinates } from '@app-types/types'

export type TOnSetIsDragging = (t: boolean) => void
export type TOnSetParameters = (t: { width: number; height: number }) => void
export type TOnUpdateCoordinates = (t: TCoordinates) => void

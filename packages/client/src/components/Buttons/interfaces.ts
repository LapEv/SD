import { SyntheticEvent, type PropsWithChildren } from 'react'

export type Handle = {
  closeModal: (state: boolean) => void
  btnName: string
}

export type HandleSection = {
  btnName: string
  btnSecondName: string
  btnSecondHandle: () => void
  btnDisabled?: boolean
  btnSecondDisabled?: boolean
  onClick?: () => void
  sx?: Record<string, unknown>
}

export type HandleNoSubmit = {
  btnName: string
  btnSecondName: string
  btnHandle: () => void
  btnSecondHandle: () => void
  btnDisabled?: boolean
  btnSecondDisabled?: boolean
}

export interface IEditButton {
  handleClick?: (event: SyntheticEvent<EventTarget>) => void
  size?: string
}

export type FabProps = PropsWithChildren<{
  title: string
  order?: number
  onClick: () => void
  active?: boolean
}>

export interface IconButtonProps {
  popover: string
  vertical?: 'top' | 'center' | 'bottom' | number
  onClick: () => void
  icon?: JSX.Element
  sx?: Record<string, unknown>
  propsPopover?: Record<string, unknown>
  size?: 'small' | 'medium' | 'large'
}

export interface IconButtonTooltipProps {
  onClick: () => void
  icon?: JSX.Element
  sx?: Record<string, unknown>
  size?: 'small' | 'medium' | 'large'
  title: string
}

export interface IRotateButton {
  open: boolean
  handleClick?: () => void
  size?: string
}

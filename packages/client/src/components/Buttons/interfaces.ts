import { JSX, SyntheticEvent, type PropsWithChildren } from 'react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'
import { LinkProps } from 'react-router-dom'
import { type ButtonProps } from '@mui/material/Button'

export type TButtonProps = Omit<ButtonProps, 'component'> & {
  component?:
    | React.ForwardRefExoticComponent<
        LinkProps & React.RefAttributes<HTMLAnchorElement>
      >
    | ForwardRefExoticComponent<LinkProps & RefAttributes<HTMLAnchorElement>>
}

export type Handle = {
  closeModal: (state: boolean) => void
  btnName: string
  sx?: Record<string, unknown>
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
  containerProps?: Record<string, unknown>
  props?: Record<string, unknown>
  classContainer?: string
}

export type IButtonsFilterINCs = {
  btnAddHandle: () => void
  btnClearHandle: () => void
  btnOkHandle: () => void
}

export interface IEditButton {
  handleClick?: (event: SyntheticEvent<EventTarget>) => void
  size?: string
}

export interface IClearButton {
  handleClick?: (event: SyntheticEvent<EventTarget>) => void
  size?: string
  id?: number | string
  className?: string
  length?: number
  classNameBox?: string
}

export interface ISearchIconElement {
  handleClick?: (event: SyntheticEvent<EventTarget>) => void
  size?: string
  id?: number | string
  className?: string
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
  className: string
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
  sx?: Record<string, unknown>
}

export interface IClearSearchModalSection {
  length: number
  handleClick: (data: SyntheticEvent<EventTarget, Event>) => void
  className?: string
}

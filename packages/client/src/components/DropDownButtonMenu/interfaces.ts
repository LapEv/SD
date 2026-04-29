import { JSX } from 'react'

export interface DropDownMenuProps {
  popover: string
  data: {
    name: string
    title: string
    icon?: JSX.Element
  }[]
  divider?: number[]
  onClick: (name: string | null) => void
  vertical?: 'top' | 'center' | 'bottom' | number
  icon?: JSX.Element
  sx?: Record<string, unknown>
}

export interface DropDownMenuTooltipProps {
  title: string
  data: {
    name: string
    title: string
    icon?: JSX.Element
  }[]
  divider?: number[]
  onClick: (name: string) => void
  icon?: JSX.Element
  sx?: Record<string, unknown>
  className?: string
  classNameIcon?: string
}

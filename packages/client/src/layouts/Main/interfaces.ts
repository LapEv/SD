import { JSX } from 'react'
import { FilesData } from 'store/slices/files/interfaces'
import { User } from 'storeAuth/interfaces'
import { ITheme } from 'themes/themeConfig'

export interface DrawerHeaderProps {
  open?: boolean
  toggleDrawer: (check: boolean) => void
  theme: ITheme
}

export interface SideBarProps {
  open?: boolean
}

export interface NanListItemProps {
  icon: JSX.Element
  text: string
  to: string
  isExpanded: boolean
  id?: string
  closeMobileMenu: () => void
}

export interface ListItemStateProps {
  icon: JSX.Element
  text: string
  to: string
  id?: string
}

export interface DataItemsProps {
  user: User
  open: boolean
  closeMobileMenu?: () => void
}

export interface IViewImage {
  file: FilesData
}

export interface IViewButtons {
  index: number
}

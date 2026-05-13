import { JSX } from 'react'
import { FilesData } from 'store/slices/files/interfaces'
import { User } from 'storeAuth/interfaces'

export interface DrawerHeaderProps {
  open?: boolean
  toggleDrawer: (check: boolean) => void
  fontSize: string
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
}

export interface IViewImage {
  file: FilesData
}

export interface IViewButtons {
  index: number
}

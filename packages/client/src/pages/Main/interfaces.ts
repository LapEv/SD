import { JSX } from 'react'
import { User } from 'store/slices/auth/interfaces'

export interface MenuDataProps {
  user: User
}

export interface MenuListItemProps {
  icon: JSX.Element
  text: string
  to: string
  id?: string
}

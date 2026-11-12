import { SvgIcon } from '@mui/material'
import { AvatarIconProps } from './interfaces'
import { memo } from 'react'

export const AvatarClient = memo((props: AvatarIconProps) => {
  return <SvgIcon {...props} viewBox="0 0 70 70"></SvgIcon>
})

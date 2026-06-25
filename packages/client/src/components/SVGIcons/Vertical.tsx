import { SvgIcon, SvgIconProps } from '@mui/material'
import { memo } from 'react'

export const Vertical = memo((props: SvgIconProps) => {
  return (
    <SvgIcon {...props} sx={{ zIndex: 50 }} viewBox="0 0 24 24">
      <rect width={props.width} height={props.height} x="11.5" rx="0.5"></rect>
    </SvgIcon>
  )
})

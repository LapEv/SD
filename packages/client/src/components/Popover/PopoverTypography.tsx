import { Typography } from '@mui/material'
import { memo } from 'react'

interface IPopoverTypography {
  text: string
}

export const PopoverTypography = memo(({ text }: IPopoverTypography) => {
  return <Typography className="popoverTypography">{text}</Typography>
})

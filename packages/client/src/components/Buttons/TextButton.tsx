import MuiButton from '@mui/material/Button'
import { memo } from 'react'
import { TButtonProps } from './interfaces'

export const TextButton = memo((props: TButtonProps) => {
  const { sx, ...otherprops } = props

  return (
    <MuiButton variant="text" className="textButton" sx={sx} {...otherprops} />
  )
})

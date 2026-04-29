import IconButton from '@mui/material/IconButton'
import ExpandLess from '@mui/icons-material/ExpandLess'
import { IRotateButton } from './interfaces'
import { memo } from 'react'
import { userRotateStyles } from 'themes/rotateConfig'

export const RotateButton = memo(
  ({ open, handleClick, size, sx }: IRotateButton) => {
    const classes = userRotateStyles()

    return (
      <IconButton
        sx={sx}
        className={`${classes.iconButton} ${open ? 'expanded' : ''}`}
        onClick={handleClick}>
        <ExpandLess sx={{ fontSize: size }} />
      </IconButton>
    )
  },
)

import { Tooltip, IconButton } from '@mui/material'
import { IconButtonTooltipProps } from './interfaces'
import { memo } from 'react'

export const IconToolTipButton = memo(
  ({ onClick, icon, size, sx, title }: IconButtonTooltipProps) => {
    return (
      <Tooltip
        title={title}
        PopperProps={{
          modifiers: [
            {
              name: 'offset',
            },
          ],
        }}>
        <IconButton
          onClick={onClick}
          className="iconTooltipButton"
          size={size ?? 'medium'}
          sx={sx}>
          {icon ?? ''}
        </IconButton>
      </Tooltip>
    )
  },
)

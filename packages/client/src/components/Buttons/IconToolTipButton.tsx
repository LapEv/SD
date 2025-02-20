import { Tooltip, useTheme, IconButton } from '@mui/material'
import { IconButtonTooltipProps } from './interfaces'
import { memo } from 'react'
import { ITheme } from 'themes/themeConfig'

export const IconToolTipButton = memo(
  ({ onClick, icon, size, sx, title }: IconButtonTooltipProps) => {
    const theme = useTheme() as ITheme

    const sxDefault = {
      m: 1,
      mt: 1.5,
      width: theme.fontSize === 'small' ? 30 : 35,
      height: theme.fontSize === 'small' ? 30 : 35,
      borderRadius: '20%',
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      boxShadow: 5,
    }

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
          size={size ?? 'medium'}
          sx={{ ...sxDefault, ...sx }}>
          {icon ?? ''}
        </IconButton>
      </Tooltip>
    )
  },
)

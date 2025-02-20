import ClearIcon from '@mui/icons-material/Clear'
import { useTheme } from '@mui/material'
import { memo } from 'react'
import { IClearIcon } from '../interfaces'
import { ITheme, ThemeMode } from 'themes/themeConfig'

export const ClearIconElement = memo(({ size }: IClearIcon) => {
  const theme = useTheme() as ITheme

  return (
    <ClearIcon
      sx={{
        fontSize: size,
        color:
          theme.palette.mode === ThemeMode.light
            ? (theme as ITheme).colorTheme.colorLight
            : (theme as ITheme).colorTheme.colorDark,
      }}
    />
  )
})

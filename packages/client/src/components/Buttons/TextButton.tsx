import MuiButton from '@mui/material/Button'
import { memo } from 'react'
import { TButtonProps } from './interfaces'
import { useTheme } from '@mui/material'
import { ITheme, ThemeMode } from 'themes/themeConfig'

export const TextButton = memo((props: TButtonProps) => {
  const theme = useTheme() as ITheme
  const { sx, ...otherprops } = props

  const sxprops = {
    color:
      theme.palette.mode === ThemeMode.light
        ? theme.colorTheme.colorDark
        : theme.colorTheme.colorLight,
    ...sx,
  }
  return <MuiButton variant="text" sx={sxprops} {...otherprops} />
})

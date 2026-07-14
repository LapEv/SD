import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { useTheme } from '@mui/material'
import { memo } from 'react'
import { ICalendarIcon } from '../interfaces'
import { ITheme, ThemeMode } from 'themes/themeConfig'

export const CalendarIcon = memo(({ size }: ICalendarIcon) => {
  const theme = useTheme() as ITheme

  return (
    <CalendarMonthIcon
      sx={{
        fontSize: size,
        color:
          theme.palette.mode === ThemeMode.light
            ? (theme as ITheme).colorTheme.light.primary
            : (theme as ITheme).colorTheme.dark.primary,
      }}
    />
  )
})

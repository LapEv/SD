import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, useTheme } from '@mui/material'
import { memo } from 'react'
import { ITheme, ThemeMode } from 'themes/themeConfig'

export const SearchIconElement = memo(() => {
  const theme = useTheme() as ITheme

  return (
    <InputAdornment position="start">
      <SearchIcon
        htmlColor={
          theme.palette.mode === ThemeMode.light
            ? (theme as ITheme).colorTheme.colorLight
            : (theme as ITheme).colorTheme.colorDark
        }
      />
    </InputAdornment>
  )
})

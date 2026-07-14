import { Autocomplete as MuiAutocomplete, styled } from '@mui/material'
import { ITheme, ThemeMode } from 'themes/themeConfig'

export const Autocomplete = styled(MuiAutocomplete)(({ theme }) => ({
  listbox: {
    borderWidth: 1,
    fontWeight: 'normal',
    minHeight: 40,
    maxHeight: 225,
    backgroundColor:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.light.darkPrimary
        : (theme as ITheme).colorTheme.dark.lightPrimary,
  },
  option: {
    color:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.light.primary
        : (theme as ITheme).colorTheme.dark.primary,
    borderColor:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.light.primary
        : (theme as ITheme).colorTheme.dark.primary,
    '& :hover': {
      color:
        theme.palette.mode === ThemeMode.light
          ? (theme as ITheme).colorTheme.light.primary
          : (theme as ITheme).colorTheme.dark.primary,
      fontWeight: 'bold',
    },
  },

  '& input': {
    padding: '0!important',
    paddingLeft: '7px!important',
    paddingRight: '7px!important',
  },
  '.MuiAutocomplete-clearIndicator': {
    color:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.light.primary
        : (theme as ITheme).colorTheme.dark.primary,
    '& .MuiSvgIcon-root': {
      width: 25,
      height: 25,
    },
  },
  '.MuiAutocomplete-popupIndicator': {
    color:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.light.primary
        : (theme as ITheme).colorTheme.dark.primary,
    '.MuiSvgIcon-root': {
      width: 40,
      height: 40,
    },
  },
  '.MuiChip-label': {
    color:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.light.primary
        : (theme as ITheme).colorTheme.dark.primary,
  },
  '.MuiChip-deleteIcon': {
    width: 20,
    height: 20,
    margin: 2,
    color:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.light.primary
        : (theme as ITheme).colorTheme.dark.primary,
  },
}))

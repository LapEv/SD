import { Autocomplete as MuiAutocomplete, styled } from '@mui/material'
import { ITheme, ThemeMode } from 'themes/themeConfig'

export const Autocomplete = styled(MuiAutocomplete)(({ theme }) => ({
  '& input': {
    padding: '0!important',
    paddingLeft: '7px!important',
    paddingRight: '7px!important',
  },
  '.MuiAutocomplete-clearIndicator': {
    color:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.colorLight
        : (theme as ITheme).colorTheme.colorDark,
    '& .MuiSvgIcon-root': {
      width: 25,
      height: 25,
    },
  },
  '.MuiAutocomplete-popupIndicator': {
    color:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.colorLight
        : (theme as ITheme).colorTheme.colorDark,
    '.MuiSvgIcon-root': {
      width: 40,
      height: 40,
    },
  },
  '.MuiChip-label': {
    color:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.colorLight
        : (theme as ITheme).colorTheme.colorDark,
  },
  '.MuiChip-deleteIcon': {
    width: 20,
    height: 20,
    margin: 2,
    color:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.colorLight
        : (theme as ITheme).colorTheme.colorDark,
  },
}))

export const AutocompleteIncidents = styled(MuiAutocomplete)(({ theme }) => ({
  '& input': {
    padding: '0!important',
  },
  '.MuiAutocomplete-input': {
    width: '100%',
  },
  '.MuiAutocomplete-endAdornment': {
    right: '0!important',
  },
  '.MuiAutocomplete-clearIndicator': {
    color:
      theme.palette.mode === ThemeMode.dark
        ? (theme as ITheme).colorTheme.colorLight
        : (theme as ITheme).colorTheme.colorDark,
    '& .MuiSvgIcon-root': {
      width: 15,
      height: 15,
    },
  },
  '.MuiAutocomplete-popupIndicator': {
    color:
      theme.palette.mode === ThemeMode.dark
        ? (theme as ITheme).colorTheme.colorLight
        : (theme as ITheme).colorTheme.colorDark,
    '.MuiSvgIcon-root': {
      width: 28,
      height: 28,
    },
  },
  '.MuiAutocomplete-popper': {
    width: '120%',
  },
}))

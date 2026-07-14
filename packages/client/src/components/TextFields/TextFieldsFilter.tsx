import { TextField as MuiTextField, styled } from '@mui/material'
import { ThemeMode, ITheme } from 'themes/themeConfig'

export const TextFieldsFilter = styled(MuiTextField)(({ theme, sx }) => ({
  height: (theme as ITheme).fontSize === 'small' ? 30 : 40,
  '.MuiStack-root': {
    margin: '0!important',
  },
  '.MuiInputLabel-root': {
    top: (theme as ITheme).fontSize === 'small' ? -9 : -7,
    marginTop: 0,
    fontWeight: 'normal',
    color:
      theme.palette.mode === ThemeMode.dark
        ? (theme as ITheme).colorTheme.dark.lightPrimary
        : (theme as ITheme).colorTheme.light.darkPrimary,
    '&.Mui-focused': {
      top: (theme as ITheme).fontSize === 'small' ? 0 : -1,
      fontWeight: 'bold',
    },
    '&.MuiInputLabel-shrink': {
      top: (theme as ITheme).fontSize === 'small' ? 0 : 0,
    },
  },
  '.MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor:
        theme.palette.mode === ThemeMode.dark
          ? (theme as ITheme).colorTheme.dark.lightPrimary
          : (theme as ITheme).colorTheme.light.darkPrimary,
      borderWidth: 1,
      borderStyle: 'solid',
    },
    '&:hover > fieldset': {
      borderColor:
        theme.palette.mode === ThemeMode.dark
          ? (theme as ITheme).colorTheme.dark.lightPrimary
          : (theme as ITheme).colorTheme.light.darkPrimary,
      borderWidth: 2,
      borderStyle: 'solid',
    },
    '&:focus > fieldset': {
      borderColor:
        theme.palette.mode === ThemeMode.dark
          ? (theme as ITheme).colorTheme.dark.lightPrimary
          : (theme as ITheme).colorTheme.light.darkPrimary,
      borderWidth: 2,
      borderStyle: 'solid',
    },
  },
  '.MuiInputBase-root': {
    ...sx,
    height: (theme as ITheme).fontSize === 'small' ? 30 : 40,
    width: 220,
    borderRadius: 5,
    fontWeight: 'bold',
    backgroundColor:
      theme.palette.mode === ThemeMode.dark
        ? (theme as ITheme).colorTheme.dark.primary
        : (theme as ITheme).colorTheme.light.primary,
    color:
      theme.palette.mode === ThemeMode.dark
        ? (theme as ITheme).colorTheme.dark.lightPrimary
        : (theme as ITheme).colorTheme.light.darkPrimary,
    '&.Mui-focused': {
      '& fieldset': {
        border: `2px solid ${
          theme.palette.mode === ThemeMode.dark
            ? (theme as ITheme).colorTheme.dark.lightPrimary
            : (theme as ITheme).colorTheme.light.darkPrimary
        }! important`,
      },
    },
  },
}))

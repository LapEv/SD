import { TextField as MuiTextField, styled } from '@mui/material'
import { ThemeMode, ITheme } from 'themes/themeConfig'

export const TextFieldIncidents = styled(MuiTextField)(({ theme, sx }) => ({
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
      color:
        theme.palette.mode === ThemeMode.dark
          ? (theme as ITheme).colorTheme.dark.lightPrimary
          : (theme as ITheme).colorTheme.light.darkPrimary,
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
    ...sx,
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
  '.MuiFormHelperText-root': {
    marginTop: 0,
  },
  '.MuiOutlinedInput-input:-webkit-autofill': {
    padding: '0px 14px',
    borderRadius: 0,
    backgroundColor:
      theme.palette.mode === ThemeMode.light
        ? `${(theme as ITheme).colorTheme.light.darkPrimary}!important`
        : `${(theme as ITheme).colorTheme.dark.lightPrimary}!important`,
    WebkitBoxShadow: `0 0 0 100px ${
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.light.primary
        : (theme as ITheme).colorTheme.dark.primary
    } inset`,

    WebkitTextFillColor:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.light.darkPrimary
        : (theme as ITheme).colorTheme.dark.lightPrimary,
  },
}))

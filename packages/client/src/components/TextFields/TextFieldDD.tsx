import { TextField as MuiTextField, styled } from '@mui/material'
import { ITheme, ThemeMode } from 'themes/themeConfig'

export const TextFieldDD = styled(MuiTextField)(({ theme }) => ({
  height: (theme as ITheme).fontSize === 'small' ? 30 : 40,
  '.MuiInputLabel-root': {
    top: 0,
    marginTop: 0,
    fontWeight: 'normal',
    color:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.light.primary
        : (theme as ITheme).colorTheme.dark.primary,
    '&.Mui-focused': {
      top: (theme as ITheme).fontSize === 'small' ? -3 : -7,
    },
  },
  '.MuiInputLabel-root.Mui-error': {
    color: '#ef5350!important',
    marginTop: -1,
    zIndex: 999,
    '&.Mui-focused': {
      top: (theme as ITheme).fontSize === 'small' ? -3 : -7,
    },
  },
  '.MuiInputLabel-root.MuiInputLabel-shrink': {
    color:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.light.darkPrimary
        : (theme as ITheme).colorTheme.dark.lightPrimary,
    top: (theme as ITheme).fontSize === 'small' ? -3 : -7,
  },
  '.MuiInputBase-root': {
    fontWeight: 'normal',
    borderRadius: 5,
    backgroundColor:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.light.darkPrimary
        : (theme as ITheme).colorTheme.dark.lightPrimary,
    color:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.light.secondary
        : (theme as ITheme).colorTheme.dark.secondary,
  },
  '.MuiFormHelperText-root': {
    height: 0,
    marginTop: 0,
  },
  '.MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '.MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
      color: '#FFF',
    },
  },
  '& .MuiOutlinedInput-input.Mui-disabled': {
    backgroundColor:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.light.primary
        : (theme as ITheme).colorTheme.dark.primary,
    WebkitTextFillColor:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.light.darkSecondary
        : (theme as ITheme).colorTheme.dark.lightSecondary,
    borderColor:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.light.secondary
        : (theme as ITheme).colorTheme.dark.secondary,
    cursor: 'text',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor:
      theme.palette.mode === ThemeMode.light
        ? 'rgba(0, 0, 0, 0.86)!important'
        : 'rgba(255, 255, 255, 0.86)!important',
    borderWidth: 2,
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
        ? (theme as ITheme).colorTheme.light.darkPrimary
        : (theme as ITheme).colorTheme.dark.primary
    } inset`,

    WebkitTextFillColor:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.light.secondary
        : (theme as ITheme).colorTheme.dark.secondary,
  },
}))

import { TextField as MuiTextField, styled } from '@mui/material'
import { ThemeMode, ITheme } from 'themes/themeConfig'

export const MultiTextField = styled(MuiTextField)(({ theme }) => ({
  height: (theme as ITheme).fontSize === 'small' ? 30 : 40,
  '.MuiInputLabel-root': {
    top: -7,
    marginTop: 0,
    fontWeight: 'normal',
    color:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.light.primary
        : (theme as ITheme).colorTheme.dark.primary,
  },
  '.MuiInputLabel-root.MuiInputLabel-focused': {
    color:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.light.darkPrimary
        : (theme as ITheme).colorTheme.dark.lightPrimary,
  },
  '.MuiInputLabel-root.Mui-error': {
    color: '#ef5350!important',
    marginTop: -1,
    zIndex: 999,
  },
  '.MuiInputLabel-root.MuiInputLabel-shrink': {
    color:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.light.darkPrimary
        : (theme as ITheme).colorTheme.dark.lightPrimary,
  },
  '.MuiInputBase-root': {
    height: 80,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 5,
    fontWeight: 'normal',
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
    padding: '12px 14px',

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
    padding: '12px 14px',
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

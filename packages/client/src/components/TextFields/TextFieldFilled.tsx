import { TextField as MuiTextField, styled } from '@mui/material'
import { ThemeMode, ITheme } from 'themes/themeConfig'

export const TextFieldFilled = styled(MuiTextField)(({ theme, sx }) => ({
  height: (theme as ITheme).fontSize === 'small' ? 20 : 30,
  marginLeft: 10,
  '.MuiStack-root': {
    margin: '0!important',
  },
  '.MuiFilledInput-root': {
    width: 320,
  },
  '.MuiInputBase-root': {
    fontWeight: 'normal',
    backgroundColor:
      theme.palette.mode === ThemeMode.dark
        ? (theme as ITheme).colorTheme.dark.primary
        : (theme as ITheme).colorTheme.light.primary,
    color:
      theme.palette.mode === ThemeMode.dark
        ? (theme as ITheme).colorTheme.dark.lightPrimary
        : (theme as ITheme).colorTheme.light.darkPrimary,
    '&.Mui-focused': {
      backgroundColor: `${
        theme.palette.mode === ThemeMode.dark
          ? (theme as ITheme).colorTheme.dark.primary
          : (theme as ITheme).colorTheme.light.primary
      }!important`,
    },
    '&:hover': {
      backgroundColor: `${
        theme.palette.mode === ThemeMode.dark
          ? (theme as ITheme).colorTheme.dark.primary
          : (theme as ITheme).colorTheme.light.primary
      }!important`,
    },
    ...sx,
    '& > input': {
      padding: 0,
      marginLeft: '14px',
      marginRight: '14px',
    },
  },
  '.MuiFormHelperText-root': {
    marginTop: 0,
    fontSize: (theme as ITheme).fontSize === 'small' ? 9 : 12,
    height: (theme as ITheme).fontSize === 'small' ? 12 : 15,
    position: 'absolute',
    bottom: -15,
    width: 320,
  },
  '.MuiFilledInput-input:-webkit-autofill': {
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

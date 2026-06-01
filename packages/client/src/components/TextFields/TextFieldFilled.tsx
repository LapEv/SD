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
        ? (theme as ITheme).colorTheme.colorDark
        : (theme as ITheme).colorTheme.colorLight,
    color:
      theme.palette.mode === ThemeMode.dark
        ? (theme as ITheme).colorTheme.colorLight
        : (theme as ITheme).colorTheme.colorDark,
    '&.Mui-focused': {
      backgroundColor: `${
        theme.palette.mode === ThemeMode.dark
          ? (theme as ITheme).colorTheme.colorDark
          : (theme as ITheme).colorTheme.colorLight
      }!important`,
    },
    '&:hover': {
      backgroundColor: `${
        theme.palette.mode === ThemeMode.dark
          ? (theme as ITheme).colorTheme.colorDark
          : (theme as ITheme).colorTheme.colorLight
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
}))

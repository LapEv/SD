import { TextField as MuiTextField, styled } from '@mui/material'
import { ThemeMode, ITheme } from 'themes/themeConfig'

export const MultiTextFieldIncident = styled(MuiTextField)(({ theme, sx }) => ({
  '.MuiStack-root': {
    margin: '0!important',
  },
  '.MuiInputLabel-root': {
    top: (theme as ITheme).fontSize === 'small' ? -9 : -7,
    marginTop: 0,
    fontWeight: 'normal',
    color:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.light.primary
        : (theme as ITheme).colorTheme.dark.primary,
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
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontWeight: 'normal',
    borderRadius: 5,
    padding: '5px 10px',
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
    height: 0,
    marginTop: 0,
  },
  '.MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '.MuiOutlinedInput-root': {
    height: '100%',
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
      borderWidth: 5,
      borderStyle: 'solid',
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
      theme.palette.mode === ThemeMode.dark
        ? (theme as ITheme).colorTheme.dark.lightPrimary
        : (theme as ITheme).colorTheme.light.darkPrimary,
    borderWidth: 2,
    borderStyle: 'solid',
  },
  '.MuiOutlinedInput-input:-webkit-autofill': {
    padding: '5px 10px',
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

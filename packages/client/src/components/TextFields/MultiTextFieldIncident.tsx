import { TextField as MuiTextField, styled } from '@mui/material'
import { ThemeMode, ITheme } from 'themes/themeConfig'

export const MultiTextFieldIncident = styled(MuiTextField)(({ theme }) => ({
  '.MuiInputLabel-root': {
    top: -7,
    marginTop: 0,
    fontWeight: 'normal',
    color:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.colorLight
        : (theme as ITheme).colorTheme.colorDark,
  },
  '.MuiInputLabel-root.MuiInputLabel-focused': {
    color:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.colorDark
        : (theme as ITheme).colorTheme.colorLight,
  },
  '.MuiInputLabel-root.Mui-error': {
    color: '#ef5350!important',
    marginTop: -1,
    zIndex: 999,
  },
  '.MuiInputLabel-root.MuiInputLabel-shrink': {
    color:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.colorDark
        : (theme as ITheme).colorTheme.colorLight,
  },
  '.MuiInputBase-root': {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontWeight: 'normal',
    borderRadius: 5,
    backgroundColor:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.colorDark
        : (theme as ITheme).colorTheme.colorLight,
    color: theme.palette.mode === ThemeMode.light ? '#FFFFFF' : '#000000',
    '&::-webkit-scrollbar': {
      backgroundColor: '#2b2b2b',
      borderRadius: 8,
      width: 'thin',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 8,
      backgroundColor: '#6b6b6b',
      minHeight: 24,
      border: '3px solid #2b2b2b',
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
    padding: '5px 10px',
    fontSize: '0.775rem',
    minHeight: 75,
    '&::-webkit-scrollbar': {
      backgroundColor: '#2b2b2b',
      borderRadius: 8,
      width: 'thin',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 8,
      backgroundColor: '#6b6b6b',
      minHeight: 24,
      border: '3px solid #2b2b2b',
    },

    '& fieldset': {
      border: 'none',
      color: '#FFF',
    },
  },
  '& .MuiOutlinedInput-input.Mui-disabled': {
    backgroundColor:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.colorLight
        : (theme as ITheme).colorTheme.colorDark,
    WebkitTextFillColor:
      theme.palette.mode === ThemeMode.light
        ? 'rgba(0,0,0,1)'
        : 'rgba(255,255,255,1)',
    borderColor: theme.palette.mode === ThemeMode.light ? '#FFF' : '#000',
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
    padding: '5px 10px',
    borderRadius: 0,
    backgroundColor:
      theme.palette.mode === ThemeMode.light
        ? `${(theme as ITheme).colorTheme.colorDark}!important`
        : `${(theme as ITheme).colorTheme.colorLight}!important`,
    WebkitBoxShadow: `0 0 0 100px ${
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.colorDark
        : (theme as ITheme).colorTheme.colorLight
    } inset`,
    WebkitTextFillColor:
      theme.palette.mode === ThemeMode.light ? '#FFFFFF' : '#000000',
  },
}))

import { ThemeOptions, createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

export const theme = createTheme({
  typography: {
    fontFamily: 'Raleway',
    button: {
      textTransform: 'none',
    },
  },
  palette: {
    text: {
      primary: '#FFFFFF',
    },
    green: {
      [64]: '#1E515D',
      dark: '#7AB3A2',
    },
    background: {
      default: '#C1EEE1',
      paper: '#92CCBB',
      btn: '#7AB3A2',
    },
    primary: {
      main: '#def0eb',
      contrastText: '#1E515D',
    },
    secondary: {
      main: '#1E515D',
    },
    error: {
      main: red[400],
      height: 20,
    },
    input: {
      main: '#1E515D',
    },
  },
} as ThemeOptions)

import { Theme, ThemeOptions } from '@mui/material/styles'
import { red } from '@mui/material/colors'
import { PaletteMode } from '@mui/material'
import { IColorTheme } from 'storeAuth/interfaces'

export const ThemeMode = {
  light: 'light',
  dark: 'dark',
}

export const ThemeColor = {
  light: '#C1EEE1',
  dark: '#1E515D',
}

interface ThemeModeProps {
  mode: PaletteMode
  fontSize: string
  colorTheme: IColorTheme
}

export interface ITheme extends Theme {
  fontSize: string
  colorTheme: IColorTheme
}

export const ThemeConfig = ({ mode, fontSize, colorTheme }: ThemeModeProps) =>
  ({
    fontSize,
    colorTheme,
    typography: {
      fontFamily: 'Raleway',
      fontSize: fontSize === 'small' ? 12 : 16,
      color: mode === ThemeMode.light ? '#000000' : '#FFFFFF',
      button: {
        textTransform: 'none',
        fontSize: fontSize === 'small' ? 11 : 15,
        fontWeight: 'bold',
      },
      body1: {
        fontSize: fontSize === 'small' ? 12 : 16,
        fontWeight: 'bold',
        color: mode === ThemeMode.light ? '#000000' : '#FFFFFF',
      },
      body2: {
        fontSize: fontSize === 'small' ? 11 : 15,
        fontWeight: 'bold',
        color: mode === ThemeMode.light ? '#000000' : '#FFFFFF',
      },
      h6: {
        fontSize: fontSize === 'small' ? 24 : 32,
        fontWeight: 'bold',
        color: mode === ThemeMode.light ? '#000000' : '#FFFFFF',
      },
      h5: {
        fontSize: fontSize === 'small' ? 22 : 30,
        fontWeight: 'bold',
        color: mode === ThemeMode.light ? '#000000' : '#FFFFFF',
      },
      h4: {
        fontSize: fontSize === 'small' ? 20 : 28,
        fontWeight: 'bold',
        color: mode === ThemeMode.light ? '#000000' : '#FFFFFF',
      },
      h3: {
        fontSize: fontSize === 'small' ? 18 : 26,
        fontWeight: 'bold',
        color: mode === ThemeMode.light ? '#000000' : '#FFFFFF',
      },
      h2: {
        fontSize: fontSize === 'small' ? 16 : 24,
        fontWeight: 'bold',
        color: mode === ThemeMode.light ? '#000000' : '#FFFFFF',
      },
      h1: {
        fontSize: fontSize === 'small' ? 14 : 22,
        fontWeight: 'bold',
        color: mode === ThemeMode.light ? '#000000' : '#FFFFFF',
      },
      // subtitle1: {
      //   fontSize,
      //   fontWeight: 'bold',
      //   color: mode === ThemeMode.light ? colorTheme.colorLight : '#FFFFFF',
      // },
      subtitle2: {
        fontSize: fontSize === 'small' ? 11 : 15,
        color: mode === ThemeMode.light ? '#000000' : '#FFFFFF',
      },
    },
    spacing: fontSize === 'large' ? 8 : 4,
    palette: {
      mode,
      ...(mode === ThemeMode.light
        ? {
            text: {
              primary: '#000000',
              secondary: colorTheme.colorDark,
            },
            green: {
              [64]: colorTheme.colorDark,
              dark: '#7AB3A2',
            },
            icon: {
              default: colorTheme.colorLight,
              secondary: '#def0eb',
            },
            background: {
              default: colorTheme.colorLight,
              paper: colorTheme.colorLight,
              btn: '#7AB3A2',
            },
            primary: {
              main: colorTheme.colorLight,
              contrastText: colorTheme.colorDark,
            },
            secondary: {
              main: colorTheme.colorLight,
              light: 'rgba(33,127,100,0.5)',
            },
            error: {
              main: red[400],
              height: 20,
            },
            input: {
              main: colorTheme.colorLight,
            },
            border: {
              default: '#000000',
            },
            info: {
              main: 'rgba(30,81,93,0.2)',
            },
          }
        : {
            text: {
              primary: '#FFFFFF',
              secondary: colorTheme.colorLight,
            },
            green: {
              [64]: colorTheme.colorLight,
              dark: '#7AB3A2',
            },
            icon: {
              default: colorTheme.colorDark,
              secondary: '#def0eb',
            },
            background: {
              default: colorTheme.colorDark,
              paper: colorTheme.colorDark,
              btn: '#7AB3A2',
            },
            primary: {
              main: colorTheme.colorDark,
              contrastText: colorTheme.colorLight,
            },
            secondary: {
              main: colorTheme.colorDark,
              light: 'rgba(33,127,100,0.5)',
            },
            error: {
              main: red[400],
              height: 20,
            },
            input: {
              main: colorTheme.colorDark,
            },
            border: {
              default: '#FFFFFF',
            },
            info: {
              main: 'rgba(193,238,225,0.2)',
            },
          }),
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            height: fontSize === 'small' ? 30 : 40,
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            height: fontSize === 'small' ? 40 : 50,
          },
        },
      },

      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: '0!important',
            paddingRight: '0!important',
            maxWidth: '100%!important',
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            '.MuiSvgIcon-root': {
              color:
                mode === ThemeMode.light
                  ? colorTheme.colorDark
                  : colorTheme.colorLight,
            },
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            '& .MuiAlert-icon': {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            },
            '& .MuiAlert-message': {
              fontWeight: 'bold',
            },
            '& .MuiAlert-standard': {
              backgroundColor:
                mode === ThemeMode.light
                  ? colorTheme.colorDark
                  : colorTheme.colorLight,
            },
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            scrollbarColor: '#6b6b6b #2b2b2b',
            scrollbarWidth: 'thin',
          },
          body: {
            scrollbarColor: '#6b6b6b #2b2b2b',
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
              backgroundColor: '#2b2b2b',
              borderRadius: 8,
            },
            '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
              borderRadius: 8,
              backgroundColor: '#6b6b6b',
              minHeight: 24,
              border: '3px solid #2b2b2b',
            },
            '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus':
              {
                backgroundColor: '#959595',
              },
            '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active':
              {
                backgroundColor: '#959595',
              },
            '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
              {
                backgroundColor: '#959595',
              },
            '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
              backgroundColor: '#2b2b2b',
            },
          },
        },
      },
    },
  }) as ThemeOptions

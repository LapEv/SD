import { useTheme } from '@mui/material'
import { ITheme, ThemeMode } from './themeConfig'
import GlobalStyles from '@mui/material/GlobalStyles'

export const GlobalStyle = () => {
  const theme = useTheme() as ITheme
  return (
    <GlobalStyles
      styles={{
        '&::-webkit-scrollbar': {
          width: 8,
          height: 8,
          background: 'transparent',
        },
        '&::-webkit-scrollbar-track': {
          background:
            theme.palette.mode === ThemeMode.light ? ' #2b2b2b' : ' #2b2b2b',
          borderRadius: 0,
        },
        '&::-webkit-scrollbar-thumb': {
          background:
            theme.palette.mode === ThemeMode.light ? ' #6b6b6b' : ' #6b6b6b',
          borderRadius: 15,
          border: '2px solid #2b2b2b',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background:
            theme.palette.mode === ThemeMode.light ? ' #959595' : ' #959595',
          cursor: 'pointer',
          border: '0px solid #2b2b2b',
        },
        '&::-webkit-scrollbar-corner': {
          background:
            theme.palette.mode === ThemeMode.light ? ' #2b2b2b' : ' #2b2b2b',
        },
        'input:-webkit-autofill': {
          WebkitBoxShadow: `0 0 0 50px ${
            theme.palette.mode === ThemeMode.dark
              ? theme.colorTheme.colorDark
              : theme.colorTheme.colorLight
          } inset`,
          WebkitTextFillColor:
            theme.palette.mode === ThemeMode.light
              ? theme.colorTheme.colorDark
              : theme.colorTheme.colorLight,
        },
        'input[type=number]::-webkit-inner-spin-button': {
          WebkitAppearance: 'none',
          // cursor: 'pointer',
          // display: 'block',
          // width: '8px',
          // color:
          //   theme.palette.mode === ThemeMode.light
          //     ? theme.colorTheme.colorDark
          //     : theme.colorTheme.colorLight,
          // textAlign: 'center',
          // position: 'relative',
        },
        'input[type=number]:hover::-webkit-inner-spin-button': {
          // background:
          //   "#eee url('https://i.sstatic.net/YYySO.png') no-repeat 50% 50%",
          // width: 14,
          // height: 14,
          // padding: 4,
          // position: 'relative',
          // right: 4,
          // borderRadius: 28,
        },
      }}
    />
  )
}

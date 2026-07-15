import { useEffect, useMemo, useState } from 'react'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { ThemeConfig } from './themeConfig'
import App from '../App'
import { useAuth } from 'hooks/auth/useAuth'
import { useTableINC } from 'hooks/tableINC/useTableINC'
import { GlobalStyle } from './GlobalStyle'
import { useApp } from 'hooks/app/useApp'

export default function ToggleColorMode() {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const [fontSize, setFontSize] = useState<string>('large')
  const [settings] = useTableINC()
  const [{ device }] = useApp()

  const [{ user, colorTheme }] = useAuth()

  useEffect(() => {
    setMode(user.appOptions?.theme ?? 'light')
  }, [user.appOptions?.theme])

  useEffect(() => {
    setFontSize(user.appOptions?.font ?? 'large')
  }, [user.appOptions?.font])

  // useEffect(() => {
  //   setColorTheme(user.appOptions?.colorTheme ?? {colorLight: '#1E515D', colorDark: '#C1EEE1'})
  // }, [user.appOptions?.colorTheme])

  const theme = useMemo(
    () =>
      createTheme(
        ThemeConfig({ mode, fontSize, colorTheme, settings, device }),
      ),
    [mode, fontSize, colorTheme, settings, device],
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <App />
    </ThemeProvider>
  )
}

import { Container, Stack } from '@mui/material'
import { memo } from 'react'
import { MenuData } from './MenuData'
import { useAuth } from 'hooks/auth/useAuth'

export const MainPage = memo(() => {
  const [{ user }] = useAuth()

  return (
    <Container component="main" className="mainPage">
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 10, sm: 2, md: 5 }}
        padding={8}
        className="mainPageListBox">
        {<MenuData user={user} />}
      </Stack>
    </Container>
  )
})

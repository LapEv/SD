import { Container, Stack } from '@mui/material'
import { memo } from 'react'
import { MenuData } from './MenuData'
import { useAuth } from 'hooks/auth/useAuth'

export const MainPage = memo(() => {
  const [{ user }] = useAuth()

  return (
    <Container
      component="main"
      maxWidth="md"
      className={'mainHeaderForMainPages'}>
      <Stack className="mainPageListBox">{<MenuData user={user} />}</Stack>
    </Container>
  )
})

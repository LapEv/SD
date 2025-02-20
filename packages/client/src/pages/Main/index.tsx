import { Box, Container } from '@mui/material'
import { memo } from 'react'

export const MainPage = memo(() => {
  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}></Box>
    </Container>
  )
})

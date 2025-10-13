import { Box, Container } from '@mui/material'
import { memo } from 'react'

export const IncidentsConfirmPage = memo(() => {
  return (
    <Container component="main" maxWidth="md">
      <Box
        bgcolor="background.paper"
        sx={{
          display: 'flex',
          borderRadius: 2,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          my: 10,
          borderWidth: 2,
          borderBlockColor: 'icon.default',
          borderStyle: 'solid',
          p: 3,
        }}>
        IncidentsConfirmPage
      </Box>
    </Container>
  )
})

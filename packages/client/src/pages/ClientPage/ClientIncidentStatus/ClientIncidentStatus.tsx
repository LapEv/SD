import { Container, Typography } from '@mui/material'
import { MuiDiv } from 'components/MUI'
import { memo } from 'react'

export const ClientIncidentStatus = memo(() => {
  return (
    <Container component="main" maxWidth="md" className={'mainHeaderForPages'}>
      <MuiDiv className={'headerForPages'}>
        <Typography variant="h6">IncidentStatus</Typography>
      </MuiDiv>
      IncidentStatus
    </Container>
  )
})

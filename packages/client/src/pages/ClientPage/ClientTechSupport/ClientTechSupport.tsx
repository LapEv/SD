import { Container, Typography } from '@mui/material'
import { MuiDiv } from 'components/MUI'
import { memo } from 'react'

export const ClientTechSupport = memo(() => {
  return (
    <Container component="main" maxWidth="md" className={'mainHeaderForPages'}>
      <MuiDiv className={'headerForPages'}>
        <Typography variant="h6">TechSupport</Typography>
      </MuiDiv>
      TechSupport
    </Container>
  )
})

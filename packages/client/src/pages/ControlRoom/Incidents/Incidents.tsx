import { memo } from 'react'
import { Container } from '@mui/material'
import { TableIncidents } from './TableIncidents'
import { CustomToolbar } from './components/CustomToolbar'
import { MUIModal } from './Modals/MUIModal'
import { MuiDiv } from 'components/MUI'
import { INCFooter } from './INCFooter'

export const IncidentsPage = memo(() => {
  return (
    <Container component="main" maxWidth="md" className={'mainHeaderForPages'}>
      <MuiDiv className={'mainTableStyle'}>
        <MUIModal />
        <MuiDiv className={'tableBorder'}>
          <CustomToolbar />
          <TableIncidents />
          <INCFooter />
        </MuiDiv>
      </MuiDiv>
    </Container>
  )
})

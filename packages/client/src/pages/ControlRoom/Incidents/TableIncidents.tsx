import { useEffect, memo } from 'react'
import { useIncidents } from 'hooks/incidents/useINC'
import { Table, TableContainer } from '@mui/material'
import { useAuth } from 'hooks/auth/useAuth'
import { INCHeader } from './INCHeader'
import { INCBody } from './INCBody'
import { useTableINC } from 'hooks/tableINC/useTableINC'
import { MuiDiv } from 'components/MUI'
import { getInitialSettings } from './Utils/GetInitialSettings'

export const TableIncidents = memo(() => {
  const [
    ,
    { getINCsByDate, getINC, getIncidentStatuses, getTypesCompletedWork },
  ] = useIncidents()
  const [{ dense }, { setSettings }] = useTableINC()
  const [, { getFieldEngineers, getDispatchers }] = useAuth()

  useEffect(() => {
    getFieldEngineers()
    getDispatchers()
    getIncidentStatuses()
    getTypesCompletedWork()
    const settingsStorage = getInitialSettings()
    setSettings(settingsStorage)
    const currentDate = new Date()
    const endDate = currentDate.setDate(
      currentDate.getDate() - settingsStorage.timeInterval,
    )
    if (settingsStorage.timeInterval === 0) {
      getINC()
      return
    }
    getINCsByDate(new Date(endDate))
  }, [])

  return (
    <MuiDiv className={'tableContainer'}>
      <TableContainer sx={{ height: '100%' }}>
        <Table
          stickyHeader
          aria-label="sticky table"
          sx={{ minWidth: 750 }}
          aria-labelledby="Incidents"
          size={dense ? 'small' : 'medium'}>
          <INCHeader />
          <INCBody />
        </Table>
      </TableContainer>
    </MuiDiv>
  )
})

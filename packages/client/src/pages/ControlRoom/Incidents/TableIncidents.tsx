import { useEffect, memo } from 'react'
import { useIncidents } from 'hooks/incidents/useINC'
import { Table, TableContainer } from '@mui/material'
import { useAuth } from 'hooks/auth/useAuth'
import { INCHeader } from './INCHeader'
import { INCBody } from './INCBody'
import { useTableINC } from 'hooks/tableINC/useTableINC'
import { getInitialSettings, GetEndDate } from 'pages/ControlRoom/Incidents'
import { MuiDiv } from 'components/MUI'
import { io } from 'socket.io-client'
import { baseURL } from 'api/config'
import { useMessage } from 'hooks/message/useMessage'

export const TableIncidents = memo(() => {
  const [
    ,
    {
      getINCsByDate,
      getINC,
      getIncidentStatuses,
      getTypesCompletedWork,
      changeExecutorSocket,
      changeResponsibleSocket,
      changeStatusSocket,
      newINCSocket,
      newINCfromMailSocket,
    },
  ] = useIncidents()
  const [{ dense }, { setSettings }] = useTableINC()
  const [, { getFieldEngineers, getDispatchers }] = useAuth()
  const [, { setMessage }] = useMessage()

  useEffect(() => {
    getFieldEngineers()
    getDispatchers()
    getIncidentStatuses()
    getTypesCompletedWork()
    const settingsStorage = getInitialSettings()
    setSettings(settingsStorage)
    if (settingsStorage.timeInterval === 0) {
      getINC()
    } else {
      const endDate = GetEndDate(settingsStorage)
      getINCsByDate(new Date(endDate))
    }

    const socket = io(baseURL, { transports: ['websocket'] })
    socket.on('server_SBI', ({ token, category, action, data }) => {
      const localToken = localStorage.getItem('token')
      if (localToken === token) return

      if (category === 'incidents') {
        const { notificationsINC } = getInitialSettings()
        if (action === 'changeExecutor') {
          changeExecutorSocket(data)
          if (notificationsINC.changeExecutor) {
            setMessage({
              text: `Для инцидента ${data.incident} изменен исполнитель ${data.executor}`,
              type: 'info',
            })
          }
        }
        if (action === 'changeResponsible') {
          changeResponsibleSocket(data)
          if (notificationsINC.changeResponsible) {
            setMessage({
              text: `Для инцидента ${data.incident} изменен ответственный ${data.responsible}`,
              type: 'info',
            })
          }
        }
        if (action === 'changeStatus') {
          changeStatusSocket(data)
          if (notificationsINC.changeStatus) {
            setMessage({
              text: `Для инцидента ${data._incident} изменен статус ${data.status}`,
              type: 'info',
            })
          }
        }
        if (action === 'newINC') {
          newINCSocket(data)
          if (notificationsINC.newINC) {
            setMessage({
              text: `Зарегистрирован новый инцидент ${data.incident}`,
              type: 'info',
            })
          }
        }
        if (action === 'newINCfromMail') {
          newINCfromMailSocket(data)
          if (notificationsINC.newINCfromMail) {
            setMessage({
              text: `Зарегистрирован новый инцидент ${data.incident} с почтового сервера`,
              type: 'info',
            })
          }
        }
      }
    })
    return () => {
      socket.close()
    }
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

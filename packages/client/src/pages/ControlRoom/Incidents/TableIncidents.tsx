import { useEffect, memo } from 'react'
import { useIncidents } from 'hooks/incidents/useINC'
import { Table, TableContainer } from '@mui/material'
import { useAuth } from 'hooks/auth/useAuth'
import { INCHeader } from './INCHeader'
import { INCBody } from './INCBody'
import { useTableINC } from 'hooks/tableINC/useTableINC'
import {
  getInitialSettings,
  GetEndDate,
  GetStoredData,
} from 'pages/ControlRoom/Incidents'
import { MuiDiv } from 'components/MUI'
import { io } from 'socket.io-client'
import { baseURL } from 'api/config'
import { useMessage } from 'hooks/message/useMessage'
import { useFiles } from 'hooks/files/useFiles'
import { createINC } from 'store/slices/incidents'

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
      changeINCSocket,
      newINCSocket,
      newINCfromMailSocket,
    },
  ] = useIncidents()
  const [, { checkViewFiles }] = useFiles()

  const [{ dense, toCloud }, { setSettings, setToCloud }] = useTableINC()
  const [
    { user },
    { getFieldEngineers, getDispatchers, changeUserAppOptions },
  ] = useAuth()
  const [, { setMessage }] = useMessage()

  useEffect(() => {
    if (toCloud) {
      const storedData = GetStoredData()
      if (!storedData) return
      const appOptions = {
        ...user.appOptions,
        dispatcherOptions: storedData,
      }
      changeUserAppOptions({ id: user.id as string, appOptions })
      setToCloud(false)
    }
  }, [toCloud])

  useEffect(() => {
    getFieldEngineers()
    getDispatchers()
    getIncidentStatuses()
    getTypesCompletedWork()
    const settingsStorage = getInitialSettings(
      user.appOptions?.dispatcherOptions,
    )
    setSettings(settingsStorage)
    if (settingsStorage.timeInterval === 0) {
      getINC()
    } else {
      const endDate = GetEndDate(settingsStorage)
      getINCsByDate(new Date(endDate))
    }

    const socket = io(baseURL, { transports: ['websocket'] })
    socket.on('server_SD', ({ token, category, action, data }) => {
      const localToken = localStorage.getItem('token')
      if (localToken === token) return

      if (category === 'incidents') {
        const { notificationsINC } = getInitialSettings(
          user.appOptions?.dispatcherOptions,
        )
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
          changeINCSocket(data)
          const _data = createINC(data)
          checkViewFiles({ id: data.id, files: _data.files ?? _data.Files })
          if (notificationsINC.changeStatus) {
            setMessage({
              text: `Для инцидента ${data._incident ?? data.incident} изменен статус ${data.status}`,
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
        if (action === 'changeINC') {
          changeINCSocket(data)
          if (notificationsINC.changeINC) {
            setMessage({
              text: `Изменен инцидент ${data.incident}`,
              type: 'info',
            })
          }
        }
        if (action === 'changeINCAddFiles') {
          const _data = createINC(data)
          changeINCSocket(data)
          checkViewFiles({ id: data.id, files: _data.files ?? _data.Files })
          if (notificationsINC.changeINCAddFiles) {
            setMessage({
              text: `Изменены акты для инцидента ${_data.incident}`,
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

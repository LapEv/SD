import { Container, List, Typography } from '@mui/material'
import { MuiDiv } from 'components/MUI'
import { useAuth } from 'hooks/auth/useAuth'
import { useIncidents } from 'hooks/incidents/useINC'
import { memo, useEffect } from 'react'
import { MenuEngineer } from './Menu/MenuEngineer'
import { INC } from 'store/slices/incidents/interfaces'
import { IncidentData } from './IncidentData'
import { useEngineer } from 'hooks/engineer/useEngineer'
import { GetInitialSettings } from './Utils/GetInitialSettings'
import { GetEndDate } from './Utils/GetEndDate'
import { GetStoredData } from './Utils/GetStoredData'
import { useFilteredSortedDataByArray } from 'hooks/useFilteredSortedDataByArray'
import { io } from 'socket.io-client'
import { baseURL } from 'api/config'
import { useMessage } from 'hooks/message/useMessage'

export const EngineerPage = memo(() => {
  const [{ incStatuses }, { getIncidentStatuses }] = useIncidents()
  const [
    { incs, filterEngineerStatus, sortEngineerStatus, toCloud },
    {
      getINCsByFieldEngineer,
      setToCloud,
      setFilterStatus,
      setTimeInterval,
      changeStatus,
      getINCbyID,
      clearINC,
      changeFilterStatus,
    },
  ] = useEngineer()
  const [{ user }, { changeUserAppOptionsNoMessage }] = useAuth()
  const [, { setMessage }] = useMessage()
  const filtered = useFilteredSortedDataByArray<INC>(
    incs,
    filterEngineerStatus,
    'id_incStatus',
    sortEngineerStatus.orderBy,
    sortEngineerStatus.order,
  )

  useEffect(() => {
    const settingsStorage = GetInitialSettings(user.appOptions?.engineerOptions)
    const endDate = GetEndDate(settingsStorage)
    setFilterStatus(settingsStorage.filterEngineerStatus)
    setTimeInterval(settingsStorage.timeInterval)
    getINCsByFieldEngineer({
      id: user.id as string,
      endDate: new Date(endDate),
    })
    getIncidentStatuses()

    const socket = io(baseURL, { transports: ['websocket'] })
    socket.on('server_SBI', ({ token, category, action, data }) => {
      const localToken = localStorage.getItem('token')
      if (localToken === token) return

      if (category === 'incidents' && data.id_incExecutor === user.id) {
        if (action === 'changeStatus') {
          if (data.status === 'В работе') {
            changeStatus(data)
            setMessage({
              text: `Вам назначен инцидент ${data._incident ?? data.incident}`,
              type: 'info',
            })
          }
          if (data.status === 'Решён') {
            changeStatus(data)
            setMessage({
              text: `Инцидент ${data._incident ?? data.incident} переведён в статус "Решён"`,
              type: 'info',
            })
          }
          if (data.status === 'Закрыт') {
            changeStatus(data)
          }
        }
        if (action === 'changeExecutor') {
          console.log('setExecutor')
          getINCbyID({
            id: data.id as string,
          })
          setMessage({
            text: `Вам назначен инцидент ${data._incident ?? data.incident}`,
            type: 'info',
          })
        }
      }
      if (
        category === 'incidents' &&
        data.id_incExecutor !== user.id &&
        action === 'changeExecutor'
      ) {
        const isINC = incs.find(({ id }) => data.id === id)
        if (isINC) {
          clearINC(data.id)
          setMessage({
            text: `Инцидент ${data._incident ?? data.incident} больше не на вас!`,
            type: 'info',
          })
        }
      }
    })
    return () => {
      socket.close()
    }
  }, [])

  useEffect(() => {
    if (!filterEngineerStatus.length) {
      const defaultFilter = incStatuses.find(
        ({ statusINC }) => statusINC === 'В работе',
      )
      if (defaultFilter && defaultFilter.id) {
        changeFilterStatus([defaultFilter?.id as string])
      }
    }
  }, [incStatuses])

  useEffect(() => {
    if (toCloud) {
      const storedData = GetStoredData()
      if (!storedData) return
      const appOptions = {
        ...user.appOptions,
        engineerOptions: storedData,
      }
      changeUserAppOptionsNoMessage({ id: user.id as string, appOptions })
      setToCloud(false)
    }
  }, [toCloud])

  return (
    <Container component="main" maxWidth="md" className={'mainHeaderForPages'}>
      <MuiDiv className={'headerForPages'}>
        <Typography variant="h6">Инженерская</Typography>
      </MuiDiv>
      <MenuEngineer filtered={filtered} />
      <List className={'pageListContainer engineerContainer'}>
        {filtered.map(item => (
          <IncidentData item={item} key={`${item.id}`} />
        ))}
      </List>
    </Container>
  )
})

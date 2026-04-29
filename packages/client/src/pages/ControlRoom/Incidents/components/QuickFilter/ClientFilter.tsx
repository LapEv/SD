import { Collapse, ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import {
  columnData,
  empty_INCClients,
  operators,
  SETTINGS_DEFAULT,
} from '../../data'
import { useTableINC } from 'hooks/tableINC/useTableINC'
import { useEffect, useState } from 'react'
import { Check, ExpandLess, ExpandMore } from '@mui/icons-material'
import { I_INCClients, INC_HeadCell } from '../../interfaces'
import {
  ILogicOperator,
  ILogicOperatorLabel,
} from 'store/slices/tableINC/interfaces'
import { useMessage } from 'hooks/message/useMessage'
import { useClients } from 'hooks/clients/useClients'

export const ClientFilter = () => {
  const [, { setMessage }] = useMessage()
  const [{ filterListOptions }, { setFilterListOptions }] = useTableINC()
  const [{ clients }, { getClients }] = useClients()
  const [openClientINCs, setOpenClientINCs] = useState<boolean>(false)
  const [_incClients, setINCClients] =
    useState<I_INCClients[]>(empty_INCClients)

  const setIncClientFilter = ({
    idFilter,
    filterStatus,
    client,
    id,
  }: I_INCClients) => {
    if (!filterStatus && filterListOptions.length >= 5) {
      setMessage({
        text: 'Лимит фильтра не более 5!',
        type: 'warning',
      })
      return
    }
    const newINCClients = _incClients.map(item =>
      item.id === id ? { ...item, filterStatus: !item.filterStatus } : item,
    )
    setINCClients(newINCClients)
    if (filterStatus) {
      if (filterListOptions.length === 1) {
        setFilterListOptions(SETTINGS_DEFAULT.filterListOptions)
        return
      }
      const newFilter = filterListOptions.filter(
        filter => filter.id !== idFilter && filter.value !== client,
      )
      setFilterListOptions(newFilter)
      return
    }
    const clientData = columnData.find(
      ({ id }) => id === 'client',
    ) as INC_HeadCell
    const filter = {
      column: 'client',
      columnLabel: clientData.label,
      columnType: clientData.type,
      needValue: true,
      operator: operators[2].operator,
      operatorLabel: operators[2].operatorLabel,
      logicOperator: ILogicOperator.or,
      logicOperatorLabel: ILogicOperatorLabel.or,
      id: filterListOptions.length + 1,
      value: client,
    }
    const newFilter = [...filterListOptions, filter]
    setFilterListOptions(newFilter)
  }

  useEffect(() => {
    setINCClients(
      clients
        .map(({ client, id }) => {
          const isFiltered = filterListOptions.find(
            ({ column, value }) => column === 'client' && value === client,
          )
          return {
            client: client as string,
            id: id as string,
            filterStatus: isFiltered ? true : false,
            idFilter: isFiltered ? isFiltered.id : 0,
          }
        })
        .filter(
          (obj, index, arr) => index === arr.findIndex(o => o.id === obj.id),
        ),
    )
  }, [clients, filterListOptions])

  useEffect(() => {
    if (!clients.length) {
      getClients()
    }
  }, [])

  return (
    <>
      <MenuItem
        className={'quickFilterpaper'}
        onClick={() => setOpenClientINCs(!openClientINCs)}>
        <ListItemText>Клиенты</ListItemText>
        {openClientINCs ? <ExpandLess /> : <ExpandMore />}
      </MenuItem>
      <Collapse
        in={openClientINCs}
        timeout="auto"
        unmountOnExit
        className="collapseQuickFilter">
        {_incClients.map(({ client, idFilter, filterStatus, id }) => (
          <MenuItem
            key={`${id}`}
            sx={{ pl: 4 }}
            onClick={() =>
              setIncClientFilter({ idFilter, filterStatus, client, id })
            }>
            <ListItemIcon>
              {filterStatus && <Check fontSize="small" />}
            </ListItemIcon>
            <ListItemText className={'quickFilterText'} primary={client} />
          </MenuItem>
        ))}
      </Collapse>
    </>
  )
}

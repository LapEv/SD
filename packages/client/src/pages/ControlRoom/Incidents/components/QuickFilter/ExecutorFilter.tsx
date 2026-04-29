import { Collapse, ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import {
  columnData,
  empty_INCExecutor,
  emptyExecutor,
  operators,
  SETTINGS_DEFAULT,
} from '../../data'
import { useTableINC } from 'hooks/tableINC/useTableINC'
import { useEffect, useState } from 'react'
import { Check, ExpandLess, ExpandMore } from '@mui/icons-material'
import { useIncidents } from 'hooks/incidents/useINC'
import { I_INCExecutor, INC_HeadCell } from '../../interfaces'
import {
  ILogicOperator,
  ILogicOperatorLabel,
} from 'store/slices/tableINC/interfaces'
import { useMessage } from 'hooks/message/useMessage'
import { useAuth } from 'hooks/auth/useAuth'

export const ExecutorFilter = () => {
  const [, { setMessage }] = useMessage()
  const [{ filterListOptions }, { setFilterListOptions }] = useTableINC()
  const [{ fieldEngineers, dispatchers }] = useAuth()
  const [{ incidents }] = useIncidents()
  const [openStatusINCs, setOpenStatusINCs] = useState<boolean>(false)
  const [_executors, setExecutors] =
    useState<I_INCExecutor[]>(empty_INCExecutor)

  const setIncStatusFilter = ({
    idFilter,
    filterStatus,
    shortName,
    id,
  }: I_INCExecutor) => {
    if (!filterStatus && filterListOptions.length >= 5) {
      setMessage({
        text: 'Лимит фильтра не более 5!',
        type: 'warning',
      })
      return
    }
    const newExecutors = _executors.map(item =>
      item.id === id ? { ...item, filterStatus: !item.filterStatus } : item,
    )

    setExecutors(newExecutors)
    if (filterStatus) {
      if (filterListOptions.length === 1) {
        setFilterListOptions(SETTINGS_DEFAULT.filterListOptions)
        return
      }
      const newFilter = filterListOptions.filter(
        filter =>
          filter.id !== idFilter &&
          (filter.value !== shortName || id !== emptyExecutor.id),
      )
      setFilterListOptions(newFilter)
      return
    }
    const data = columnData.find(({ id }) => id === 'executor') as INC_HeadCell
    const filter = {
      column: 'executor',
      columnLabel: data.label,
      columnType: data.type,
      needValue: true,
      operator:
        id === emptyExecutor.id ? operators[6].operator : operators[2].operator,
      operatorLabel:
        id === emptyExecutor.id
          ? operators[6].operatorLabel
          : operators[2].operatorLabel,
      logicOperator: ILogicOperator.or,
      logicOperatorLabel: ILogicOperatorLabel.or,
      id: filterListOptions.length + 1,
      value: id === emptyExecutor.id ? '' : shortName,
    }
    const newFilter = [...filterListOptions, filter]
    setFilterListOptions(newFilter)
  }

  useEffect(() => {
    const userExecutor = incidents
      .map(({ UserExecutor }) => {
        return {
          id: UserExecutor?.id,
          shortName: UserExecutor?.shortName,
        }
      })
      .filter(({ id }) => id)

    const _list = [
      emptyExecutor,
      ...fieldEngineers,
      ...dispatchers,
      ...userExecutor,
    ]
    setExecutors(
      _list
        .map(({ shortName, id }) => {
          const isFiltered = filterListOptions.find(
            ({ column, value }) => column === 'executor' && value === shortName,
          )
          return {
            shortName: shortName as string,
            id: id as string,
            filterStatus: isFiltered ? true : false,
            idFilter: isFiltered ? isFiltered.id : 0,
          }
        })
        .filter(
          (obj, index, arr) => index === arr.findIndex(o => o.id === obj.id),
        )
        .sort((arr1, arr2) => (arr1['shortName'] > arr2['shortName'] ? 1 : -1)),
    )
  }, [])

  return (
    <>
      <MenuItem
        className={'quickFilterpaper'}
        onClick={() => setOpenStatusINCs(!openStatusINCs)}>
        <ListItemText>Исполнители</ListItemText>
        {openStatusINCs ? <ExpandLess /> : <ExpandMore />}
      </MenuItem>
      <Collapse
        in={openStatusINCs}
        timeout="auto"
        unmountOnExit
        className="collapseQuickFilter">
        {_executors.map(({ shortName, idFilter, filterStatus, id }) => (
          <MenuItem
            key={`${id}`}
            sx={{ pl: 4 }}
            onClick={() =>
              setIncStatusFilter({ idFilter, filterStatus, shortName, id })
            }>
            <ListItemIcon>
              {filterStatus && <Check fontSize="small" />}
            </ListItemIcon>
            <ListItemText className={'quickFilterText'} primary={shortName} />
          </MenuItem>
        ))}
      </Collapse>
    </>
  )
}

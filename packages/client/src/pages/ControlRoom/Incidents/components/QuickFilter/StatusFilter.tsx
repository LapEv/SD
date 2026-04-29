import { Collapse, ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import {
  columnData,
  empty_INCStatuses,
  operators,
  SETTINGS_DEFAULT,
} from '../../data'
import { useTableINC } from 'hooks/tableINC/useTableINC'
import { useEffect, useState } from 'react'
import { Check, ExpandLess, ExpandMore } from '@mui/icons-material'
import { useIncidents } from 'hooks/incidents/useINC'
import { I_INCStatuses, INC_HeadCell } from '../../interfaces'
import {
  ILogicOperator,
  ILogicOperatorLabel,
} from 'store/slices/tableINC/interfaces'
import { useMessage } from 'hooks/message/useMessage'

export const StatusFilter = () => {
  const [, { setMessage }] = useMessage()
  const [{ filterListOptions }, { setFilterListOptions }] = useTableINC()
  const [{ incStatuses }] = useIncidents()
  const [openStatusINCs, setOpenStatusINCs] = useState<boolean>(false)
  const [_incStatuses, setINCStatuses] =
    useState<I_INCStatuses[]>(empty_INCStatuses)

  const setIncStatusFilter = ({
    idFilter,
    filterStatus,
    statusINC,
    id,
  }: I_INCStatuses) => {
    if (!filterStatus && filterListOptions.length >= 5) {
      setMessage({
        text: 'Лимит фильтра не более 5!',
        type: 'warning',
      })
      return
    }
    const newINCStatuses = _incStatuses.map(item =>
      item.id === id ? { ...item, filterStatus: !item.filterStatus } : item,
    )
    setINCStatuses(newINCStatuses)
    if (filterStatus) {
      if (filterListOptions.length === 1) {
        setFilterListOptions(SETTINGS_DEFAULT.filterListOptions)
        return
      }
      const newFilter = filterListOptions.filter(
        filter => filter.id !== idFilter && filter.value !== statusINC,
      )
      setFilterListOptions(newFilter)
      return
    }
    const statusData = columnData.find(
      ({ id }) => id === 'status',
    ) as INC_HeadCell
    const filter = {
      column: 'status',
      columnLabel: statusData.label,
      columnType: statusData.type,
      needValue: true,
      operator: operators[2].operator,
      operatorLabel: operators[2].operatorLabel,
      logicOperator: ILogicOperator.or,
      logicOperatorLabel: ILogicOperatorLabel.or,
      id: filterListOptions.length + 1,
      value: statusINC,
    }
    const newFilter = [...filterListOptions, filter]
    setFilterListOptions(newFilter)
  }

  useEffect(() => {
    setINCStatuses(
      incStatuses.map(({ statusINC, id }) => {
        const isFiltered = filterListOptions.find(
          ({ column, value }) => column === 'status' && value === statusINC,
        )
        return {
          statusINC,
          id,
          filterStatus: isFiltered ? true : false,
          idFilter: isFiltered ? isFiltered.id : 0,
        }
      }),
    )
  }, [incStatuses, filterListOptions])

  return (
    <>
      <MenuItem
        className={'quickFilterpaper'}
        onClick={() => setOpenStatusINCs(!openStatusINCs)}>
        <ListItemText>Статусы инцидента</ListItemText>
        {openStatusINCs ? <ExpandLess /> : <ExpandMore />}
      </MenuItem>
      <Collapse
        in={openStatusINCs}
        timeout="auto"
        unmountOnExit
        className="collapseQuickFilter">
        {_incStatuses.map(({ statusINC, idFilter, filterStatus, id }) => (
          <MenuItem
            key={`${id}`}
            sx={{ pl: 4 }}
            onClick={() =>
              setIncStatusFilter({ idFilter, filterStatus, statusINC, id })
            }>
            <ListItemIcon>
              {filterStatus && <Check fontSize="small" />}
            </ListItemIcon>
            <ListItemText className={'quickFilterText'} primary={statusINC} />
          </MenuItem>
        ))}
      </Collapse>
    </>
  )
}

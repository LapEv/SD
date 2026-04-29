import { Collapse, ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import {
  columnData,
  empty_INCResponsible,
  emptyResponsible,
  operators,
  SETTINGS_DEFAULT,
} from '../../data'
import { useTableINC } from 'hooks/tableINC/useTableINC'
import { useEffect, useState } from 'react'
import { Check, ExpandLess, ExpandMore } from '@mui/icons-material'
import { useIncidents } from 'hooks/incidents/useINC'
import { I_INCResponsible, INC_HeadCell } from '../../interfaces'
import {
  ILogicOperator,
  ILogicOperatorLabel,
} from 'store/slices/tableINC/interfaces'
import { useMessage } from 'hooks/message/useMessage'
import { useAuth } from 'hooks/auth/useAuth'

export const ResponsibleFilter = () => {
  const [, { setMessage }] = useMessage()
  const [{ filterListOptions }, { setFilterListOptions }] = useTableINC()
  const [{ dispatchers }] = useAuth()
  const [{ incidents }] = useIncidents()
  const [openStatusINCs, setOpenStatusINCs] = useState<boolean>(false)
  const [_responsibles, setResponsibles] =
    useState<I_INCResponsible[]>(empty_INCResponsible)

  const setIncStatusFilter = ({
    idFilter,
    filterStatus,
    shortName,
    id,
  }: I_INCResponsible) => {
    if (!filterStatus && filterListOptions.length >= 5) {
      setMessage({
        text: 'Лимит фильтра не более 5!',
        type: 'warning',
      })
      return
    }
    const newResponsible = _responsibles.map(item =>
      item.id === id ? { ...item, filterStatus: !item.filterStatus } : item,
    )

    setResponsibles(newResponsible)
    if (filterStatus) {
      if (filterListOptions.length === 1) {
        setFilterListOptions(SETTINGS_DEFAULT.filterListOptions)
        return
      }
      const newFilter = filterListOptions.filter(
        filter =>
          filter.id !== idFilter &&
          (filter.value !== shortName || id !== emptyResponsible.id),
      )
      setFilterListOptions(newFilter)
      return
    }
    const data = columnData.find(
      ({ id }) => id === 'responsible',
    ) as INC_HeadCell
    const filter = {
      column: 'responsible',
      columnLabel: data.label,
      columnType: data.type,
      needValue: true,
      operator:
        id === emptyResponsible.id
          ? operators[6].operator
          : operators[2].operator,
      operatorLabel:
        id === emptyResponsible.id
          ? operators[6].operatorLabel
          : operators[2].operatorLabel,
      logicOperator: ILogicOperator.or,
      logicOperatorLabel: ILogicOperatorLabel.or,
      id: filterListOptions.length + 1,
      value: id === emptyResponsible.id ? '' : shortName,
    }
    const newFilter = [...filterListOptions, filter]
    setFilterListOptions(newFilter)
  }

  useEffect(() => {
    const userResponsible = incidents
      .map(({ UserResponsible }) => {
        return {
          id: UserResponsible?.id,
          shortName: UserResponsible?.shortName,
        }
      })
      .filter(({ id }) => id)

    const _list = [emptyResponsible, ...dispatchers, ...userResponsible]
    setResponsibles(
      _list
        .map(({ shortName, id }) => {
          const isFiltered = filterListOptions.find(
            ({ column, value }) =>
              column === 'responsible' && value === shortName,
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
        <ListItemText>Ответственные</ListItemText>
        {openStatusINCs ? <ExpandLess /> : <ExpandMore />}
      </MenuItem>
      <Collapse
        in={openStatusINCs}
        timeout="auto"
        unmountOnExit
        className="collapseQuickFilter">
        {_responsibles.map(({ shortName, idFilter, filterStatus, id }) => (
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

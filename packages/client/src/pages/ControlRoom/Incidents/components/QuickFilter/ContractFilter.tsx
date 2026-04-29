import { Collapse, ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import {
  columnData,
  empty_INCContract,
  operators,
  SETTINGS_DEFAULT,
} from '../../data'
import { useTableINC } from 'hooks/tableINC/useTableINC'
import { useEffect, useState } from 'react'
import { Check, ExpandLess, ExpandMore } from '@mui/icons-material'
import { I_INCContracts, INC_HeadCell } from '../../interfaces'
import {
  ILogicOperator,
  ILogicOperatorLabel,
} from 'store/slices/tableINC/interfaces'
import { useMessage } from 'hooks/message/useMessage'
import { useContracts } from 'hooks/contracts/useContracts'

export const ContractFilter = () => {
  const [, { setMessage }] = useMessage()
  const [{ filterListOptions }, { setFilterListOptions }] = useTableINC()
  const [{ contracts }, { getContracts }] = useContracts()
  const [openContractINCs, setOpenContractINCs] = useState<boolean>(false)
  const [_incContracts, setINCContracts] =
    useState<I_INCContracts[]>(empty_INCContract)

  const setINCContractFilter = ({
    idFilter,
    filterStatus,
    contract,
    id,
  }: I_INCContracts) => {
    if (!filterStatus && filterListOptions.length >= 5) {
      setMessage({
        text: 'Лимит фильтра не более 5!',
        type: 'warning',
      })
      return
    }
    const newINCContracts = _incContracts.map(item =>
      item.id === id ? { ...item, filterStatus: !item.filterStatus } : item,
    )
    setINCContracts(newINCContracts)
    if (filterStatus) {
      if (filterListOptions.length === 1) {
        setFilterListOptions(SETTINGS_DEFAULT.filterListOptions)
        return
      }
      const newFilter = filterListOptions.filter(
        filter => filter.id !== idFilter && filter.value !== contract,
      )
      setFilterListOptions(newFilter)
      return
    }
    const contractData = columnData.find(
      ({ id }) => id === 'contract',
    ) as INC_HeadCell
    const filter = {
      column: 'contract',
      columnLabel: contractData.label,
      columnType: contractData.type,
      needValue: true,
      operator: operators[2].operator,
      operatorLabel: operators[2].operatorLabel,
      logicOperator: ILogicOperator.or,
      logicOperatorLabel: ILogicOperatorLabel.or,
      id: filterListOptions.length + 1,
      value: contract,
    }
    const newFilter = [...filterListOptions, filter]
    setFilterListOptions(newFilter)
  }

  useEffect(() => {
    setINCContracts(
      contracts
        .map(({ contract, id }) => {
          const isFiltered = filterListOptions.find(
            ({ column, value }) => column === 'contract' && value === contract,
          )
          return {
            contract: contract as string,
            id: id as string,
            filterStatus: isFiltered ? true : false,
            idFilter: isFiltered ? isFiltered.id : 0,
          }
        })
        .filter(
          (obj, index, arr) => index === arr.findIndex(o => o.id === obj.id),
        ),
    )
  }, [contracts, filterListOptions])

  useEffect(() => {
    if (!contracts.length) {
      getContracts()
    }
  }, [])

  return (
    <>
      <MenuItem
        className={'quickFilterpaper'}
        onClick={() => setOpenContractINCs(!openContractINCs)}>
        <ListItemText>Контракты</ListItemText>
        {openContractINCs ? <ExpandLess /> : <ExpandMore />}
      </MenuItem>
      <Collapse
        in={openContractINCs}
        timeout="auto"
        unmountOnExit
        className="collapseQuickFilter">
        {_incContracts.map(({ contract, idFilter, filterStatus, id }) => (
          <MenuItem
            key={`${id}`}
            sx={{ pl: 4 }}
            onClick={() =>
              setINCContractFilter({ idFilter, filterStatus, contract, id })
            }>
            <ListItemIcon>
              {filterStatus && <Check fontSize="small" />}
            </ListItemIcon>
            <ListItemText className={'quickFilterText'} primary={contract} />
          </MenuItem>
        ))}
      </Collapse>
    </>
  )
}

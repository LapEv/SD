import { ClickAwayListener, Paper } from '@mui/material'
import { memo, useState } from 'react'
import { FilterTriggers } from './FilterTriggers'
import { useMessage } from 'hooks/message/useMessage'
import { IFilter } from '../../interfaces'
import { useTableINC } from 'hooks/tableINC/useTableINC'
import { operators, SETTINGS_DEFAULT } from '../../data'
import {
  GetActiveColumnOptions,
  CheckOperators,
} from 'pages/ControlRoom/Incidents'
import { ButtonsFilterINCs } from 'components/Buttons'
import {
  ILogicOperator,
  ILogicOperatorLabel,
} from 'store/slices/tableINC/interfaces'

export const FilterPaper = memo(({ handleCloseFilterPanel }: IFilter) => {
  const [{ filterListOptions, columnOptions }, { setFilterListOptions }] =
    useTableINC()
  const [, { setMessage }] = useMessage()
  const [filterList, setFilterList] = useState(filterListOptions)

  const removeAllFilters = () => {
    setFilterList(SETTINGS_DEFAULT.filterListOptions)
  }

  const addFilter = () => {
    if (filterList.length < 5) {
      const columns = GetActiveColumnOptions(columnOptions)
      setFilterList([
        ...filterList,
        {
          ...CheckOperators(columns[filterList.length].type, operators)[0],
          id: filterList.length + 1,
          column: columns[filterList.length].id,
          columnLabel: columns[filterList.length].label,
          columnType: columns[filterList.length].type,
          logicOperator: ILogicOperator.and,
          logicOperatorLabel: ILogicOperatorLabel.and,
        },
      ])
      return
    }
    setMessage({
      text: 'Лимит фильтра не более 5!',
      type: 'warning',
    })
  }

  const btnOkHandle = () => {
    setFilterListOptions(filterList)
    handleCloseFilterPanel()
  }

  const ClickAway = (event: MouseEvent | TouchEvent) => {
    if ((event.target as HTMLInputElement).localName === 'body') {
      return
    }
    handleCloseFilterPanel()
  }

  return (
    <ClickAwayListener onClickAway={ClickAway}>
      <Paper className={'paperFilterMenu'} elevation={8}>
        {filterList.map((item, index) => (
          <FilterTriggers
            key={`filter_${item.columnLabel}_${index}`}
            item={item}
            filterList={filterList}
            setFilterList={setFilterList}
          />
        ))}
        <ButtonsFilterINCs
          btnAddHandle={addFilter}
          btnClearHandle={removeAllFilters}
          btnOkHandle={btnOkHandle}
        />
      </Paper>
    </ClickAwayListener>
  )
})

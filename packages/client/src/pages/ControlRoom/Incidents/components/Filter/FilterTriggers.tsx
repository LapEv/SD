import { memo } from 'react'
import { Divider, Stack } from '@mui/material'
import { ClearButton, ClearButtonMobile } from 'components/Buttons'
import { SelectMUI } from 'components/Select'
import { IFilterTriggers, INC_HeadCell, IOperator } from '../../interfaces'
import {
  columnData,
  logicOperators,
  operators,
  SETTINGS_DEFAULT,
} from '../../data'
import { useTableINC } from 'hooks/tableINC/useTableINC'
import { CheckOperators } from 'pages/ControlRoom/Incidents'
import { Dayjs } from 'dayjs'
import {
  IFilterListOptions,
  ILogicOperator,
  ILogicOperatorLabel,
  ILogicOperatorModel,
} from 'store/slices/tableINC/interfaces'
import { FilterValue } from './FilterValue'
import { MuiDiv } from 'components/MUI'
import { useApp } from 'hooks/app/useApp'

export const FilterTriggers = memo(
  ({ item, filterList, setFilterList }: IFilterTriggers) => {
    const [{ columnOptions }] = useTableINC()
    const [{ device }] = useApp()

    const onFilter = (value: string | Dayjs | boolean) => {
      if (item.columnType === 'dateTime') {
        value = (value as string).split('+')[0]
      }
      const newFilter = filterList.map(filter =>
        filter.id === item.id ? { ...filter, value } : filter,
      ) as IFilterListOptions[]
      setFilterList(newFilter)
    }

    const clearFilter = () => {
      if (filterList.length === 1) {
        setFilterList(SETTINGS_DEFAULT.filterListOptions)
        return
      }
      const newFilter = filterList
        .filter(({ id }) => id !== item.id)
        .map((item, index) => {
          return { ...item, id: index + 1 }
        })
      setFilterList(newFilter)
    }

    const setColumn = (value: string) => {
      const { id, label, type } = columnData.find(
        ({ label }) => label === value,
      ) as INC_HeadCell
      const checkOper = CheckOperators(type, operators)[0]
      const newFilter = filterList.map(filter =>
        filter.id === item.id
          ? {
              ...filter,
              operator: checkOper.operator,
              operatorLabel: checkOper.operatorLabel,
              column: id,
              columnLabel: label,
              columnType: type,
              value: type !== 'boolean' ? '' : true,
            }
          : filter,
      )
      setFilterList(newFilter)
    }

    const setOperator = (value: string) => {
      const { operator, operatorLabel } = operators.find(
        ({ operatorLabel }) => operatorLabel === value,
      ) as IOperator
      const newFilter = filterList.map(filter =>
        filter.id === item.id ? { ...filter, operator, operatorLabel } : filter,
      )
      setFilterList(newFilter)
    }

    const setLogic = (value: string) => {
      const _logicOperator = logicOperators.find(
        ({ logicOperatorLabel }) => logicOperatorLabel === value,
      ) as ILogicOperatorModel
      const newFilter = filterList.map(filter =>
        filter.id === item.id
          ? {
              ...filter,
              logicOperator: _logicOperator.logicOperator as ILogicOperator,
              logicOperatorLabel:
                _logicOperator.logicOperatorLabel as ILogicOperatorLabel,
            }
          : filter,
      )
      setFilterList(newFilter)
    }

    if (device === 'mobile') {
      return (
        <Stack spacing={3} direction="column" className={'stackFilterTrigger'}>
          <MuiDiv className="stackFilterBoxMobile">
            {item.id > 1 && (
              <SelectMUI
                label="Логика"
                data={logicOperators.map(
                  ({ logicOperatorLabel }) => logicOperatorLabel,
                )}
                onChange={setLogic}
                classNameSelect={'selectLogicFilterTrigger'}
                classNameFormContorl={'formControlLogicFilterTrigger mt10'}
                value={item.logicOperatorLabel}
              />
            )}
            <SelectMUI
              label="Столбец"
              data={columnOptions
                .filter(({ type }) => type !== 'system' && type !== 'custom')
                .map(({ label }) => label)}
              onChange={setColumn}
              classNameSelect={'selectFilterTriggerMobile'}
              classNameFormContorl={'formControlFilterTriggerMobile'}
              value={item.columnLabel}
            />
            <SelectMUI
              disabled={item.columnType !== 'boolean' ? false : true}
              label="Оператор"
              data={CheckOperators(item.columnType, operators).map(
                (item: IOperator) => item.operatorLabel,
              )}
              onChange={setOperator}
              classNameSelect={'selectFilterTriggerMobile'}
              classNameFormContorl={'formControlFilterTriggerMobile'}
              value={item.operatorLabel}
            />
            <FilterValue
              item={item}
              onFilter={onFilter}
              filterList={filterList}
              disabled={
                item.operator === 'isEmpty' || item.operator === 'isNotEmpty'
                  ? true
                  : false
              }
            />
          </MuiDiv>
          <ClearButtonMobile
            handleClick={clearFilter}
            length={1}
            className="colorForIcon"
          />
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            className="mobileFilterSeparator"
          />
        </Stack>
      )
    }

    return (
      <Stack spacing={3} direction="row" className={'stackFilterTrigger'}>
        <MuiDiv className="stackFilterBox">
          {item.id > 1 && (
            <SelectMUI
              label="Логика"
              data={logicOperators.map(
                ({ logicOperatorLabel }) => logicOperatorLabel,
              )}
              onChange={setLogic}
              classNameSelect={'selectLogicFilterTrigger'}
              classNameFormContorl={'formControlLogicFilterTrigger'}
              value={item.logicOperatorLabel}
            />
          )}
          <SelectMUI
            label="Столбец"
            data={columnOptions
              .filter(({ type }) => type !== 'system' && type !== 'custom')
              .map(({ label }) => label)}
            onChange={setColumn}
            classNameSelect={'selectFilterTrigger'}
            classNameFormContorl={'formControlFilterTrigger'}
            value={item.columnLabel}
          />
          <SelectMUI
            disabled={item.columnType !== 'boolean' ? false : true}
            label="Оператор"
            data={CheckOperators(item.columnType, operators).map(
              (item: IOperator) => item.operatorLabel,
            )}
            onChange={setOperator}
            classNameSelect={'selectFilterTrigger'}
            classNameFormContorl={'formControlFilterTrigger'}
            value={item.operatorLabel}
          />
          <FilterValue
            item={item}
            onFilter={onFilter}
            filterList={filterList}
            disabled={
              item.operator === 'isEmpty' || item.operator === 'isNotEmpty'
                ? true
                : false
            }
          />
        </MuiDiv>
        <ClearButton
          handleClick={clearFilter}
          length={1}
          className="colorForIcon"
        />
      </Stack>
    )
  },
)

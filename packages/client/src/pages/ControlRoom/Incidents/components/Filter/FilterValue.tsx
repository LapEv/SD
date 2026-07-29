import { ChangeEvent } from 'react'
import { TextFieldsFilter } from 'components/TextFields'
import dayjs from 'dayjs'
import { IFilterValue, overdueLabel } from '../../interfaces'
import { SelectMUI } from 'components/Select'
import { DateTimePickerField } from 'components/DatePicker'
import { ListComponents } from './ListComponents/ListComponents'
import { ClearButton } from 'components/Buttons'
import { useApp } from 'hooks/app/useApp'

export const FilterValue = ({
  item,
  filterList,
  onFilter,
  disabled,
}: IFilterValue) => {
  const [{ device }] = useApp()

  const setValue = (value: string) => {
    if (value === overdueLabel.false) {
      onFilter(false)
    }
    if (value === overdueLabel.true) {
      onFilter(true)
    }
  }

  if (item.columnType === 'dateTime') {
    return (
      <DateTimePickerField
        dateValue={item.value ? dayjs(item.value as string) : dayjs()}
        setDateValue={onFilter}
        className={'datePickerFilter'}
        disabled={disabled}
      />
    )
  }
  if (item.columnType === 'boolean' && item.column === 'overdue') {
    return (
      <SelectMUI
        label="Значение"
        data={[overdueLabel.true, overdueLabel.false]}
        onChange={setValue}
        classNameSelect={`${device === 'mobile' ? 'selectFilterTriggerMobile' : 'selectFilterTrigger'}`}
        classNameFormContorl={`${device === 'mobile' ? 'textContainerFilterTriggerMobile' : 'textContainerFilterTrigger'}`}
        value={item.value ? overdueLabel.true : overdueLabel.false}
      />
    )
  }
  if (item.columnType === 'list') {
    return (
      <ListComponents
        item={item}
        filterList={filterList}
        onFilter={onFilter}
        disabled={disabled}
      />
    )
  }
  return (
    <TextFieldsFilter
      disabled={disabled}
      label="Значение"
      type="text"
      variant="outlined"
      className={`${device === 'mobile' ? 'textContainerFilterTriggerMobile' : 'textContainerFilterTrigger'}`}
      required
      value={disabled ? '' : item.value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onFilter(e.target.value)}
      slotProps={{
        input: {
          endAdornment: (
            <ClearButton
              length={(item.value as string).length}
              className={'quickIcon colorForIcon'}
              handleClick={() => onFilter('')}
            />
          ),
        },
      }}
    />
  )
}

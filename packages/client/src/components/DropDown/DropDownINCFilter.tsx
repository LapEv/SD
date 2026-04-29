import { memo } from 'react'
import { Autocomplete } from '@mui/material'
import { TextFieldIncidents } from 'components/TextFields'
import { IDropDownINC, Options } from './interface'
import { emptyOptionsDD } from '.'
import { ListDropDown } from './components/ListDropDown'

export const DropDownINCFilter = memo(
  ({ data, props, onChange, onBlur, value, label, disabled }: IDropDownINC) => {
    return (
      <Autocomplete
        forcePopupIcon={true}
        clearOnEscape
        autoSelect={false}
        className={'dropdownINC'}
        sx={props}
        disabled={disabled}
        options={data}
        noOptionsText={'Нет данных!'}
        onChange={(_, textValue) =>
          textValue
            ? onChange?.(textValue as Options)
            : onChange?.(emptyOptionsDD as Options)
        }
        value={{ label: value as string, id: '' }}
        renderOption={(props, option) => {
          const { key, ...newprops } = props
          return (
            <ListDropDown
              key={`${option.id}_${key}`}
              value={value}
              props={newprops}
              option={option}
              classNameLi={'dropdown_li'}
            />
          )
        }}
        slotProps={{
          paper: {
            className: 'dropdownINC',
          },
        }}
        renderInput={params => (
          <TextFieldIncidents
            onBlur={event => onBlur?.(event.target.value)}
            {...params}
            key={`${label}_${params.id}`}
            disabled={disabled}
            label="Значение"
            type="text"
            variant="outlined"
            className={'textContainerFilterTrigger'}
            required
            value={disabled ? '' : value}
          />
        )}
      />
    )
  },
)

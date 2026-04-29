import { memo, useEffect, useState } from 'react'
import { Autocomplete } from '@mui/material'
import { TextFieldIncidents } from 'components/TextFields'
import { IDropDownINC, Options } from './interface'
import { emptyOptionsDD } from '.'
import { ListDropDown } from './components/ListDropDown'

export const DropDownINC = memo(
  ({
    data,
    props,
    onChange,
    onBlur,
    value,
    label,
    disabled,
    className,
    error,
    errorLabel,
  }: IDropDownINC) => {
    const [errors, setErrors] = useState<boolean>(error as boolean)

    useEffect(() => {
      setErrors(error as boolean)
    }, [error])

    return (
      <Autocomplete
        forcePopupIcon={true}
        clearOnEscape
        autoSelect={false}
        className={`dropdownINC ${className}`}
        sx={props}
        disabled={disabled}
        options={data}
        noOptionsText={'Нет данных!'}
        onChange={(_, textValue) =>
          textValue
            ? (onChange?.(textValue as Options), setErrors(false))
            : (onChange?.(emptyOptionsDD as Options), setErrors(true))
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
            onBlur={event => (
              !event.target.value ? setErrors(true) : setErrors(false),
              onBlur?.(event.target.value)
            )}
            {...params}
            key={`${label}_${params.id}`}
            disabled={disabled}
            label={label ?? 'Значение'}
            type="text"
            variant="outlined"
            className={'textContainerINC'}
            required
            error={errors}
            helperText={errors ? errorLabel : ''}
            value={disabled ? '' : value}
          />
        )}
      />
    )
  },
)

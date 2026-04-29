import { useState, useEffect, memo } from 'react'
import { Autocomplete } from 'components/Autocomplete'
import { DataDropDown, Options } from './interface'
import { emptyOptionsDD } from '.'
import { TextFieldDD } from 'components/TextFields'
import { FilterOptions } from './FilterOptions'
import { ListDropDown } from './components/ListDropDown'

export const DropDown = memo(
  ({
    data,
    props,
    onChange,
    onBlur,
    value,
    label,
    errorLabel,
    error,
    tabIndex,
    className,
  }: DataDropDown) => {
    const [errors, setErrors] = useState<boolean>(error as boolean)

    useEffect(() => {
      setErrors(error as boolean)
    }, [error])

    return (
      <Autocomplete
        forcePopupIcon={true}
        clearOnEscape
        autoSelect={false}
        className={`dropdown ${className}`}
        sx={props}
        options={data}
        noOptionsText={'Нет данных'}
        filterOptions={FilterOptions}
        isOptionEqualToValue={(option, value): boolean => {
          return (
            (option as Options).label === value ||
            (option as Options).id === value ||
            (option as Options).description === value ||
            (option as Options).descriptionID === value ||
            value === ''
          )
        }}
        onChange={(_, textValue) =>
          textValue
            ? (onChange?.(textValue as Options), setErrors(false))
            : (onChange?.(emptyOptionsDD as Options), setErrors(true))
        }
        value={value ?? ''}
        renderOption={(props, option) => (
          <ListDropDown
            value={value}
            props={props}
            key={`${props.id}_`}
            option={option as Options}
            classNameLi={'dropdown_li_dark'}
          />
        )}
        slotProps={{
          paper: {
            className: 'dropdownDark',
          },
        }}
        size={'small'}
        renderInput={params => (
          <TextFieldDD
            onBlur={event => (
              !event.target.value ? setErrors(true) : setErrors(false),
              onBlur?.(event.target.value)
            )}
            {...params}
            key={`${label}_${params.id}`}
            required
            variant="outlined"
            label={label}
            error={errors}
            id={params.id}
            helperText={errors ? errorLabel : ''}
            slotProps={{
              input: {
                ...params.InputProps,
                tabIndex,
              },
            }}
          />
        )}
      />
    )
  },
)

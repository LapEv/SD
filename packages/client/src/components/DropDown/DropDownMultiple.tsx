import { useState, useEffect, memo } from 'react'
import { TextField } from 'components/TextFields'
import { Autocomplete } from 'components/Autocomplete'
import { DataDropDownMultiple, Options } from './interface'
import { emptyOptionsDD } from '.'
import { FilterOptions } from './FilterOptions'
import { ListDropDown } from './components/ListDropDown'

export const DropDownMultiple = memo(
  ({
    data,
    props,
    onChange,
    value,
    label,
    errorLabel,
    error,
    className,
  }: DataDropDownMultiple) => {
    const [errors, setErrors] = useState<boolean>(error as boolean)

    useEffect(() => {
      setErrors(error as boolean)
    }, [error])

    return (
      <Autocomplete
        multiple
        disableCloseOnSelect
        className={`dropdown ${className}`}
        sx={props}
        options={data}
        filterOptions={FilterOptions}
        // getOptionLabel={(option: unknown) => (option as Options).label}
        isOptionEqualToValue={(option, value): boolean =>
          (option as Options).label === (value as Options).label ||
          value === emptyOptionsDD
        }
        onChange={(_, textValue) =>
          (textValue as string).length
            ? (onChange?.(textValue as Options[]), setErrors(false))
            : (onChange?.(textValue as Options[]), setErrors(true))
        }
        value={value ?? emptyOptionsDD}
        renderOption={(props, option) => (
          <ListDropDown
            value={value}
            props={props}
            option={option as Options}
          />
        )}
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            label={label}
            error={errors}
            multiline
            minRows={1}
            maxRows={4}
            id={params.id}
            className={'multiline'}
            helperText={errors ? errorLabel : ''}
            slotProps={{
              input: {
                ...params.InputProps,
                className: 'dropdownMultiple',
              },
            }}
          />
        )}
      />
    )
  },
)

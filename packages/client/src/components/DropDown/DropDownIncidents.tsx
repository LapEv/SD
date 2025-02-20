import { useState, useEffect, memo } from 'react'
import { Box, Popper, useTheme } from '@mui/material'
import { TextFieldIncidents } from 'components/TextFields'
import { AutocompleteIncidents } from 'components/Autocomplete'
import { DataDropDown, Options } from './interface'
import { emptyValue } from '.'
import { ITheme, ThemeColor, ThemeMode } from 'themes/themeConfig'

export const DropDownIncidents = memo(
  ({
    data,
    props,
    onChange,
    onBlur,
    value,
    label,
    errorLabel,
    error,
    disableClearable,
    tabIndex,
  }: DataDropDown) => {
    const theme = useTheme()
    const [errors, setErrors] = useState<boolean>(error as boolean)

    useEffect(() => {
      setErrors(error as boolean)
    }, [error])

    return (
      <AutocompleteIncidents
        forcePopupIcon={true}
        clearOnEscape
        disableClearable={disableClearable ?? false}
        autoSelect={false}
        sx={{ width: '90%', height: 40, ...props }}
        options={data}
        noOptionsText={'Нет данных!'}
        filterOptions={(option, { inputValue }): unknown[] => {
          if (inputValue === '') return option
          const value = inputValue.toLowerCase().trim()
          const displayOptions = option.filter((item): unknown => {
            if ((item as Options).label.toLowerCase().trim().includes(value)) {
              return item
            }
            if (
              (item as Options).description &&
              (item as Options)?.description?.length &&
              (item as Options)?.description
                ?.toLowerCase()
                .trim()
                .includes(value)
            ) {
              return item
            }
            if (
              (item as Options).descriptionID &&
              (item as Options)?.descriptionID?.length &&
              (item as Options)?.descriptionID
                ?.toLowerCase()
                .trim()
                .includes(value)
            ) {
              return item
            }
          })
          return displayOptions ?? []
        }}
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
            : (onChange?.(emptyValue as Options), setErrors(true))
        }
        value={value ?? ''}
        renderOption={(props, option) => {
          if (!value) {
            props['aria-selected'] = 'false'
          }
          return (
            <li aria-selected="false" {...props}>
              <Box
                component="span"
                sx={{
                  width: 14,
                  height: 14,
                  flexShrink: 0,
                  borderRadius: '3px',
                  mr: 1,
                  mt: '2px',
                }}
              />
              <Box sx={{ flexGrow: 1 }}>
                {(option as Options).label}
                {(option as Options).description && (
                  <div>
                    <span>{(option as Options).description}</span>
                  </div>
                )}
                {(option as Options).descriptionID && (
                  <div>
                    <span>{(option as Options).descriptionID}</span>
                  </div>
                )}
              </Box>
            </li>
          )
        }}
        PopperComponent={({ style, ...props }) => (
          <Popper {...props} style={{ ...style, zIndex: 1 }} />
        )}
        componentsProps={{
          paper: {
            style: {
              backgroundColor:
                theme.palette.mode === ThemeMode.light
                  ? (theme as ITheme).colorTheme.colorLight
                  : (theme as ITheme).colorTheme.colorDark,
            },
          },
        }}
        ListboxProps={{
          sx: {
            fontWeight: 'normal',
            borderWidth: 1,
            minHeight: 30,
            maxHeight: 225,
            color:
              theme.palette.mode === 'light'
                ? '#000000!important'
                : '#FFFFFF!important',
            '& li': {
              borderColor:
                theme.palette.mode === 'light'
                  ? '#000000!important'
                  : '#C1EEE1!important',
            },
            '& :hover': {
              color: theme.palette.mode === 'light' ? '#000000' : '#FFFFFF',
              fontWeight: 'bold',
            },
            '& [aria-selected="true"]': {
              color: theme.palette.mode === 'light' ? '#000000' : '#FFFFFF',
              fontWeight: 'bold',
              backgroundColor:
                theme.palette.mode === 'light'
                  ? '#a8dfcf!important'
                  : ThemeColor.dark,
            },
          },
        }}
        renderInput={params => (
          <TextFieldIncidents
            onBlur={event => (
              !event.target.value ? setErrors(true) : setErrors(false),
              onBlur?.(event.target.value)
            )}
            {...params}
            sx={{ width: '100%' }}
            required
            variant="outlined"
            label={label}
            error={errors}
            id={params.id}
            value={value}
            helperText={errors ? errorLabel : ''}
            InputProps={{
              ...params.InputProps,
              tabIndex,
            }}
          />
        )}
      />
    )
  },
)

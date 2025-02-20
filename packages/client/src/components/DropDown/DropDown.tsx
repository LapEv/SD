import { useState, useEffect, memo } from 'react'
import { Box, useTheme } from '@mui/material'
import { Autocomplete } from 'components/Autocomplete'
import { DataDropDown, Options } from './interface'
import { emptyValue } from '.'
import { TextFieldDD } from 'components/TextFields'
import { ITheme, ThemeMode } from 'themes/themeConfig'

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
  }: DataDropDown) => {
    const theme = useTheme() as ITheme
    const [errors, setErrors] = useState<boolean>(error as boolean)

    useEffect(() => {
      setErrors(error as boolean)
    }, [error])

    return (
      <Autocomplete
        forcePopupIcon={true}
        clearOnEscape
        autoSelect={false}
        sx={{
          width: '90%',
          ...props,
          height: theme.fontSize === 'small' ? 30 : 40,
        }}
        options={data}
        noOptionsText={'Нет данных'}
        filterOptions={(option, { inputValue }): unknown[] => {
          if (inputValue === '') return option
          const value = inputValue.toLowerCase().trim()
          const displayOptions = option.filter((item): unknown => {
            if ((item as Options).label.toLowerCase().trim().includes(value)) {
              return item
            }
            if (
              (item as Options)?.description &&
              (item as Options)?.description?.length &&
              (item as Options)?.description
                ?.toLowerCase()
                .trim()
                .includes(value)
            ) {
              return item
            }
            if (
              (item as Options)?.descriptionID &&
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
            <li {...props}>
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
        ListboxProps={{
          sx: {
            borderWidth: 1,
            fontWeight: 'normal',
            minHeight: 40,
            maxHeight: 225,
            backgroundColor:
              theme.palette.mode === ThemeMode.light
                ? (theme as ITheme).colorTheme.colorDark
                : (theme as ITheme).colorTheme.colorLight,
            '& li': {
              color:
                theme.palette.mode === ThemeMode.light
                  ? (theme as ITheme).colorTheme.colorLight
                  : (theme as ITheme).colorTheme.colorDark,
              borderColor:
                theme.palette.mode === ThemeMode.light
                  ? (theme as ITheme).colorTheme.colorLight
                  : (theme as ITheme).colorTheme.colorDark,
            },
            '& :hover': {
              color:
                theme.palette.mode === ThemeMode.light
                  ? (theme as ITheme).colorTheme.colorLight
                  : (theme as ITheme).colorTheme.colorDark,
              fontWeight: 'bold',
            },
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
            sx={{ height: theme.fontSize === 'small' ? 30 : 40 }}
            required
            variant="outlined"
            label={label}
            error={errors}
            id={params.id}
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

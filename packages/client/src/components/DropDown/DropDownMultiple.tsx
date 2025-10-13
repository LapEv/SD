import { useState, useEffect, memo } from 'react'
import { useTheme } from '@mui/material'
import { TextField } from 'components/TextFields'
import { Autocomplete } from 'components/Autocomplete'
import { DataDropDownMultiple, Options } from './interface'
import { emptyValue } from '.'
import { ITheme, ThemeMode } from 'themes/themeConfig'

export const DropDownMultiple = memo(
  ({
    data,
    props,
    onChange,
    value,
    label,
    errorLabel,
    error,
  }: DataDropDownMultiple) => {
    const theme = useTheme() as ITheme
    const [errors, setErrors] = useState<boolean>(error as boolean)

    useEffect(() => {
      setErrors(error as boolean)
    }, [error])

    return (
      <Autocomplete
        multiple
        disableCloseOnSelect
        sx={{
          width: '90%',
          ...props,
          height: theme.fontSize === 'small' ? 30 : 40,
        }}
        options={data}
        getOptionLabel={(option: unknown) => (option as Options).label}
        isOptionEqualToValue={(option, value): boolean =>
          (option as Options).label === (value as Options).label ||
          value === emptyValue
        }
        onChange={(_, textValue) =>
          (textValue as string).length
            ? (onChange?.(textValue as Options[]), setErrors(false))
            : (onChange?.(textValue as Options[]), setErrors(true))
        }
        value={value ?? emptyValue}
        ListboxProps={{
          sx: {
            fontWeight: 'normal',
            borderWidth: 1,
            minHeight: 40,
            maxHeight: 225,
            background:
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
            },
          },
        }}
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            label={label}
            error={errors}
            multiline
            maxRows={4}
            sx={{
              height: theme.fontSize === 'small' ? 30 : 40,
              color:
                theme.palette.mode === ThemeMode.light
                  ? (theme as ITheme).colorTheme.colorLight
                  : (theme as ITheme).colorTheme.colorDark,
            }}
            id={params.id}
            helperText={errors ? errorLabel : ''}
            InputProps={{
              ...params.InputProps,
              style: {
                padding: 0,
                minHeight: theme.fontSize === 'small' ? 30 : 40,
                height: 'auto',
                maxHeight: 200,
                color:
                  theme.palette.mode === ThemeMode.light
                    ? (theme as ITheme).colorTheme.colorLight
                    : (theme as ITheme).colorTheme.colorDark,
                overflowY: 'hidden',
              },
            }}
          />
        )}
      />
    )
  },
)

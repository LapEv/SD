import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { ISelect } from './interfaces'
import { styled } from '@mui/material'
import { memo } from 'react'
import { ITheme, ThemeMode } from 'themes/themeConfig'

const CustomSelect = styled(Select)(({ theme }) => ({
  padding: '0!important',
  paddingLeft: '7px!important',
  paddingRight: '7px!important',
  borderWidth: 2,
  color:
    theme.palette.mode === ThemeMode.dark
      ? (theme as ITheme).colorTheme.colorLight
      : (theme as ITheme).colorTheme.colorDark,
  borderColor:
    theme.palette.mode === ThemeMode.dark
      ? (theme as ITheme).colorTheme.colorLight
      : (theme as ITheme).colorTheme.colorDark,
  '&.MuiOutlinedInput-root': {
    '& fieldset': {
      color:
        theme.palette.mode === ThemeMode.dark
          ? (theme as ITheme).colorTheme.colorLight
          : (theme as ITheme).colorTheme.colorDark,
      borderColor:
        theme.palette.mode === ThemeMode.dark
          ? (theme as ITheme).colorTheme.colorLight
          : (theme as ITheme).colorTheme.colorDark,
    },
    '&:hover fieldset': {
      borderColor:
        theme.palette.mode === ThemeMode.dark
          ? (theme as ITheme).colorTheme.colorLight
          : (theme as ITheme).colorTheme.colorDark,
      borderWidth: 2,
    },
    '&.Mui-focused fieldset': {
      borderColor:
        theme.palette.mode === ThemeMode.dark
          ? (theme as ITheme).colorTheme.colorLight
          : (theme as ITheme).colorTheme.colorDark,
    },
  },
}))

const CustomFormControl = styled(FormControl)(({ theme }) => ({
  '.MuiFormLabel-root': {
    color:
      theme.palette.mode === ThemeMode.dark
        ? (theme as ITheme).colorTheme.colorLight
        : (theme as ITheme).colorTheme.colorDark,
  },
  '&:hover .MuiFormLabel-root': {
    color:
      theme.palette.mode === ThemeMode.dark
        ? (theme as ITheme).colorTheme.colorLight
        : (theme as ITheme).colorTheme.colorDark,
    fontWeight: 'bold',
  },
  '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    color:
      theme.palette.mode === ThemeMode.dark
        ? (theme as ITheme).colorTheme.colorLight
        : (theme as ITheme).colorTheme.colorDark,
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
    color:
      theme.palette.mode === ThemeMode.dark
        ? (theme as ITheme).colorTheme.colorLight
        : (theme as ITheme).colorTheme.colorDark,
    fontWeight: 'bold',
  },
  '& .MuiFormLabel-root.Mui-focused': {
    color:
      theme.palette.mode === ThemeMode.dark
        ? (theme as ITheme).colorTheme.colorLight
        : (theme as ITheme).colorTheme.colorDark,
    fontWeight: 'bold',
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor:
      theme.palette.mode === ThemeMode.dark
        ? (theme as ITheme).colorTheme.colorLight
        : (theme as ITheme).colorTheme.colorDark,
  },
}))

const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  color:
    theme.palette.mode === ThemeMode.light
      ? (theme as ITheme).colorTheme.colorLight
      : (theme as ITheme).colorTheme.colorDark,

  '&.Mui-selected': {
    fontWeight: 'normal',
    backgroundColor:
      theme.palette.mode === ThemeMode.dark
        ? 'rgba(222, 240, 235, 0.08)'
        : 'rgba(0, 0, 0, 0.08)',
    color:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.colorLight
        : (theme as ITheme).colorTheme.colorDark,
  },
  '&.Mui-focusVisible': {
    backgroundColor:
      theme.palette.mode === ThemeMode.light
        ? 'rgba(222, 240, 235, 0.08)'
        : 'rgba(0, 0, 0, 0.08)',
  },
  ':hover': {
    backgroundColor:
      theme.palette.mode === ThemeMode.light
        ? 'rgba(222, 240, 235, 0.08)'
        : 'rgba(0, 0, 0, 0.08)',
  },
  '&.MuiButtonBase-root': {
    fontWeight: 'normal',
    '&:hover': {
      fontWeight: 'bold',
    },
  },
}))

export const SelectMUI = memo(
  ({ label, data, onChange, value, props }: ISelect) => {
    return (
      <CustomFormControl
        sx={{
          m: 1,
          minWidth: 120,
          width: '50%',
        }}>
        <InputLabel id="select-label-id">{label}</InputLabel>
        <CustomSelect
          sx={{ ...props }}
          labelId="select-label"
          id="select-label-id"
          value={value || ''}
          label={label}
          onChange={(event: SelectChangeEvent<unknown>) =>
            onChange(event.target.value as string)
          }>
          {data &&
            data.map((item, index) => {
              return (
                <CustomMenuItem key={`${item}${index}`} value={item}>
                  {item}
                </CustomMenuItem>
              )
            })}
        </CustomSelect>
      </CustomFormControl>
    )
  },
)

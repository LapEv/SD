import { PickersLayout } from '@mui/x-date-pickers/PickersLayout'
import { styled } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TextField } from 'components/TextFields'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { CalendarIcon, ClearIconElement } from 'components/Icons'
import { IDateField } from './interface'
import { memo } from 'react'
import { ITheme, ThemeMode } from 'themes/themeConfig'
import { Dayjs } from 'dayjs'

const StyledDatePickers = styled(PickersLayout)(({ theme }) => ({
  '.MuiDateCalendar-root': {
    color:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.colorDark
        : (theme as ITheme).colorTheme.colorLight,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: theme.palette.mode === ThemeMode.dark ? '#FFF' : '#000',
    border: '2px solid',
    backgroundColor:
      theme.palette.mode === ThemeMode.dark
        ? (theme as ITheme).colorTheme.colorDark
        : (theme as ITheme).colorTheme.colorLight,
  },
  '.MuiPickersDay-root': {
    color:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.colorDark
        : (theme as ITheme).colorTheme.colorLight,
  },
}))

export const DateField = memo(({ dateValue, setDateValue, sx }: IDateField) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        slots={{
          /* eslint-disable @typescript-eslint/no-explicit-any */
          layout: StyledDatePickers as any,
          textField: TextField,
          openPickerIcon: CalendarIcon as any,
          clearIcon: ClearIconElement as any,
          /* eslint-enable @typescript-eslint/no-explicit-any */
        }}
        slotProps={{
          field: { clearable: true },
        }}
        value={dateValue ?? ''}
        onChange={newValue => {
          setDateValue(newValue as Dayjs)
        }}
        views={['day', 'month', 'year']}
        label="Выберите дату"
        format="DD.MM.YYYY"
        sx={sx ?? { width: '90%', mt: 3 }}
      />
    </LocalizationProvider>
  )
})

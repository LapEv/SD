import { PickersLayout } from '@mui/x-date-pickers/PickersLayout'
import { styled } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TextField } from 'components/TextFields'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { CalendarIcon, ClearIconElement } from 'components/Icons'
import { IDateTimeField } from './interface'
import { Dayjs } from 'dayjs'
import { memo } from 'react'
import { ThemeMode, ITheme } from 'themes/themeConfig'

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
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.colorLight
        : (theme as ITheme).colorTheme.colorDark,
  },
  '.MuiPickersDay-root': {
    color:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.colorDark
        : (theme as ITheme).colorTheme.colorLight,
  },
}))

export const DateTimeField = memo(
  ({ dateValue, setDateValue, sx }: IDateTimeField) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
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
          views={['day', 'month', 'year', 'hours', 'minutes', 'seconds']}
          label="Выберите дату"
          format="DD.MM.YYYY HH:mm:ss"
          sx={sx ?? { width: '90%', mt: 3 }}
          timeSteps={{ minutes: 1, seconds: 1 }}
        />
      </LocalizationProvider>
    )
  },
)

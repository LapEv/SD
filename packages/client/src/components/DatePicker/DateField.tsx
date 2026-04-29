import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { CalendarIcon, ClearIconElement } from 'components/Icons'
import { IDateField } from './interface'
import { memo } from 'react'
import { Dayjs } from 'dayjs'

export const DateField = memo(
  ({ dateValue, setDateValue, sx, className }: IDateField) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <DatePicker
          slots={{
            openPickerIcon: CalendarIcon,
            clearIcon: ClearIconElement,
          }}
          slotProps={{
            textField: {
              className,
            },
            actionBar: {
              actions: ['cancel', 'accept'],
            },
            desktopTrapFocus: {
              disableEnforceFocus: true,
            },
          }}
          defaultValue={dateValue ?? ''}
          onAccept={newValue => {
            setDateValue((newValue as Dayjs).format())
          }}
          label="Выберите дату"
          format="DD.MM.YYYY"
          views={['year', 'month', 'day']}
          sx={sx}
        />
      </LocalizationProvider>
    )
  },
)

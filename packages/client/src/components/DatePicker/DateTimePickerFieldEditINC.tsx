import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { CalendarIcon, ClearIconElement } from 'components/Icons'
import { IDateField } from './interface'
import { memo } from 'react'
import { Dayjs } from 'dayjs'
import 'dayjs/locale/ru'
import { DateTimePicker } from '@mui/x-date-pickers'

export const DateTimePickerFieldEditINC = memo(
  ({ dateValue, setDateValue, sx, className, disabled, label }: IDateField) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <DateTimePicker
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
          value={dateValue ?? ''}
          onAccept={newValue => {
            setDateValue(newValue as Dayjs)
          }}
          onChange={newValue => {
            setDateValue(newValue as Dayjs)
          }}
          label={label ?? ''}
          format="DD.MM.YYYY HH:mm:ss"
          views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
          timeSteps={{ minutes: 1, seconds: 1 }}
          sx={sx}
          disabled={disabled}
        />
      </LocalizationProvider>
    )
  },
)

import { Dayjs } from 'dayjs'

export interface IDateField {
  dateValue: Dayjs
  setDateValue: (text: string | Dayjs) => void
  sx?: Record<string, unknown>
  className?: string
  disabled?: boolean
  label?: string
}

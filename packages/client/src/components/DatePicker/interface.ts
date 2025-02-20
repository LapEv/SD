import { Dayjs } from 'dayjs'

export interface IDateField {
  dateValue: Dayjs
  setDateValue: (text: Dayjs) => void
  sx?: Record<string, unknown>
}

export interface IDateTimeField {
  dateValue: Dayjs
  setDateValue: (text: Dayjs) => void
  sx?: Record<string, unknown>
}

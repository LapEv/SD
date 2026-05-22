import { convertTimeStringToMM, getDateTimeofSLA } from './convertDate'

interface IGetTime {
  days: number
  time: string
  timeStart: string
  timeEnd: string
  timeRegistration?: string
}

export const getSLATime = ({
  days,
  time,
  timeStart,
  timeEnd,
  timeRegistration,
}: IGetTime) => {
  const now = timeRegistration ? new Date(timeRegistration) : new Date()
  timeRegistration
    ? now.setTime(now.getTime() + now.getTimezoneOffset() * 60 * 1000)
    : null
  const day_mm = 24 * 60 * 60 * 1000
  const days_mm = days * 24 * 60 * 60 * 1000
  const time_mm = convertTimeStringToMM(time)
  const timeStart_mm = convertTimeStringToMM(timeStart)
  const timeEnd_mm = convertTimeStringToMM(timeEnd)
  const diffWorkTime =
    timeEnd_mm - timeStart_mm === 0 ? days_mm : timeEnd_mm - timeStart_mm
  const now_mm = new Date().getTime()
  const todayEnd_mm = getDateTimeofSLA(
    timeEnd_mm > 0 ? timeEnd_mm : convertTimeStringToMM('23:59:59'),
  )
  const diffWorkTimeToday = todayEnd_mm - now_mm > 0 ? todayEnd_mm - now_mm : 0
  const inDay = time_mm / diffWorkTimeToday
  const slaTS = new Date()
  if (time_mm === 0) {
    if (days_mm > 0) {
      const slaTime = now_mm + days_mm
      slaTS.setTime(slaTime)
      slaTS.setDate(slaTS.getDate())
      return { slaTS, slaDiff: days_mm }
    }
    if (days_mm <= 0) {
      slaTS.setTime(now_mm)
      slaTS.setDate(slaTS.getDate())
      return { slaTS, slaDiff: 0 }
    }
  }
  if (inDay <= 1 && diffWorkTimeToday > 0) {
    const slaTime = now_mm + time_mm + days_mm
    slaTS.setTime(slaTime)
    slaTS.setDate(slaTS.getDate())
    return { slaTS, slaDiff: slaTime - now_mm }
  }
  const nextDayStart = getDateTimeofSLA(timeStart_mm) + day_mm
  if (inDay <= 1 && diffWorkTimeToday === 0) {
    const slaTime = nextDayStart + time_mm + days_mm
    slaTS.setTime(slaTime)
    slaTS.setDate(slaTS.getDate())
    return { slaTS, slaDiff: slaTime - now_mm }
  }
  const remainderOfToday = time_mm - diffWorkTimeToday
  const diff =
    Math.floor(remainderOfToday / diffWorkTime) * day_mm +
    (remainderOfToday % diffWorkTime) +
    days_mm
  const slaTime = nextDayStart + diff
  slaTS.setTime(slaTime)
  slaTS.setDate(slaTS.getDate())
  return { slaTS, slaDiff: slaTime - now_mm }
}

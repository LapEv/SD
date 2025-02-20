interface IGetTime {
  days: string
  time: string
  timeStart: string
  timeEnd: string
}

export const getSLATime = ({ days, time, timeStart, timeEnd }: IGetTime) => {
  const now = new Date()
  const nowDateTime = now.toISOString().split('T')[0]
  const DateTimeStart = new Date(nowDateTime + 'T' + timeStart)
  const DateTimeEnd = new Date(nowDateTime + 'T' + timeEnd)
  const newTime = time.split(':')
  const secondsOffset = Number(newTime[2]) ? 1000 * Number(newTime[2]) : 0
  const minutesOffset = Number(newTime[1]) ? 1000 * 60 * Number(newTime[1]) : 0
  const hoursOffset = Number(newTime[0])
    ? 1000 * 60 * 60 * Number(newTime[0])
    : 0
  const timeOffsetMM = hoursOffset + minutesOffset + secondsOffset
  const slaTime = now.getTime() + timeOffsetMM
  const endTime = DateTimeEnd.getTime()
  const diffTime = slaTime - endTime

  if (diffTime > 0) {
    const daysNumbers = diffTime > 0 ? Number(days) + 1 : Number(days)
    DateTimeStart.setDate(DateTimeStart.getDate() + daysNumbers)
    DateTimeStart.setTime(DateTimeStart.getTime() + diffTime)
    return DateTimeStart
  }
  now.setTime(slaTime)
  now.setDate(now.getDate() + Number(days))
  return now
}

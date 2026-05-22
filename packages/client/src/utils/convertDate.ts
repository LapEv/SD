export const convertDate = (date: string) => {
  const dateArr = date.split('.')
  return dateArr.reverse().join('-')
}

export const convetStringToDate = (date: string, separator: string) => {
  const dateParts = date.split(separator)
  return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
}

export const convertINCStringToDateTime = (date: string) => {
  const dateTimeParts = date.split(/[\s,]+/)
  const dateParts = dateTimeParts[0].split('.')
  const timeParts = dateTimeParts[1].split(':')
  return new Date(
    +dateParts[2],
    +dateParts[1] - 1,
    +dateParts[0],
    +timeParts[0],
    +timeParts[1],
    +timeParts[2],
  )
}

export const convertDateToStringDDMMYYYY = (date: string) => {
  const dateArr = date.split(/-|T/)
  return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`
}

export const convertDateToStringYYYYMMDD = (date: string) => {
  const dateArr = date.split(/-|T/)
  return `${dateArr[0]}-${dateArr[1]}-${dateArr[2]}`
}

export const convertDateToStringDDMMYYYYHHMMSS = (dateTime: string) => {
  if (!dateTime) return
  const dateTimeArr = dateTime.split(/-|T/)
  const dateArr = dateTimeArr[0].split('/')
  const timeArr = dateTimeArr[1].split(':')
  return `${dateArr[0]}.${dateArr[1]}.${dateArr[2]} ${timeArr[0]}:${timeArr[1]}:${timeArr[2]}`
}

export const convertDateToStringFromDB = (dateTime: string) => {
  if (!dateTime) return
  const dateTimeArr = dateTime.split(/ /)
  const dateArr = dateTimeArr[0].split('-')
  const timeArr = dateTimeArr[1].split(':')

  return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]} ${timeArr[0]}:${
    timeArr[1]
  }:${timeArr[2].split('.')[0]}`
}

export const convertDateToStringFromDBT = (dateTime: string) => {
  if (!dateTime) return
  const dateTimeArr = dateTime.split(/T/)
  const dateArr = dateTimeArr[0].split('-')
  const timeArr = dateTimeArr[1].split(':')
  return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]} ${timeArr[0]}:${
    timeArr[1]
  }:${timeArr[2].split('.')[0]}`
}

export const convertTimeStampToString = (dateTime: string) => {
  if (!dateTime) return
  const dateTimeArr = dateTime.split(/-|T/)
  const timeArr = dateTimeArr[3].split(/[:.]/)
  return `${dateTimeArr[2]}.${dateTimeArr[1]}.${dateTimeArr[0]} ${timeArr[0]}:${timeArr[1]}:${timeArr[2]}`
}

export const convertTimeStringToMM = (time: string) => {
  if (!time) return 0
  const timeArr = time.split(/[:.]/)
  const hh_seconds = Number(timeArr[0]) * 60 * 60
  const mm_seconds = Number(timeArr[1]) * 60
  const ss_seconds = Number(timeArr[2])
  return (hh_seconds + mm_seconds + ss_seconds) * 1000
}

export const getDateTimeofSLA = (time: number) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Начало дня
  const timestamp = today.getTime()
  return timestamp + time
}

export const convertToCurrentTZ = (dateTime: string) => {
  if (!dateTime) return dateTime
  const TZTimeTS = new Date().getTimezoneOffset() * 60 * 1000
  const dateTimeTS = new Date(dateTime).getTime()
  const _dateTimeTS = dateTimeTS - TZTimeTS
  const _dateTime = new Date(_dateTimeTS)
  return _dateTime.toISOString()
}

export const convertTSToCurrentTZ = (dateTime: string) => {
  if (!dateTime) return dateTime
  const ts_tz = convertToCurrentTZ(dateTime)
  return convertTimeStampToString(ts_tz)
}

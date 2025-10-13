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

export const convertDateToStringFromDBT = (dateTime: string) => {
  if (!dateTime) return
  const dateTimeArr = dateTime.split(/T/)
  const dateArr = dateTimeArr[0].split('-')
  const timeArr = dateTimeArr[1].split(':')
  return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]} ${timeArr[0]}:${
    timeArr[1]
  }:${timeArr[2].split('.')[0]}`
}

export const convertDateToString = (date: Date) => {
  const year = date.toISOString().slice(0, 4)
  const month = date.toISOString().slice(5, 7)
  const day = date.toISOString().slice(8, 10)
  const hour = date.toISOString().slice(11, 13)
  const min = date.toISOString().slice(14, 16)
  const sec = date.toISOString().slice(17, 19)
  return `${day}.${month}.${year} ${hour}:${min}:${sec}`
}

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
    +timeParts[2]
  )
}

export const convertDateToStringFromDB = (dateTime: string) => {
  if (!dateTime) return
  const dateTimeArr = dateTime.split(/T/)
  const dateArr = dateTimeArr[0].split('-')
  const timeArr = dateTimeArr[1].split(':')
  return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]} ${timeArr[0]}:${
    timeArr[1]
  }:${timeArr[2].split('.')[0]}`
}

export const convertDateToString = (date: Date) => {
  const dateValues = [
    date.getFullYear().toString(),
    date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : (date.getMonth() + 1).toString(),
    date.getDate() < 10 ? `0${date.getDate()}` : date.getDate().toString(),
    date.getHours() < 10 ? `0${date.getHours()}` : date.getHours().toString(),
    date.getMinutes() < 10
      ? `0${date.getMinutes()}`
      : date.getMinutes().toString(),
    date.getSeconds() < 10
      ? `0${date.getSeconds()}`
      : date.getSeconds().toString(),
  ]

  return `${dateValues[2]}.${dateValues[1]}.${dateValues[0]} ${dateValues[3]}:${
    dateValues[3]
  }:${dateValues[5].toString().split('.')[0]}`
}

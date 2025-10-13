export const convertTime = (timeInMin: number) => {
  const hours = Math.trunc(timeInMin / 60)
  const min = timeInMin - hours * 60
  const hours_str = hours > 0 ? `${hours} ч ` : ''
  return `${hours_str}${min} м`
}

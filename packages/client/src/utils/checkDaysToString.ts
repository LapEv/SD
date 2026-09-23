export const checkDaysToString = (days: number) => {
  if (days === 0) return ''
  if (days > 10 && [11, 12, 13, 14].includes(days % 100)) return `${days} дней `
  const last_num = days % 10
  if (last_num == 1) return `${days} `
  if ([2, 3, 4].includes(last_num)) return `${days} `
  if ([5, 6, 7, 8, 9, 0].includes(last_num)) return `${days} дней `
}

import { descendingComparator } from './descendingComparator'

export type Order = 'asc' | 'desc'

export function getComparator<Key extends keyof number | string>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string | string[] },
  b: { [key in Key]: number | string | string[] },
) => number {
  return order.toLowerCase() === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

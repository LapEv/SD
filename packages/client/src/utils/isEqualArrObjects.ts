import { sortArrayOfObjects } from './sortArrayOfObjects'
import { deepEqual } from './deepEqual'

export const isEqualArrObjects = (array1: [], array2: [], key: string) => {
  if (!array2 || array2.length < 0) return false
  if (array1.length !== array2.length) return false
  const arr1 = sortArrayOfObjects([...array1], key, 'ascending')
  const arr2 = sortArrayOfObjects([...array2], key, 'ascending')
  return arr1.findIndex((item, index) => !deepEqual(item, arr2[index])) >= 0
    ? false
    : true
}

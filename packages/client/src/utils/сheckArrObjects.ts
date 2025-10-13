import { deepEqual } from './deepEqual'

type arr1 = {
  id: string
  models: string
}[]

type arr2 = {
  id: string
  models: string
}[]

export const сheckArrObjects = (array1: arr1, array2: arr2) => {
  if (!array2 || array2.length < 0) return false
  const arr1 = [...array1]
  const arr2 = [...array2]
  arr1.sort()
  arr2.sort()
  return arr1
    .filter((item, index) => !deepEqual(item, arr2[index]))
    .map(item => {
      return {
        id: item.id,
        models: item.models,
      }
    })
}

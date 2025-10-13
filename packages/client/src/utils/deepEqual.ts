import { isEqualArr } from './isEqualArr'
import { isObject } from './isObject'

export type PlainObject<T = unknown> = {
  [k in string | symbol]: T
}

export function deepEqual<T>(
  object1: PlainObject<T>,
  object2: PlainObject<T>
): boolean {
  if (!isObject(object1) || !isObject(object2)) {
    return object1 === object2
  }
  const keys1 = Object.keys(object1)
  const keys2 = Object.keys(object2)
  if (keys1.length !== keys2.length) {
    return false
  }
  for (const key of keys1) {
    const val1 = object1[key]
    const val2 = object2[key]
    const areObjects = isObject(val1) && isObject(val2)
    if (
      areObjects &&
      !deepEqual(val1 as PlainObject<T>, val2 as PlainObject<T>)
    ) {
      return false
    }
    if (!areObjects && val1 !== val2 && !Array.isArray(val1)) {
      return false
    }
    if (
      !areObjects &&
      Array.isArray(val1) &&
      !isEqualArr(val1 as [], val2 as [])
    ) {
      return false
    }
  }
  return true
}

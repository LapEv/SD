export const isEqualArr = (array1: [], array2: []) => {
  if (!array2 || array2.length < 0) return false
  const arr1 = [...array1]
  const arr2 = [...array2]
  arr1.sort()
  arr2.sort()
  return (
    arr1.length === arr2.length &&
    arr1.every(function (element: unknown, index: number) {
      return element === arr2[index]
    })
  )
}

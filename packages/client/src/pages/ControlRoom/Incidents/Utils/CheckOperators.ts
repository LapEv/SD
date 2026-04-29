import { INC_CellType, IOperator } from '../interfaces'

export const CheckOperators = (type: INC_CellType, operators: IOperator[]) => {
  if (type === 'value') return operators
  if (type === 'dateTime')
    return operators.filter(
      ({ operator }) =>
        operator !== 'contains' &&
        operator !== 'doesNotContain' &&
        operator !== 'equals' &&
        operator !== 'doesNotEqual',
    )
  if (type === 'boolean')
    return operators.filter(
      ({ operator }) =>
        operator !== 'contains' &&
        operator !== 'doesNotContain' &&
        operator !== 'startsWith' &&
        operator !== 'endsWith' &&
        operator !== 'isEmpty' &&
        operator !== 'isNotEmpty' &&
        operator !== 'doesNotEqual',
    )
  if (type === 'list')
    return operators.filter(
      ({ operator }) =>
        operator !== 'contains' &&
        operator !== 'doesNotContain' &&
        operator !== 'startsWith' &&
        operator !== 'endsWith',
      // &&
      // operator !== 'isEmpty' &&
      // operator !== 'isNotEmpty',
    )

  return operators
}

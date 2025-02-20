import { INC_Column } from '../interfaces'

export const FilterOptions = () => {
  const sortStorage = localStorage.getItem('sortColumn') as string
  const { name, direction } = sortStorage
    ? JSON.parse(sortStorage)
    : { name: 'incident', direction: 'asc' }

  const limitStorage = localStorage.getItem('numberOfRows') as string
  const limit = limitStorage ? JSON.parse(limitStorage) : 15

  const pageStorage = localStorage.getItem('currentPage') as string
  const page = pageStorage ? JSON.parse(pageStorage) : 0

  const filterStorage = localStorage.getItem('filterOptions') as string
  const filterOptions = filterStorage ? JSON.parse(filterStorage) : []

  return {
    limit,
    nameSort: name ?? 'incident',
    direction: direction ?? 'asc',
    page,
    filterOptions,
  }
}

export const setFilter = (INCColumn: INC_Column[], filterList: string[][]) => {
  const columnsData = INCColumn.map(({ name }) => name)

  const filterData =
    filterList && filterList.length
      ? filterList
          .map((item: string[], index: number) => {
            if (item && item.length > 0) {
              return item.map(value => {
                return {
                  [columnsData[index]]: value,
                }
              })
            }
          })
          .filter(item => item)
      : []
  const filterOptions = filterData && filterData.length ? filterData : []
  localStorage.setItem('filterOptions', JSON.stringify(filterOptions))
  return filterOptions
}

import { Checkbox, TableBody, TableCell, TableRow } from '@mui/material'
import { useIncidents } from 'hooks/incidents/useINC'
import { useTableINC } from 'hooks/tableINC/useTableINC'
import { useEffect, useMemo } from 'react'
import { getComparator } from 'utils/getComparator'
import { Cells } from './components/Cells'
import { columnData } from './data'
import { useFilterINCData } from 'hooks/useFilterINCData'

export const INCBody = () => {
  const [{ incidents }, { setFilteredLength, setFiltered }] = useIncidents()
  const [
    {
      order,
      orderBy,
      page,
      rowsPerPage,
      dense,
      selected,
      columnOptions,
      filterListOptions,
      searchValue,
    },
    { setSelected },
  ] = useTableINC()
  const filteredINCs = useFilterINCData(
    incidents,
    filterListOptions,
    searchValue,
  )

  const selectClick = (id: string) => {
    const selectedIndex = selected.indexOf(id)
    selectedIndex > -1
      ? setSelected(selected.filter(item => item !== id))
      : setSelected([id, ...selected])
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredINCs.length) : 0

  const visibleRows = useMemo(
    () =>
      [...filteredINCs]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, filteredINCs],
  )

  const prepareDataColumn = useMemo(
    () =>
      columnData
        .map(value => {
          const newData = columnOptions.find(item => item.id === value.id)
          return newData
            ? {
                ...value,
                width: newData.width,
                disableColumn: newData.disableColumn,
                number: newData.number,
              }
            : value
        })
        .filter(item => item)
        .sort((a, b) => (a?.number as number) - (b?.number as number)),
    [columnOptions, columnData],
  )

  useEffect(() => {
    setFilteredLength(filteredINCs.length)
    setFiltered(filteredINCs)
  }, [filterListOptions])

  return (
    <TableBody>
      {visibleRows.map((row, index) => {
        const isItemSelected = selected.includes(row.id)
        const labelId = `enhanced-table-checkbox-${index}`

        return (
          <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={row.id}
            selected={isItemSelected}>
            <TableCell padding="checkbox" onClick={() => selectClick(row.id)}>
              <Checkbox color="primary" checked={isItemSelected} size="small" />
            </TableCell>
            {prepareDataColumn.map(
              ({ id, type, width, minWidth, disableColumn }) =>
                !disableColumn && (
                  <Cells
                    key={`${id}_${type}`}
                    value={row[id as keyof typeof row] as string}
                    type={type}
                    width={width}
                    labelId={labelId}
                    minWidth={minWidth}
                    id={id}
                    row={row}
                  />
                ),
            )}
          </TableRow>
        )
      })}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: (dense ? 33 : 53) * emptyRows,
          }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  )
}

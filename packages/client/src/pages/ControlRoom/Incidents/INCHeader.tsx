import { TableRow, TableHead } from '@mui/material'
import { columnData } from './data'
import { useTableINC } from 'hooks/tableINC/useTableINC'
import { useMemo } from 'react'
import { Columns } from './components/HeaderColumns/Columns'
import { CheckBoxColumns } from './components/HeaderColumns/CheckBoxColumns'

export const INCHeader = () => {
  const [{ columnOptions }] = useTableINC()
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

  return (
    <TableHead>
      <TableRow>
        <CheckBoxColumns />
        {prepareDataColumn.map((cell, index) =>
          index <= 1 ? (
            <Columns key={cell.id} cell={cell} index={index} />
          ) : (
            !cell.disableColumn && (
              <Columns key={cell.id} cell={cell} index={index} />
            )
          ),
        )}
      </TableRow>
    </TableHead>
  )
}

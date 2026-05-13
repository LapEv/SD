import { MuiDiv } from 'components/MUI'
import { IColumns, INC_Data, INC_HeadCell } from '../../interfaces'
import { useTableINC } from 'hooks/tableINC/useTableINC'
import { Box, Divider, TableCell, TableSortLabel } from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { DragEvent, MouseEvent, useRef } from 'react'

export const Columns = ({ cell, index }: IColumns) => {
  const [
    { columnX, columnOptions, order, orderBy, activeDragCell },
    { setColumnX, setOrder, setOrderBy, setActiveDragCell, setColumnOptions },
  ] = useTableINC()
  const refSort = useRef<HTMLTableCellElement>(null)

  const handleRequestSort = (property: keyof INC_Data) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const createSortHandler =
    (property: keyof INC_Data, sortable: boolean | undefined) => () => {
      if (!sortable) return
      handleRequestSort(property)
    }

  const mouseDown = (e: MouseEvent<HTMLElement>) => {
    setColumnX({ position: e.screenX, id: cell.id, width: cell.width })
    refSort.current?.classList.add('resizeColumn')
  }

  const handleDragStart = (
    e: DragEvent<HTMLSpanElement>,
    cell: INC_HeadCell,
  ) => {
    setActiveDragCell(cell)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
  }

  const handleDrop = (target: INC_HeadCell) => {
    if (!activeDragCell) return
    const currentIndex = columnOptions?.findIndex(
      ({ id }) => id === activeDragCell.id,
    )
    const targetIndex = columnOptions?.findIndex(({ id }) => id === target.id)
    const arr = [...new Set(columnOptions)]
    arr?.splice(currentIndex, 1)
    arr?.splice(targetIndex, 0, activeDragCell)
    const newState = arr.map((item, index) => {
      const newObj = { ...item }
      newObj.number = index + 1
      return newObj
    })
    setColumnOptions(newState)
  }

  return (
    <TableCell
      variant="head"
      aria-colindex={index + 1}
      align={cell.numeric ? 'right' : 'left'}
      padding={cell.disablePadding ? 'none' : 'normal'}
      className="tableHeader"
      draggable={columnX.position > 0 ? false : true}
      onDragStart={e => handleDragStart(e, cell)}
      onDragOver={handleDragOver}
      onDragEnd={() => setActiveDragCell(null)}
      onDrop={() => handleDrop(cell)}
      sx={{
        width: cell.width,
        minWidth: cell.width,
        zIndex: columnOptions.length + 3 - index,
      }}>
      <MuiDiv role="presentation" className="tableHeaderCell">
        <TableSortLabel
          ref={refSort}
          active={orderBy === cell.id}
          direction={orderBy === cell.id ? order : 'asc'}
          sx={{
            width: cell.width,
            minWidth: cell.width,
            cursor:
              columnX.id !== ''
                ? 'col-resize'
                : cell.sortable
                  ? 'pointer'
                  : 'auto',
          }}
          className={cell.id === 'edit' ? 'editBox' : ''}
          hideSortIcon={!cell.sortable}
          onClick={createSortHandler(cell.id, cell.sortable)}>
          {cell.id === 'edit' ? (
            String.fromCharCode(Number(cell.label))
          ) : (
            <Box className={'headLabelBox'}>{cell.label}</Box>
          )}
          {orderBy === cell.id ? (
            <Box component="span" sx={visuallyHidden}>
              {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
            </Box>
          ) : null}
        </TableSortLabel>
      </MuiDiv>
      <MuiDiv className="separatorContainer" onMouseDown={mouseDown}>
        <Divider
          orientation="vertical"
          className="separator"
          sx={{
            height: '100%',
          }}
        />
      </MuiDiv>
    </TableCell>
  )
}

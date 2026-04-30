import { useSelector } from 'react-redux'
import { RootState } from 'store/index'
import { useAppDispatch } from 'store/hooks'
import { TableINCState } from 'store/slices/tableINC/interfaces'
import { TableINCActions } from './tableINCActions'
import {
  setSettings,
  setOrder,
  setOrderBy,
  setPage,
  setRowsPerPage,
  setDense,
  setColumnBorder,
  setCellBorder,
  setTimeInterval,
  setSelected,
  setColumnOptions,
  setColumnX,
  setActiveDragCell,
  setFilterListOptions,
  setSearchValue,
  setModal,
} from 'store/slices/tableINC'

export function useTableINC(): [TableINCState, TableINCActions] {
  const tableINC = useSelector((state: RootState) => state.tableINC)
  const dispatch = useAppDispatch()

  return [
    tableINC,
    {
      setSettings(data) {
        dispatch(setSettings(data))
      },

      setOrder(data) {
        dispatch(setOrder(data))
      },
      setOrderBy(data) {
        dispatch(setOrderBy(data))
      },
      setPage(data) {
        dispatch(setPage(data))
      },
      setRowsPerPage(data) {
        dispatch(setRowsPerPage(data))
      },
      setDense(data) {
        dispatch(setDense(data))
      },
      setColumnBorder(data) {
        dispatch(setColumnBorder(data))
      },
      setCellBorder(data) {
        dispatch(setCellBorder(data))
      },
      setTimeInterval(data) {
        dispatch(setTimeInterval(data))
      },
      setSelected(data) {
        dispatch(setSelected(data))
      },
      setColumnOptions(data) {
        dispatch(setColumnOptions(data))
      },
      setColumnX(data) {
        dispatch(setColumnX(data))
      },
      setActiveDragCell(data) {
        dispatch(setActiveDragCell(data))
      },
      setFilterListOptions(data) {
        dispatch(setFilterListOptions(data))
      },
      setSearchValue(data) {
        dispatch(setSearchValue(data))
      },
      setModal(data) {
        dispatch(setModal(data))
      },
    },
  ]
}

import { createSlice } from '@reduxjs/toolkit'
import {
  IFilterListOptions,
  ILogicOperator,
  ILogicOperatorLabel,
  TableINCState,
} from './interfaces'
import {
  columnData,
  getColumnOptions,
  notificationsDataINC,
  operators,
  rowsPerPageOptions,
  SETTINGS_DEFAULT,
  SETTINGS_STORAGE_KEY,
} from 'pages/ControlRoom/Incidents/data'

const initialState: TableINCState = {
  dense: false,
  order: 'asc',
  orderBy: 'incident',
  page: 0,
  rowsPerPage: rowsPerPageOptions[0],
  showCellBorders: false,
  showColumnBorders: false,
  timeInterval: 183,
  selected: [],
  columnOptions: getColumnOptions(),
  columnX: {
    position: 0,
    id: '',
    width: 0,
  },
  filterListOptions: SETTINGS_DEFAULT.filterListOptions,
  searchValue: '',
  activeDragCell: null,
  modal: {
    active: false,
    image: '',
    id: '',
    incident: '',
  },
  columnDataList: {
    incStatuses: [],
  },
  notificationsINC: notificationsDataINC,
  toCloud: false,
}

const setLocalStorage = (state: TableINCState) => {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { columnX, searchValue, modal, toCloud, ...newState } = state
  /* eslint-enable @typescript-eslint/no-unused-vars */
  return newState
}

const checkfirstElement = (data: IFilterListOptions[]) => {
  const checkEmptyData =
    data.length > 1
      ? data.filter(item => {
          if (item.column === columnData[3].id && item.value === '') {
            return false
          }
          if (
            item.operator !== operators[6].operator &&
            item.operator !== operators[7].operator &&
            item.value === ''
          ) {
            return false
          }
          return item
        })
      : data
  const checkEmptyOperator = checkEmptyData.map(item => {
    if (
      item.operator === operators[6].operator ||
      item.operator === operators[7].operator
    ) {
      return { ...item, value: '' }
    }
    return item
  })
  return checkEmptyOperator.map((item, index) =>
    index === 0
      ? {
          ...item,
          id: index + 1,
          logicOperator: ILogicOperator.and,
          logicOperatorLabel: ILogicOperatorLabel.and,
        }
      : { ...item, id: index + 1 },
  )
}

export const tableINCSlise = createSlice({
  name: 'tableINC',
  initialState,
  reducers: {
    setSettings(state, action) {
      state.dense = action.payload.dense ?? initialState.dense
      state.order = action.payload.order ?? initialState.order
      state.orderBy = action.payload.orderBy ?? initialState.orderBy
      state.page = action.payload.page ?? initialState.page
      state.rowsPerPage = action.payload.rowsPerPage ?? initialState.rowsPerPage
      state.showCellBorders =
        action.payload.showCellBorders ?? initialState.showCellBorders
      state.showColumnBorders =
        action.payload.showColumnBorders ?? initialState.showColumnBorders
      state.timeInterval =
        action.payload.timeInterval ?? initialState.timeInterval
      state.selected = action.payload.selected ?? initialState.selected
      state.columnOptions =
        action.payload.columnOptions ?? initialState.columnOptions
      state.columnX = action.payload.columnX ?? initialState.columnX
      state.filterListOptions =
        action.payload.filterListOptions ?? initialState.filterListOptions
      state.notificationsINC =
        action.payload.notificationsINC ?? initialState.notificationsINC
    },
    setSettingsFromTemplate(state, { payload }) {
      const {
        dense,
        order,
        orderBy,
        rowsPerPage,
        showCellBorders,
        showColumnBorders,
        timeInterval,
        filterListOptions,
      } = payload
      state.dense = dense
      state.order = order
      state.orderBy = orderBy
      state.rowsPerPage = rowsPerPage
      state.showCellBorders = showCellBorders
      state.showColumnBorders = showColumnBorders
      state.timeInterval = timeInterval
      state.filterListOptions = filterListOptions
    },
    setOrder(state, action) {
      state.order = action.payload
      const stateForLocalStorage = setLocalStorage(state)
      localStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify({ ...stateForLocalStorage, order: action.payload }),
      )
      state.toCloud = true
    },
    setOrderBy(state, action) {
      state.orderBy = action.payload
      const stateForLocalStorage = setLocalStorage(state)
      localStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify({ ...stateForLocalStorage, orderBy: action.payload }),
      )
      state.toCloud = true
    },
    setPage(state, action) {
      state.page = action.payload
      const stateForLocalStorage = setLocalStorage(state)
      localStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify({ ...stateForLocalStorage, page: action.payload }),
      )
      state.toCloud = true
    },
    setRowsPerPage(state, action) {
      state.rowsPerPage = action.payload
      const stateForLocalStorage = setLocalStorage(state)
      localStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify({
          ...stateForLocalStorage,
          rowsPerPage: action.payload,
        }),
      )
      state.toCloud = true
    },
    setDense(state, action) {
      state.dense = action.payload
      const stateForLocalStorage = setLocalStorage(state)
      localStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify({ ...stateForLocalStorage, dense: action.payload }),
      )
      state.toCloud = true
    },
    setColumnBorder(state, action) {
      state.showColumnBorders = action.payload
      const stateForLocalStorage = setLocalStorage(state)
      localStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify({
          ...stateForLocalStorage,
          showColumnBorders: action.payload,
        }),
      )
      state.toCloud = true
    },
    setCellBorder(state, action) {
      state.showCellBorders = action.payload
      const stateForLocalStorage = setLocalStorage(state)
      localStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify({
          ...stateForLocalStorage,
          showCellBorders: action.payload,
        }),
      )
      state.toCloud = true
    },
    setTimeInterval(state, action) {
      state.timeInterval = action.payload
      const stateForLocalStorage = setLocalStorage(state)
      localStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify({
          ...stateForLocalStorage,
          timeInterval: action.payload,
        }),
      )
      state.toCloud = true
    },
    setNotificationsINC(state, action) {
      state.notificationsINC = action.payload
      const stateForLocalStorage = setLocalStorage(state)
      localStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify({
          ...stateForLocalStorage,
          notificationsINC: action.payload,
        }),
      )
      state.toCloud = true
    },
    setSelected(state, action) {
      state.selected = action.payload
      const stateForLocalStorage = setLocalStorage(state)
      localStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify({
          ...stateForLocalStorage,
          selected: action.payload,
        }),
      )
      state.toCloud = true
    },
    setColumnOptions(state, action) {
      state.columnOptions = action.payload
      const stateForLocalStorage = setLocalStorage(state)
      localStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify({
          ...stateForLocalStorage,
          columnOptions: action.payload,
        }),
      )
      state.toCloud = true
    },
    setColumnX(state, action) {
      state.columnX = action.payload
      state.columnOptions = state.columnOptions.map(item =>
        item.id === action.payload.id
          ? { ...item, width: action.payload.width }
          : item,
      )
    },
    setActiveDragCell(state, action) {
      state.activeDragCell = action.payload
    },
    setFilterListOptions(state, action) {
      const _checkfirstElement = checkfirstElement(action.payload)
      state.filterListOptions = _checkfirstElement
      const stateForLocalStorage = setLocalStorage(state)
      localStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify({
          ...stateForLocalStorage,
          filterListOptions: _checkfirstElement,
        }),
      )
      state.toCloud = true
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload
    },
    setModal(state, action) {
      state.modal = action.payload
    },
    setToCloud(state, action) {
      state.modal = action.payload
    },
  },
})

export const tableINCReducer = tableINCSlise.reducer
export const {
  setSettings,
  setSettingsFromTemplate,
  setOrderBy,
  setOrder,
  setPage,
  setRowsPerPage,
  setDense,
  setColumnBorder,
  setCellBorder,
  setTimeInterval,
  setNotificationsINC,
  setSelected,
  setColumnOptions,
  setColumnX,
  setActiveDragCell,
  setFilterListOptions,
  setSearchValue,
  setModal,
  setToCloud,
} = tableINCSlise.actions

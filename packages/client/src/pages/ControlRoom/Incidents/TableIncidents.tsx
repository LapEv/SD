import React, { memo, useEffect, useState } from 'react'
import {
  MUIDataTableMeta,
  MUIDataTableOptions,
  MUIDataTableState,
} from 'mui-datatables'
import { emptyModalImage, textLabels } from './data'
import { DataTable } from 'components/DataTable'
import { TableCell, TableRow, useTheme, Modal, Box } from '@mui/material'
import { INC_Column, ITableMeta } from './interfaces'
import {
  Executor,
  UserResponsible,
  IncidentData,
  Status,
  StatusSLACell,
  FilterOptions,
  AdditionalMenu,
  GetIndicatorData,
  CustomCell,
  useSearchedINCs,
} from './'
import { useIncidents } from 'hooks/incidents/useINC'
import { setFilter } from './Utils/FilterOptions'
import { ChooseModal } from './Modals'
import { LinearProgressWithLabel } from 'components/LinearProgress/LinearProgress'
import { ModalImageProps } from './Modals/interfaces'
import { ITheme, ThemeMode } from 'themes/themeConfig'
import { idINC } from './Components/interfaces'

export const TableIncidents = memo(() => {
  const modalClientRef = React.createRef()
  const [modal, setModal] = useState<boolean>(false)
  const [modalImage, setModalImage] = useState<ModalImageProps>(emptyModalImage)
  const [
    { incidents, countIncidents, filterListData, incStatuses, outputFilter },
    { getINCs, changeComment, setStateOutputFilter },
  ] = useIncidents()
  const [search, setSearch] = useState<string | null>('')
  const searchedINCs = useSearchedINCs(incidents, search)

  const [heightINCData, setHeightINCData] = useState<number>(0)
  const [filterDialogOpen, setFilterDialogOpen] = useState<boolean>(false)
  const [denseTable, setDenseTable] = useState<boolean>(
    localStorage.getItem('IncidentsDenseTable') === '1' ? true : false,
  )
  const [dragTable, setDragTable] = useState<boolean>(false)
  const theme = useTheme()

  const changeINC = ({ id, incident, incidents }: idINC) => {
    const inc = incidents?.find(item => item.id === id)
    const newStateNumber =
      (incStatuses.find(
        item => item.stateNumber === inc?.IncindentStatus?.stateNumber,
      )?.stateNumber as number) + 1
    const id_incStatus = incStatuses.find(
      item => item.stateNumber === newStateNumber,
    )?.id as string
    const status = incStatuses.find(item => item.stateNumber === newStateNumber)
      ?.statusINC as string
    setModal(true)
    setModalImage({
      image: 'changeIncident',
      id,
      incident,
      inc,
      options: {
        contract: false,
        object: false,
        sla: true,
        typeOfWork: true,
        equipment: true,
        model: true,
        typicalMalfunction: true,
        status,
        id_incStatus,
      },
    })
  }

  const INCColumn: INC_Column[] = [
    {
      name: 'id',
      label: 'ID',
      options: {
        filter: false,
        sort: false,
        display: false,
        viewColumns: true,
      },
    },
    {
      name: 'statusIndicator',
      label: 'Индикатор',
      options: {
        filter: false,
        sort: false,
        display: true,
        viewColumns: true,
        draggable: false,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (_: string, { rowData }: MUIDataTableMeta) => {
          const { percent, indicator, value, timeleft } = GetIndicatorData({
            timeSLA: rowData[7] ?? '',
            timeReg: rowData[17],
            timeCloseCheck: rowData[31] ?? '',
            inc: rowData[2],
            status: rowData[8],
          })
          return (
            <Box>
              <LinearProgressWithLabel
                variant="determinate"
                sx={{ backgroundColor: indicator ?? '#000000' }}
                percent={percent}
                value={value}
              />
              {timeleft}
            </Box>
          )
        },
      },
    },
    {
      name: 'incident',
      label: 'Инцидент *',
      options: {
        filter: false,
        sort: true,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },
    {
      name: 'parentalIncident',
      label: 'Родительский',
      options: {
        filter: false,
        sort: false,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },
    {
      name: 'relatedIncident',
      label: 'Связанный',
      options: {
        filter: false,
        sort: false,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },
    {
      name: 'numberINC',
      label: 'Номер *',
      options: {
        filter: false,
        sort: true,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },
    {
      name: 'clientINC',
      label: 'Номер Клиента *',
      options: {
        filter: false,
        sort: true,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },
    {
      name: 'timeSLA',
      label: 'SLA *',
      options: {
        filter: false,
        sort: true,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },
    {
      name: 'status',
      label: 'Статус *',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
        filterOptions: {
          names: filterListData.status,
        },
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string, { rowData }: ITableMeta) => {
          return (
            <Status
              value={value ?? ''}
              id={rowData[0]}
              incident={rowData[2]}
              responsible={rowData[24]}
              currentStatus={rowData[8]}
              timeSLA={rowData[7] ?? ''}
              changeINC={changeINC}
            />
          )
        },
      },
    },
    {
      name: 'client',
      label: 'Клиент *',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
        filterOptions: {
          names: filterListData.client,
        },
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },
    {
      name: 'legalName',
      label: 'Клиент Юр *',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
        filterOptions: {
          names: filterListData.legalName,
        },
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },

    {
      name: 'contract',
      label: 'Контракт *',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
        filterOptions: {
          names: filterListData.contract,
        },
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },
    {
      name: 'object',
      label: 'Объект *',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
        filterOptions: {
          names: filterListData.object,
        },
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },
    {
      name: 'address',
      label: 'Адрес *',
      options: {
        filter: true,
        sort: false,
        display: true,
        viewColumns: true,
        filterOptions: {
          names: filterListData.address,
        },
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },
    {
      name: 'coordinates',
      label: 'Координаты',
      options: {
        filter: false,
        sort: false,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },

    {
      name: 'region',
      label: 'Регион *',
      options: {
        filter: true,
        sort: false,
        display: true,
        viewColumns: true,
        filterOptions: {
          names: filterListData.region,
        },
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },
    {
      name: 'userAccepted',
      label: 'Кто принял *',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
        filterOptions: {
          names: filterListData.userAccepted,
        },
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },
    {
      name: 'timeRegistration',
      label: 'Время регистрации *',
      options: {
        filter: false,
        sort: true,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },
    {
      name: 'sla',
      label: 'Тип инцидента *',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
        filterOptions: {
          names: filterListData.sla,
        },
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },

    {
      name: 'methodsReuqest',
      label: 'Тип регистрации *',
      options: {
        filter: false,
        sort: true,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },
    {
      name: 'equipment',
      label: 'Оборудование *',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
        filterOptions: {
          names: filterListData.equipment,
        },
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },
    {
      name: 'model',
      label: 'Модель *',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
        filterOptions: {
          names: filterListData.model,
        },
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },
    {
      name: 'typicalMalfunction',
      label: 'Неисправность',
      options: {
        filter: false,
        sort: false,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },
    {
      name: 'executor',
      label: 'Исполнитель *',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
        filterOptions: {
          names: filterListData.executor,
        },
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string, { rowData }: ITableMeta) => {
          return (
            <Executor
              value={value ?? ''}
              id={rowData[0]}
              incident={rowData[2]}
              responsible={rowData[24]}
            />
          )
        },
      },
    },
    {
      name: 'responsible',
      label: 'Ответственный *',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
        filterOptions: {
          names: filterListData.responsible,
        },
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string, { rowData }: ITableMeta) => {
          return (
            <UserResponsible
              value={value ?? ''}
              id={rowData[0]}
              incident={rowData[2]}
              responsible={rowData[24]}
            />
          )
        },
      },
    },
    {
      name: 'timeInWork',
      label: 'Время в работу',
      options: {
        filter: false,
        sort: false,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },
    {
      name: 'description',
      label: 'Описание',
      options: {
        filter: false,
        sort: false,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },
    {
      name: 'comment',
      label: 'Комментарий',
      options: {
        filter: false,
        sort: false,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },
    {
      name: 'applicant',
      label: 'Заявитель',
      options: {
        filter: false,
        sort: false,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },
    {
      name: 'applicantContacts',
      label: 'Контакты заявителя',
      options: {
        filter: false,
        sort: false,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },

    {
      name: 'userClosingCheck',
      label: 'Перевел в выполнение',
      options: {
        filter: false,
        sort: false,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },
    {
      name: 'timeCloseCheck',
      label: 'Время выполнения',
      options: {
        filter: false,
        sort: false,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },
    {
      name: 'typeCompletedWork',
      label: 'Тип выполненных работ',
      options: {
        filter: false,
        sort: false,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },
    {
      name: 'commentCloseCheck',
      label: 'Комментарии к выполнению',
      options: {
        filter: false,
        sort: false,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },
    {
      name: 'overdue',
      label: 'Статус SLA *',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
        filterOptions: {
          names: filterListData.overdue,
        },
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <StatusSLACell value={value ?? ''} />
        },
      },
    },

    {
      name: 'act',
      label: 'Акты',
      options: {
        filter: false,
        sort: false,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },
    {
      name: 'spaceParts',
      label: 'ЗИП',
      options: {
        filter: false,
        sort: false,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },
    {
      name: 'userClosing',
      label: 'Закрыл',
      options: {
        filter: false,
        sort: false,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },
    {
      name: 'timeClose',
      label: 'Время закрытия',
      options: {
        filter: false,
        sort: false,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },
    {
      name: 'commentClose',
      label: 'Комментарии к закрытию',
      options: {
        filter: false,
        sort: false,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },
    {
      name: 'rating',
      label: 'Оценка',
      options: {
        filter: false,
        sort: false,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} />
        },
      },
    },
  ]

  const [tableColumn] = useState<INC_Column[]>(INCColumn)

  const setDenseTableFunc = (state: boolean) => {
    setDenseTable(state)
    localStorage.setItem('IncidentsDenseTable', state ? '1' : '0')
  }

  const getcolumnOrderStorage = () => {
    const columnOrderStorage = localStorage
      .getItem('IncidentsColumnOrder')
      ?.split(',')
      .map(Number)
    if (columnOrderStorage && columnOrderStorage?.length > 1) {
      if (INCColumn.length !== columnOrderStorage.length) {
        const newOrder = INCColumn.map((item, index) =>
          columnOrderStorage.findIndex(value => value === index) >= 0
            ? columnOrderStorage.findIndex(value => value === index)
            : index,
        )
        return newOrder
      }
      return columnOrderStorage
    }
    return INCColumn.map((item, index) => index)
  }

  const handleTableInit = (action: string, tableState: MUIDataTableState) => {
    const columnViewStorage = localStorage
      .getItem('IncidentsViewColumns')
      ?.split(',')
    if (columnViewStorage && columnViewStorage?.length > 1) {
      tableColumn.map(
        item =>
          (item.options.display = !columnViewStorage?.includes(item.name)
            ? true
            : false),
      )
    }
    const filterListStorage = JSON.parse(
      localStorage.getItem('filterList') as string,
    )
    if (filterListStorage && filterListStorage?.length > 1) {
      tableState.filterList = filterListStorage
    }
  }

  const handleTableChange = (action: string, tableState: MUIDataTableState) => {
    if (action === 'propsUpdate' && outputFilter.isOutputFilter) {
      tableState.filterList = JSON.parse(
        localStorage.getItem('filterList') as string,
      )
      setStateOutputFilter({
        isOutputFilter: false,
        filterID: '',
        filterText: '',
      })
      const { nameSort, direction, limit, page } = FilterOptions()
      const filterOptions = JSON.parse(
        localStorage.getItem('filterOptions') as string,
      )

      getINCs({
        limit,
        nameSort,
        direction,
        page,
        filterOptions,
      })
      return
    }
    if (action === 'viewColumnsChange') {
      const display = tableState.columns
        .map(({ display, name }) =>
          name === 'id' || display === 'false' ? name : null,
        )
        .filter(item => item)
      localStorage.setItem('IncidentsViewColumns', display.toString())
      tableColumn.map(
        item =>
          (item.options.display = !display?.includes(item.name) ? true : false),
      )
      return
    }
    const { page, sortOrder, rowsPerPage, filterList } = tableState

    const filterOptions = setFilter(INCColumn, filterList)
    const getINCbyData = {
      nameSort: sortOrder.name,
      direction: sortOrder.direction,
      limit: rowsPerPage,
      page,
      filterOptions,
    }

    switch (action) {
      case 'search':
        setSearch(tableState.searchText)
      case 'onFilterDialogOpen':
        setFilterDialogOpen(true)
        break
      case 'onFilterDialogClose':
        getINCs(getINCbyData)
        setFilterDialogOpen(false)
        localStorage.setItem('filterList', JSON.stringify(filterList))
        break
      case 'filterChange':
        if (!filterDialogOpen) {
          getINCs(getINCbyData)
          localStorage.setItem('filterList', JSON.stringify(filterList))
        }
        break
      case 'changePage':
        getINCs(getINCbyData)
        break
      case 'sort':
        getINCs(getINCbyData)
        break
      case 'changeRowsPerPage':
        getINCs(getINCbyData)
        break
      /* eslint-disable @typescript-eslint/no-explicit-any */
      case 'rowExpansionChange':
        localStorage.setItem(
          'expandedRows',
          JSON.stringify(
            tableState.expandedRows.data.map(({ value }: any) => value),
          ),
        )
        break
      /* eslint-enable @typescript-eslint/no-explicit-any */
      default:
        break
    }
  }

  const onPrint = () => {
    setModalImage({ image: 'printINC', id: '', incident: '' })
    setModal(true)
  }

  const newTask = ({ id, incident }: ModalImageProps) => {
    setModalImage({ image: 'newRequest', id, incident })
    setModal(true)
  }

  const options: MUIDataTableOptions = {
    filter: true,
    filterType: 'multiselect',
    resizableColumns: true,
    responsive: 'standard',
    fixedHeader: false,
    fixedSelectColumn: false,
    // expandableRows: !dragTable ?? false,
    expandableRows: true,
    draggableColumns: {
      enabled: true,
      transitionTime: 300,
    },
    print: false,
    serverSide: true,
    // selectableRows: dragTable ? 'none' : 'multiple',
    // selectableRowsOnClick: !dragTable ?? false,
    selectableRows: 'none',
    selectableRowsOnClick: false,
    textLabels: textLabels,
    tableBodyHeight: '100%',
    columnOrder: getcolumnOrderStorage(),
    count: countIncidents,
    rowsPerPageOptions: [10, 15, 18, 19, 20, 21, 22, 30, 50],
    page: JSON.parse(localStorage.getItem('currentPage') as string) ?? 0,
    rowsPerPage:
      JSON.parse(localStorage.getItem('numberOfRows') as string) ?? 15,
    onChangePage: currentPage =>
      localStorage.setItem('currentPage', JSON.stringify(currentPage)),
    onChangeRowsPerPage: numberOfRows =>
      localStorage.setItem('numberOfRows', JSON.stringify(numberOfRows)),
    rowsExpanded:
      JSON.parse(localStorage.getItem('expandedRows') as string) ?? [],
    renderExpandableRow: (rowData, { dataIndex }) => {
      return (
        <TableRow sx={{ height: heightINCData }}>
          <TableCell colSpan={7} sx={{ verticalAlign: 'baseline' }}>
            <IncidentData
              values={incidents[dataIndex]}
              setHeight={setHeightINCData}
              onSaveComments={changeComment}
              newTask={newTask}
            />
          </TableCell>
        </TableRow>
      )
    },
    sortOrder: JSON.parse(localStorage.getItem('sortColumn') as string) ?? {
      name: 'incident',
      direction: 'asc',
    },
    onColumnSortChange: (column, direction) =>
      localStorage.setItem(
        'sortColumn',
        JSON.stringify({ name: column, direction }),
      ),
    onColumnOrderChange: newColumnOrder =>
      localStorage.setItem('IncidentsColumnOrder', newColumnOrder.toString()),
    onTableChange: handleTableChange,
    onTableInit: handleTableInit,
    downloadOptions: {
      filename: 'incidents.csv',
      separator: ';',
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: false,
      },
    },
    onDownload: (buildHead, buildBody, columns, data) => {
      return '\uFEFF' + buildHead(columns) + buildBody(data)
    },
    customToolbar: () => {
      return (
        <AdditionalMenu
          denseTable={denseTable}
          setDenseTableFunc={setDenseTableFunc}
          onPrint={onPrint}
          checkClickMenu={checkClickMenu}
          dragTable={dragTable}
          setDragTable={setDragTable}
        />
      )
    },
    setRowProps: (row, _, rowIndex) => {
      const status = row[8].props.value
      return {
        onDoubleClick: () => {
          const id = row[0]
          const incident = row[2].props.value
          if (status !== 'Новая') return
          changeINC({ id, incident, incidents })
        },
        style: {
          cursor: status !== 'Новая' ? 'auto' : 'pointer',
          backgroundColor:
            rowIndex % 2 !== 0
              ? theme.palette.mode === 'dark'
                ? '#1d4751'
                : '#9ed3c4'
              : theme.palette.mode === ThemeMode.light
                ? (theme as ITheme).colorTheme.colorLight
                : (theme as ITheme).colorTheme.colorDark,
        },
      }
    },
    setTableProps: () => {
      return {
        padding: denseTable ? 'none' : 'normal',
      }
    },
  }

  useEffect(() => {
    const filterList = JSON.parse(localStorage.getItem('filterList') as string)
    if (!filterList) {
      const newlist = Array.from({ length: INCColumn.length }, () => [])
      localStorage.setItem('filterList', JSON.stringify(newlist))
    }
    const { nameSort, direction, limit, page, filterOptions } = FilterOptions()
    getINCs({ limit, nameSort, direction, page, filterOptions })
  }, [])

  useEffect(() => {
    if (outputFilter.isOutputFilter) {
      const filterList = JSON.parse(
        localStorage.getItem('filterList') as string,
      )

      const arrOutputFilter =
        outputFilter.filterID === 'Все' ? [] : [outputFilter.filterID]
      filterList[8] = arrOutputFilter
      setFilter(INCColumn, filterList)
      localStorage.setItem('filterList', JSON.stringify(filterList))
    }
  }, [outputFilter])

  const checkClickMenu = (image: string | null) => {
    if (image) {
      setModal(true)
      setModalImage({ image, id: '', incident: '' })
    }
  }

  const handleModal = (bool: boolean) => {
    setModal(bool)
  }

  return (
    <>
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock={true}>
        <ChooseModal
          ref={modalClientRef}
          modalImage={modalImage.image}
          handleModal={handleModal}
          id={modalImage.id}
          incident={modalImage.incident}
          inc={modalImage.inc}
          options={modalImage.options}
        />
      </Modal>
      <DataTable
        title={'Инциденты'}
        data={searchedINCs}
        columns={tableColumn}
        options={options}
      />
    </>
  )
})

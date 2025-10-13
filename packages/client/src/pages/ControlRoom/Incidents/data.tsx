import {
  NoRequiredValidation,
  commentINCValidation,
  forSpacePartsValidation,
  lightTextValidation,
  phoneValidation,
} from 'utils/validatorRules'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline'
import EditIcon from '@mui/icons-material/Edit'
import { emptyValue } from 'components/DropDown'

export const menuData = [
  {
    name: 'newIncidentStatus',
    title: 'Добавить новый статус инцидента',
    icon: <AddCircleOutlineIcon fontSize="medium" />,
  },
  {
    name: 'newTypesOfWork',
    title: 'Добавить тип работ',
    icon: <AddCircleOutlineIcon fontSize="medium" />,
  },
  {
    name: 'newTypeCompletedWork',
    title: 'Добавить тип выполненных работ',
    icon: <AddCircleOutlineIcon fontSize="medium" />,
  },
  {
    name: 'deleteIncidentStatuses',
    title: 'Удалить статус инцидента',
    icon: <RemoveCircleOutline fontSize="medium" />,
  },
  {
    name: 'deleteTypesOfWork',
    title: 'Удалить тип работ',
    icon: <RemoveCircleOutline fontSize="medium" />,
  },
  {
    name: 'deleteTypesCompletedWork',
    title: 'Удалить тип выполненных работ',
    icon: <RemoveCircleOutline fontSize="medium" />,
  },
  {
    name: 'changeIncidentStatuses',
    title: 'Изменить статус инцидента',
    icon: <EditIcon fontSize="medium" />,
  },
  {
    name: 'changeTypesOfWork',
    title: 'Изменить тип работ',
    icon: <EditIcon fontSize="medium" />,
  },
  {
    name: 'changeTypesCompletedWork',
    title: 'Изменить тип выполненных работ',
    icon: <EditIcon fontSize="medium" />,
  },
  {
    name: 'changeStateStatuses',
    title: 'Изменить порядок статусов ',
    icon: <EditIcon fontSize="medium" />,
  },
]

export const createIncident = [
  {
    name: 'newIncident',
    title: 'Добавить новый инцидент',
    icon: <AddCircleOutlineIcon fontSize="medium" />,
  },
]

export const createRequest = [
  {
    name: 'newRequest',
    title: 'Добавить новый запрос',
    icon: <AddCircleOutlineIcon fontSize="medium" />,
  },
]

export const ModalTitles = {
  newIncident: 'Новый инцидент',
  newRequest: 'Новый запрос',
  newIncidentStatus: 'Новый статус инцидента',
  newTypesOfWork: 'Новый тип работ',
  newTypeCompletedWork: 'Новый тип выполненных работ',
  deleteIncidentStatuses: 'Удалить статус инцидента',
  deleteTypesOfWork: 'Удалить тип работ',
  deleteTypesCompletedWork: 'Удалить тип выполненных работ',
  changeIncidentStatuses: 'Изменить статус инцидента',
  changeTypesOfWork: 'Изменить тип работ',
  changeTypesCompletedWork: 'Изменить тип выполненных работ',
  closeINC: 'Закрытие инцидента',
  printINC: 'Выберите тип печати списка инцидентов',
  changeStateStatuses: 'Изменить порядок статусов инцидента',
  changeIncident: 'Изменить инцидент',
}

export const printType = [
  { label: 'Нормальный', value: 'normal' },
  { label: 'Сжатый', value: 'compressed' },
  { label: 'Очень сжатый', value: 'xcompressed' },
]

export const emptyModalImage = {
  image: '',
  id: '',
  incident: '',
}

export const statusSLATitles = {
  yes: 'Просрочен',
  no: 'В срок',
}

export const options = {
  contract: false,
  object: false,
  sla: false,
  typeOfWork: false,
  equipment: false,
  model: false,
  typicalMalfunction: false,
}

export const MapINCStatusCloseInputFields = [
  {
    name: 'typeCompletedWork',
    label: 'Выберите тип выполненных работ',
    validation: NoRequiredValidation,
    type: 'dropdown',
    required: true,
  },
  {
    name: 'commentCloseCheck',
    label: 'Введите комментарии к закрытию инцидента',
    validation: commentINCValidation,
    type: 'text',
    required: false,
  },
  {
    name: 'act',
    label: 'Приложите акт',
    validation: NoRequiredValidation,
    type: 'text',
    required: false,
  },
  {
    name: 'spaceParts',
    label: 'Выберите ЗИП и подмену',
    validation: forSpacePartsValidation,
    type: 'text',
    required: false,
  },
]

export const MapINCStatusInputFields = [
  {
    name: 'incStatus',
    label: 'Введите новый статус инцидента',
    validation: lightTextValidation,
    type: 'text',
    required: false,
  },
]

export const MapTypesOfWorkInputFields = [
  {
    name: 'typesOfWork',
    label: 'Введите новый тип работ',
    validation: lightTextValidation,
    type: 'text',
    required: true,
  },
]

export const MapTypesCompletedWorkInputFields = [
  {
    name: 'typeCompletedWork',
    label: 'Введите новый тип выполненных работ',
    validation: lightTextValidation,
    type: 'text',
    required: true,
  },
]

export const MapINCInputFields = [
  {
    name: 'client',
    label: 'Выберите клиента',
    validation: NoRequiredValidation,
    type: 'text',
    required: true,
    // tabIndex: 1,
  },
  {
    name: 'contract',
    label: 'Выберите контракт',
    validation: NoRequiredValidation,
    type: 'dropdown',
    required: true,
    // tabIndex: 2,
  },
  {
    name: 'object',
    label: 'Выберите объект',
    validation: NoRequiredValidation,
    type: 'dropdown',
    required: true,
    // tabIndex: 3,
  },
  {
    name: 'equipment',
    label: 'Выберите классификатор',
    validation: NoRequiredValidation,
    type: 'dropdown',
    required: true,
    // tabIndex: 4,
  },
  {
    name: 'model',
    label: 'Выберите модель',
    validation: NoRequiredValidation,
    type: 'dropdown',
    required: true,
    // tabIndex: 5,
  },
  {
    name: 'typicalMalfunction',
    label: 'Выберите типовую неисправность',
    validation: NoRequiredValidation,
    type: 'dropdown',
    required: true,
    // tabIndex: 6,
  },
  {
    name: 'description',
    label: 'Введите описание к инциденту',
    validation: commentINCValidation,
    type: 'text',
    required: false,
    // tabIndex: 7,
  },

  {
    name: 'sla',
    label: 'Выберите SLA',
    validation: NoRequiredValidation,
    type: 'dropdown',
    required: true,
    // tabIndex: 8,
  },

  {
    name: 'timeSLA',
    label: 'Выберите время SLA',
    validation: NoRequiredValidation,
    type: 'datetime',
    required: true,
    // tabIndex: 9,
  },
  {
    name: 'typeOfWrok',
    label: 'Выберите тип работ',
    validation: NoRequiredValidation,
    type: 'dropdown',
    required: true,
    // tabIndex: 10,
  },
  {
    name: 'cientINC',
    label: 'Введите клиентский номер',
    validation: NoRequiredValidation,
    type: 'text',
    required: false,
    // tabIndex: 11,
  },
  {
    name: 'applicant',
    label: 'Введите заявителя',
    validation: NoRequiredValidation,
    type: 'text',
    required: false,
    // tabIndex: 12,
  },
  {
    name: 'applicantContacts',
    label: 'Введите контакты заявителя',
    validation: phoneValidation,
    type: 'text',
    required: false,
    // tabIndex: 13,
  },
  {
    name: 'comments',
    label: 'Введите комментарии',
    validation: commentINCValidation,
    type: 'text',
    required: false,
    // tabIndex: 14,
  },
]

export const MapIncidentFields = [
  {
    name: 'client',
    label: 'Выберите клиента',
    validation: NoRequiredValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'sla',
    label: 'Выберите SLA',
    validation: NoRequiredValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'contract',
    label: 'Выберите контракт',
    validation: NoRequiredValidation,
    type: 'dropdown',
    required: true,
  },
  {
    name: 'timeSLA',
    label: 'Выберите время SLA',
    validation: NoRequiredValidation,
    type: 'datetime',
    required: true,
  },
  {
    name: 'object',
    label: 'Выберите объект',
    validation: NoRequiredValidation,
    type: 'dropdown',
    required: true,
  },
  {
    name: 'typeOfWrok',
    label: 'Выберите тип работ',
    validation: NoRequiredValidation,
    type: 'dropdown',
    required: true,
  },
  {
    name: 'equipment',
    label: 'Выберите классификатор',
    validation: NoRequiredValidation,
    type: 'dropdown',
    required: true,
  },
  {
    name: 'cientINC',
    label: 'Введите клиентский номер',
    validation: NoRequiredValidation,
    type: 'text',
    required: false,
  },
  {
    name: 'model',
    label: 'Выберите модель',
    validation: NoRequiredValidation,
    type: 'dropdown',
    required: true,
  },
  {
    name: 'applicant',
    label: 'Введите заявителя',
    validation: NoRequiredValidation,
    type: 'text',
    required: false,
  },
  {
    name: 'typicalMalfunction',
    label: 'Выберите типовую неисправность',
    validation: NoRequiredValidation,
    type: 'dropdown',
    required: true,
  },
  {
    name: 'applicantContacts',
    label: 'Введите контакты заявителя',
    validation: NoRequiredValidation,
    type: 'text',
    required: false,
  },
  {
    name: 'description',
    label: 'Введите описание к инциденту',
    validation: NoRequiredValidation,
    type: 'text',
    required: false,
  },
  {
    name: 'comments',
    label: 'Введите комментарии',
    validation: NoRequiredValidation,
    type: 'text',
    required: false,
  },
]

export const customCell = {
  // width: 'auto',
  maxWidth: 150,
  height: 30,
  p: 0,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

export const customDropDownCell = {
  width: 200,
  maxWidth: 300,
  height: 30,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

export const customHedearCell = {
  paddingLeft: 10,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

export const textLabels = {
  body: {
    noMatch: 'Извините, нет ни одной записи!',
    toolTip: 'Сортировка',
    // columnHeaderTooltip: column => `Sort for ${column.label}`
  },
  pagination: {
    next: 'Следующая',
    previous: 'Предыдущая',
    rowsPerPage: 'Показывать строк:',
    displayRows: 'из',
  },
  toolbar: {
    search: 'Поиск',
    downloadCsv: 'Скачать CSV',
    print: 'Печать',
    viewColumns: 'Просмотр столбцов',
    filterTable: 'Фильтр',
  },
  filter: {
    all: 'Все',
    title: 'ФИЛЬТР',
    reset: 'СБРОС',
  },
  viewColumns: {
    title: 'Показывать столбцы',
    titleAria: 'Показать/скрыть столбцы',
  },
  selectedRows: {
    text: 'строк(и,а)',
    delete: 'Удалить',
    deleteAria: 'Удалить',
  },
}

export const emptyStatusTemp = {
  id: '',
  incident: '',
  timeSLA: '',
  data: emptyValue,
  id_incStatus: '',
  status: '',
  userID: '',
  typeCompletedWork: {
    label: '',
    id: '',
  },
  commentCloseCheck: '',
  spaceParts: [],
}

export const colorIndicator = {
  expired: '#ff2c2c',
  notExpired: '#16f105',
  inProgress: {
    more95: '#ff2c2c',
    more75: '#f1a605',
    more50: '#daf105',
  },
}

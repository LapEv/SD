import {
  timeValidation,
  lightTextValidation,
  NoRequiredValidation,
  RequiredDaysSLAValidation,
} from 'utils/validatorRules'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline'

export const menuData = [
  {
    name: 'newSLA',
    title: 'Добавить SLA',
    icon: <AddCircleOutlineIcon fontSize="medium" />,
  },
  {
    name: 'newOLA',
    title: 'Добавить OLA',
    icon: <AddCircleOutlineIcon fontSize="medium" />,
  },
  {
    name: 'deleteSLA',
    title: 'Удалить SLA',
    icon: <RemoveCircleOutline fontSize="medium" />,
  },
  {
    name: 'deleteOLA',
    title: 'Удалить OLA',
    icon: <RemoveCircleOutline fontSize="medium" />,
  },
]
export const ModalTitles = {
  newSLA: 'Новый SLA',
  newOLA: 'Новый OLA',
  deleteSLA: 'Удалить SLA',
  deleteOLA: 'Удалить OLA',
}

export const ServiceDataList = [
  {
    name: 'sla',
    label: 'SLA',
  },
  {
    name: 'ola',
    label: 'OLA',
  },
]

export const MapSLAInputFields = [
  {
    name: 'sla',
    label: 'Введите новый SLA',
    validation: lightTextValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'days',
    label: 'Выберите дней реакции',
    validation: RequiredDaysSLAValidation,
    type: 'number',
    required: true,
  },
  {
    name: 'time',
    label: 'Выберите время реакции',
    validation: timeValidation,
    type: 'time',
    required: true,
  },
  {
    name: 'timeStart',
    label: 'Выберите время начала',
    validation: timeValidation,
    type: 'time',
    required: true,
  },
  {
    name: 'timeEnd',
    label: 'Выберите время конца',
    validation: timeValidation,
    type: 'time',
    required: true,
  },
  {
    name: 'TypeOfWork',
    label: 'Выберите тип работ',
    validation: NoRequiredValidation,
    type: 'text',
    required: true,
  },
]

export const MapSLAViewInputFields = [
  {
    name: 'sla',
    label: 'Наименование SLA',
    validation: lightTextValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'days',
    label: 'Выберите дней реакции',
    validation: RequiredDaysSLAValidation,
    type: 'number',
    required: true,
  },
  {
    name: 'time',
    label: 'Время реакции',
    validation: timeValidation,
    type: 'time',
    required: true,
  },
  {
    name: 'timeStart',
    label: 'Время начала',
    validation: timeValidation,
    type: 'time',
    required: true,
  },
  {
    name: 'timeEnd',
    label: 'Время конца',
    validation: timeValidation,
    type: 'time',
    required: true,
  },
  {
    name: 'TypeOfWork',
    label: 'Тип работ',
    validation: NoRequiredValidation,
    type: 'text',
    required: true,
  },
]

export const MapOLAInputFields = [
  {
    name: 'ola',
    label: 'Введите новый OLA',
    validation: lightTextValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'days',
    label: 'Выберите дней реакции',
    validation: RequiredDaysSLAValidation,
    type: 'number',
    required: true,
  },
  {
    name: 'time',
    label: 'Выберите время реакции',
    validation: timeValidation,
    type: 'time',
    required: true,
  },
  {
    name: 'timeStart',
    label: 'Выберите время начала',
    validation: timeValidation,
    type: 'time',
    required: true,
  },
  {
    name: 'timeEnd',
    label: 'Выберите время конца',
    validation: timeValidation,
    type: 'time',
    required: true,
  },
  {
    name: 'TypeOfWork',
    label: 'Выберите тип работ',
    validation: NoRequiredValidation,
    type: 'text',
    required: true,
  },
]

export const MapOLAViewInputFields = [
  {
    name: 'ola',
    label: 'Наименование OLA',
    validation: lightTextValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'days',
    label: 'Выберите дней реакции',
    validation: RequiredDaysSLAValidation,
    type: 'number',
    required: true,
  },
  {
    name: 'time',
    label: 'Время реакции',
    validation: timeValidation,
    type: 'time',
    required: true,
  },
  {
    name: 'timeStart',
    label: 'Время начала',
    validation: timeValidation,
    type: 'time',
    required: true,
  },
  {
    name: 'timeEnd',
    label: 'Время конца',
    validation: timeValidation,
    type: 'time',
    required: true,
  },
  {
    name: 'TypeOfWork',
    label: 'Тип работ',
    validation: NoRequiredValidation,
    type: 'text',
    required: true,
  },
]

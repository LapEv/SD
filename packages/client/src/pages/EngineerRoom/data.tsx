import { Order } from 'utils/getComparator'
import { SettingsEngineer } from './interfaces'
import {
  commentINCValidation,
  forSpacePartsValidation,
  NoRequiredValidation,
} from 'utils/validatorRules'

export const timeEngineerIntervalData = [
  { label: '- за 1 мес', value: 30 },
  { label: '- за 2 мес', value: 61 },
  { label: '- за 3 мес', value: 92 },
  { label: '- за 6 мес', value: 183 },
  { label: '- за 12 мес', value: 365 },
  { label: '- за 2 года', value: 730 },
  { label: '- за 3 года', value: 1095 },
  { label: '- за 5 лет', value: 1825 },
  { label: '- Все инциденты', value: 0 },
]

export const SETTINGS_DEFAULT: SettingsEngineer = {
  timeInterval: 92,
  filterEngineerStatus: [],
  sortEngineerStatus: {
    order: 'desc',
    orderBy: 'numberINC',
  },
}

export const SETTINGS_STORAGE_KEY = 'settingsEngineer'

export const colorIndicator = {
  expired: { light: '#f44336', dark: '#bb4940' },
  notExpired: { light: '#088208a3', dark: '#088208a3' },
  inProgress: {
    more95: { light: '#f44336', dark: '#bb4940' },
    more75: { light: '#ffa806a3', dark: '#efbb5aa3' },
    more50: { light: '#daf105', dark: '#b1bb50' },
  },
}

export const sortEngineerData = [
  { label: 'Время SLA', orderBy: 'timeSLA', order: 'asc' as Order },
  { label: 'Номер инцидента', orderBy: 'numberINC', order: 'asc' as Order },
  { label: 'Статус', orderBy: 'statusINC', order: 'asc' as Order },
  { label: 'Клиент', orderBy: 'client', order: 'asc' as Order },
  {
    label: 'Время регистрации',
    orderBy: 'timeRegistration',
    order: 'asc' as Order,
  },
  { label: 'Время назначения', orderBy: 'timeInWork', order: 'asc' as Order },
  { label: 'Время выполнения', orderBy: 'timeDone', order: 'asc' as Order },
  { label: 'Время решения', orderBy: 'timeCloseCheck', order: 'asc' as Order },
  { label: 'Время закрытия', orderBy: 'timeClose', order: 'asc' as Order },
]

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
    required: true,
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

export const engineerLabelsForExcel = [
  'Инцидент',
  'Номер',
  'Номер Клиента',
  'Статус',
  'Тип инцидента',
  'Тип работ',
  'Время SLA',
  'Клиент',
  'Клиент Юр',
  'Контракт',
  'Объект',
  'Адрес',
  'Регион',
  'Координаты',
  'Оборудование',
  'Модель',
  'Неисправность',
  'Комментарий',
  'Описание',
  'Время регистрации',
  'Время в работу',
  'Время выполнения',
  'Время решения',
  'Время закрытия',
  'Исполнитель',
  'Ответственный',
  'Кто принял',
  'Выполнен',
  'Решён',
  'Закрыл',
  'Заявитель',
  'Контакты заявителя',
  'Тип выполненных работ',
  'Комментарии к выполнению',
  'Комментарии к закрытию',
  'ЗИП',
  'Акты',
  'Статус SLA',
  'Оценка',
  'Родительский',
  'Связанный',
  'Тип регистрации',
]

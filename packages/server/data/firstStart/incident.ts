import { AppConst } from '../const'

export const incStatusesStartData = [
  {
    statusINC: AppConst.Statuses.registered,
    stateNumber: 1,
    active: true,
  },
  {
    statusINC: AppConst.Statuses.inWork,
    stateNumber: 2,
    active: true,
  },
  {
    statusINC: AppConst.Statuses.waitingZIPequipment,
    stateNumber: 3,
    active: true,
  },
  {
    statusINC: AppConst.Statuses.resolved,
    stateNumber: 4,
    modal: 'closeINC',
    active: true,
  },
  {
    statusINC: AppConst.Statuses.closed,
    stateNumber: 5,
    active: true,
  },
]

export const typesOfWorkStartData = [
  {
    typeOfWork: 'РВР',
    active: true,
  },
  {
    typeOfWork: 'ППР',
    active: true,
  },
  {
    typeOfWork: 'Замена ФН',
    active: true,
  },
  {
    typeOfWork: 'Проект',
    active: true,
  },
  {
    typeOfWork: 'Реакция',
    active: true,
  },
]

export const typesCompletedWorkStartData = [
  {
    typeCompletedWork: 'Ремонт с запчастями',
    active: true,
  },
  {
    typeCompletedWork: 'Ремонт без запчастей',
    active: true,
  },
  {
    typeCompletedWork: 'Замена оборудования',
    active: true,
  },
  {
    typeCompletedWork: 'Диагностика',
    active: true,
  },
  {
    typeCompletedWork: 'Неисправность не обнаружена',
    active: true,
  },
  {
    typeCompletedWork: 'Выполнена поверка оборудования',
    active: true,
  },
]

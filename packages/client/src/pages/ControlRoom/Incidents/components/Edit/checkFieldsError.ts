import { INC } from 'store/slices/incidents/interfaces'
import { errEditINC } from '../../data'
import { phoneValidationEditINC } from 'utils/validatorRules'

export const checkFieldsError = (newINC: INC) => {
  if (!newINC.applicant) {
    return `Поле "Заявитель" ${errEditINC}`
  }
  const checkPhoneValidation = phoneValidationEditINC(newINC.applicantContacts)
  if (checkPhoneValidation !== true) {
    return `Поле "Контакты" ${checkPhoneValidation}`
  }
  if (!newINC.contract) {
    return `Поле "Контракт" ${errEditINC}`
  }
  if (!newINC.equipment) {
    return `Поле "Классификатор" ${errEditINC}`
  }
  if (!newINC.model) {
    return `Поле "Модель" ${errEditINC}`
  }
  if (!newINC.sla) {
    return `Поле "Тип SLA" ${errEditINC}`
  }
  if (!newINC.timeSLA) {
    return `Поле "SLA" ${errEditINC}`
  }
  if ((newINC.IncindentStatus?.stateNumber as number) > 2) {
    if (!newINC.executor) {
      return `Поле "Исполнитель" при статуе "${newINC.status}" ${errEditINC}`
    }
    if (!newINC.responsible) {
      return `Поле "Ответственный" при статуе "${newINC.status}" ${errEditINC}`
    }
  }
  if (newINC.status === 'Решён' || newINC.status === 'Закрыт') {
    if (!newINC.userClosingCheck) {
      return `Поле "Перевёл в выполнение" при статуе "${newINC.status}" ${errEditINC}`
    }
    if (!newINC.typeCompletedWork) {
      return `Поле "Тип решения" при статуе "${newINC.status}" ${errEditINC}`
    }
  }
  if (newINC.status === 'Закрыт') {
    if (!newINC.userClosing) {
      return `Поле "Закрыл" при статуе "${newINC.status}" ${errEditINC}`
    }
  }
  return ''
}

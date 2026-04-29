import { INC, ChangeLogsEditINC } from 'store/slices/incidents/interfaces'

export const createLogs = (newINC: INC, inc: INC, userID: string) => {
  const logs = []
  const now = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000,
  )
  if (newINC.clientINC !== inc.clientINC) {
    logs.push({
      id_incLog: newINC.id,
      time: now,
      log: `Изменён номер клиента "${inc.clientINC}" на "${newINC.clientINC}"`,
      id_incLogUser: userID,
    } as ChangeLogsEditINC)
  }
  if (newINC.applicant !== inc.applicant) {
    logs.push({
      id_incLog: newINC.id,
      time: now,
      log: `Изменён заявитель "${inc.applicant}" на "${newINC.applicant}"`,
      id_incLogUser: userID,
    } as ChangeLogsEditINC)
  }
  if (newINC.applicantContacts !== inc.applicantContacts) {
    logs.push({
      id_incLog: newINC.id,
      time: now,
      log: `Изменён контакт заявителя "${inc.applicantContacts}" на "${newINC.applicantContacts}"`,
      id_incLogUser: userID,
    } as ChangeLogsEditINC)
  }
  if (newINC.contract !== inc.contract) {
    logs.push({
      id_incLog: newINC.id,
      time: now,
      log: `Изменён контракт "${inc.contract}" на "${newINC.contract}"`,
      id_incLogUser: userID,
    } as ChangeLogsEditINC)
  }
  if (newINC.equipment !== inc.equipment) {
    logs.push({
      id_incLog: newINC.id,
      time: now,
      log: `Изменён классификатор "${inc.equipment}" на "${newINC.equipment}"`,
      id_incLogUser: userID,
    } as ChangeLogsEditINC)
  }
  if (newINC.model !== inc.model) {
    logs.push({
      id_incLog: newINC.id,
      time: now,
      log: `Изменёна модель "${inc.model}" на "${newINC.model}"`,
      id_incLogUser: userID,
    } as ChangeLogsEditINC)
  }
  if (newINC.sla !== inc.sla) {
    logs.push({
      id_incLog: newINC.id,
      time: now,
      log: `Изменён тип SLA "${inc.sla}" на "${newINC.sla}"`,
      id_incLogUser: userID,
    } as ChangeLogsEditINC)
  }
  if (newINC.timeSLA !== inc.timeSLA) {
    logs.push({
      id_incLog: newINC.id,
      time: now,
      log: `Изменён SLA "${inc.timeSLA}" на "${newINC.timeSLA}"`,
      id_incLogUser: userID,
    } as ChangeLogsEditINC)
  }
  if (newINC.executor !== inc.executor) {
    logs.push({
      id_incLog: newINC.id,
      time: now,
      log: `Изменён исполнитель "${inc.executor}" на "${newINC.executor}"`,
      id_incLogUser: userID,
    } as ChangeLogsEditINC)
  }
  if (newINC.responsible !== inc.responsible) {
    logs.push({
      id_incLog: newINC.id,
      time: now,
      log: `Изменён ответственный "${inc.responsible}" на "${newINC.responsible}"`,
      id_incLogUser: userID,
    } as ChangeLogsEditINC)
  }
  if (newINC.userClosingCheck !== inc.userClosingCheck) {
    logs.push({
      id_incLog: newINC.id,
      time: now,
      log: `Изменён "Перевёл в выполнение" - "${inc.userClosingCheck}" на "${newINC.userClosingCheck}"`,
      id_incLogUser: userID,
    } as ChangeLogsEditINC)
  }
  if (newINC.userClosing !== inc.userClosing) {
    logs.push({
      id_incLog: newINC.id,
      time: now,
      log: `Изменён "Закрыл" - "${inc.equipment}" на "${newINC.equipment}"`,
      id_incLogUser: userID,
    } as ChangeLogsEditINC)
  }
  if (newINC.typeCompletedWork !== inc.typeCompletedWork) {
    logs.push({
      id_incLog: newINC.id,
      time: now,
      log: `Изменён тип решения "${inc.typeCompletedWork}" на "${newINC.typeCompletedWork}"`,
      id_incLogUser: userID,
    } as ChangeLogsEditINC)
  }
  if (newINC.act !== inc.act) {
    logs.push({
      id_incLog: newINC.id,
      time: now,
      log: `Изменёны акты "${inc.act}" на "${newINC.act}"`,
      id_incLogUser: userID,
    } as ChangeLogsEditINC)
  }
  if (newINC.spaceParts !== inc.spaceParts) {
    logs.push({
      id_incLog: newINC.id,
      time: now,
      log: `Изменён использованный ЗИП "${inc.spaceParts}" на "${newINC.spaceParts}"`,
      id_incLogUser: userID,
    } as ChangeLogsEditINC)
  }
  if (newINC.comment !== inc.comment) {
    logs.push({
      id_incLog: newINC.id,
      time: now,
      log: `Изменён комментарий к инциденту "${inc.comment}" на "${newINC.comment}"`,
      id_incLogUser: userID,
    } as ChangeLogsEditINC)
  }
  if (newINC.commentCloseCheck !== inc.commentCloseCheck) {
    logs.push({
      id_incLog: newINC.id,
      time: now,
      log: `Изменён комментарий к закрытию инцидента "${inc.comment}" на "${newINC.comment}"`,
      id_incLogUser: userID,
    } as ChangeLogsEditINC)
  }

  return logs
}

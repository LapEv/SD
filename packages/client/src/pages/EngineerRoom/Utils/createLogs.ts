import { INC, ChangeLogsEditINC } from 'store/slices/incidents/interfaces'

export const createLogs = (newINC: INC, inc: INC, userID: string) => {
  const logs = []
  const now = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000,
  )
  if (newINC.act !== inc.act) {
    const oldActs = inc.act && inc.act.length > 0 ? inc.act.join(', ') : ''
    const addActs =
      newINC.act && newINC.act.length > 0 ? newINC.act.join(', ') : ''
    logs.push({
      id_incLog: newINC.id,
      time: now,
      log: `Добавлены новые акты. Было "${oldActs}", добавлены "${addActs}"`,
      id_incLogUser: userID,
    } as ChangeLogsEditINC)
  }
  return logs
}

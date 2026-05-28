import { IncidentRepos, IncidentStatusesRepos } from '../db'
import { Op } from 'sequelize'
import { IIncindentStatuses, Incindent } from '/models/incidents'
import { AppConst } from '../data/const'
import { User } from '/models/users'

export const modifyINCsCloseToCheckClose = async () => {
  try {
    const statusClose = (await IncidentStatusesRepos.findOne({
      where: { statusINC: 'Закрыт' },
    })) as IIncindentStatuses
    const statusCheckClose = (await IncidentStatusesRepos.findOne({
      where: { statusINC: 'Решён' },
    })) as IIncindentStatuses
    const _incs = (await IncidentRepos.findAll({
      where: {
        id_incStatus: statusClose.id,
      },
    })) as Incindent[]
    const _idINCs = _incs.map(({ id }) => id)
    const isUpdate = await IncidentRepos.update(_idINCs, {
      id_incStatus: statusCheckClose.id,
      status: statusCheckClose.statusINC,
    })
    if (isUpdate[0] <= 0) {
      return { status: false, error: 'Error modify close INC to checkClose' }
    }

    return { status: true, error: '' }
  } catch (err) {
    return { status: false, error: err }
  }
}

export const checkForCloseINC = async () => {
  try {
    // modifyINCsCloseToCheckClose()
    // return
    const statusClose = (await IncidentStatusesRepos.findOne({
      where: { statusINC: 'Закрыт' },
    })) as IIncindentStatuses
    const statusCheckClose = (await IncidentStatusesRepos.findOne({
      where: { statusINC: 'Решён' },
    })) as IIncindentStatuses

    const currentDate = new Date()
    const ts = currentDate.getTime()
    const newDateTS = ts - AppConst.daysForClose * 24 * 60 * 60 * 1000
    const endDate = currentDate.setTime(newDateTS)
    const _endDate = new Date(endDate)

    const incs = (await IncidentRepos.findAll({
      where: {
        timeCloseCheck: { [Op.lt]: _endDate },
        id_incStatus: statusCheckClose.id,
      },
    })) as Incindent[]
    const idINCs = incs.map(({ id }) => id)
    if (!idINCs.length) {
      return { status: true, error: 'No incidents for close.' }
    }
    // const isUpdate = await IncidentRepos.update(idINCs, {
    //   id_incStatus: statusClose.id,
    //   status: statusClose.statusINC,
    // })
    // console.log('isUpdate = ', isUpdate)
    // if (isUpdate[0] <= 0) {
    //   return { status: false, error: 'Error update close INC' }
    // }
    console.log('statusClose = ', statusClose)
    const user = (await IncidentRepos.findOne({
      where: { rolesGroup: 'SUPERADMIN' },
    })) as User
    console.log('user = ', user)
    // const logs = idINCs.map(id => {
    //   return {
    //     id_incLog: id,
    //     time: currentDate,
    //     log: AppConst.ActionComment.closeINC,
    //     id_incLogUser: user.id,
    //   }
    // })
    // console.log('logs = ', logs)
    // await IncidentLogsRepos.bulkCreate(logs)
    return { status: true, error: '' }
  } catch (err) {
    return { status: false, error: err }
  }
}

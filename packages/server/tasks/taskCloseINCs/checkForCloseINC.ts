import {
  IncidentLogsRepos,
  IncidentRepos,
  IncidentStatusesRepos,
  roleGroupRepos,
  SystemRepos,
  userRepos,
} from '../../db'
import { Op } from 'sequelize'
import { IIncindentStatuses, Incindent } from '/models/incidents'
import { AppConst } from '../../data/const'
import { User } from '/models/users'
import { RolesGroup } from '/models/roles'
import { ISystem } from '/models/system'

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
    const statusClose = (await IncidentStatusesRepos.findOne({
      where: { statusINC: 'Закрыт' },
    })) as IIncindentStatuses
    const statusCheckClose = (await IncidentStatusesRepos.findOne({
      where: { statusINC: 'Решён' },
    })) as IIncindentStatuses

    const currentDate = new Date()
    const ts = currentDate.getTime()
    const systemOptions = (await SystemRepos.findAll({})) as ISystem[]
    const { incident } = systemOptions[0]
    const days = incident.daysForClose ?? AppConst.daysForClose
    const newDateTS = ts - days * 24 * 60 * 60 * 1000
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
    const isUpdate = await IncidentRepos.update(idINCs, {
      id_incStatus: statusClose.id,
      timeClose: currentDate,
      status: statusClose.statusINC,
      commentClose: AppConst.ActionComment.closeINC,
    })
    if (isUpdate[0] <= 0) {
      return { status: false, error: 'Error update close INC' }
    }
    const rolesGroup = (await roleGroupRepos.findOne({
      where: { group: 'SUPERADMIN' },
    })) as RolesGroup
    const user = (await userRepos.findOne({
      where: { id_rolesGroup: rolesGroup.id },
    })) as User
    const logs = idINCs.map(id => {
      return {
        id_incLog: id,
        time: currentDate,
        log: AppConst.ActionComment.closeINC,
        id_incLogUser: user.id,
        isSystem: true,
      }
    })
    await IncidentLogsRepos.bulkCreate(logs)
    return { status: true, error: '' }
  } catch (err) {
    return { status: false, error: err }
  }
}

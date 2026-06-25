import { IncidentRepos, IncidentStatusesRepos } from '../../db'
import { IIncindentStatuses, Incindent } from '/models/incidents'

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

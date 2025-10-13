import { IncidentRepos } from '../db'
import { IIncindent } from '../models/incidents'
import { AppConst } from '../data/const'

export const getLastINC = async () => {
  const lastINC = (await IncidentRepos.findAll({
    limit: 1,
    order: [['createdAt', 'DESC']],
  })) as IIncindent[]
  const numberINC =
    !lastINC || !lastINC.length ? AppConst.startINC : lastINC[0].numberINC + 1
  const numberZeros =
    numberINC >= 10000
      ? '0000'
      : numberINC >= 100000
        ? '000'
        : numberINC >= 1000000
          ? '00'
          : numberINC >= 10000000
            ? '0'
            : numberINC >= 100000000
              ? ''
              : '????'
  const incident = `${AppConst.attrINC}${numberZeros}${numberINC}`
  AppConst.numberINC = numberINC
  AppConst.incident = incident
}

import { SystemRepos } from '../db'
import { ISystem } from '/models/system'

export const checkOurMail = async () => {
  const systemOptions = (await SystemRepos.findAll({})) as ISystem[]
  const { incident } = systemOptions[0]
  return incident.emailTechnicalSupport ?? ''
}

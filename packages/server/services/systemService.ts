import type { Request, Response } from 'express'
import { SystemRepos } from '../db'

export class systemService {
  getSystem = (_req: Request, res: Response) => {
    SystemRepos.findAll({})
      .then(system => res.status(200).json(system))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  setSystem = async (_req: Request, res: Response) => {
    const { data } = _req.body
    try {
      const systemData = await SystemRepos.findAll({})
      const id = systemData[0]
      const isUpdate = await SystemRepos.update(id, { ...data })
      if (isUpdate[0] <= 0) {
        return res.status(403).json({
          message:
            'Ошибка с изменением параметров системы! Попробуйте перезагрузить страницу и заново внести изменения. Или обратитесь к администратору.',
        })
      }
      res.status(200).json({ data })
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
}

import { Addresses, Clients, ObjectsRepos, Regions } from '../db'
import type { Request, Response } from 'express'

const includes = [
  {
    model: Clients,
    required: false,
    attributes: ['client'],
  },
  {
    model: Addresses,
    required: false,
    attributes: ['address'],
  },
  {
    model: Regions,
    required: false,
    attributes: ['region'],
  },
]

export class objectsService {
  newObject = async (_req: Request, res: Response) => {
    try {
      await ObjectsRepos.create({ ..._req.body, active: true })
      const objects = await ObjectsRepos.findAll({
        where: { active: true },
        include: includes,
      })
      res.status(200).json(objects)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  getAllObjects = (_req: Request, res: Response) => {
    ObjectsRepos.findAll({ include: includes })
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }

  getObjects = (_req: Request, res: Response) => {
    ObjectsRepos.findAll({
      where: { active: true },
      include: includes,
    })
      .then(objects => {
        res.status(200).json(objects)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }

  deleteObjects = async (_req: Request, res: Response) => {
    const { selectedObjects } = _req.body
    try {
      await ObjectsRepos.update(selectedObjects, {
        active: false,
      })
      const objects = await ObjectsRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(objects)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  fullDeleteObjects = async (_req: Request, res: Response) => {
    const { selectedObjects } = _req.body
    try {
      await ObjectsRepos.destroy({
        where: { id: selectedObjects },
      })
      const objects = await ObjectsRepos.findAll({})
      res.status(200).json(objects)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  pullObjectFromArchive = async (_req: Request, res: Response) => {
    const { selectedObjects } = _req.body
    try {
      await ObjectsRepos.update(selectedObjects, {
        active: true,
      })
      const objects = await ObjectsRepos.findAll({
        where: { active: true },
        include: includes,
      })
      res.status(200).json(objects)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  changeObject = async (_req: Request, res: Response) => {
    const {
      object,
      id_address,
      id_region,
      id_client,
      internalClientID,
      internalClientName,
      id,
    } = _req.body
    try {
      await ObjectsRepos.update(id, {
        object,
        id_address,
        id_region,
        id_client,
        internalClientID,
        internalClientName,
      })
      const objects = await ObjectsRepos.findAll({
        where: { active: true },
        include: includes,
      })
      res.status(200).json(objects)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
}

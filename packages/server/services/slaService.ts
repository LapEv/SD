import { SLARepos, OLARepos, TypesOfWork } from '../db'
import type { Request, Response } from 'express'

const includes = [
  {
    model: TypesOfWork,
    required: false,
    attributes: ['id', 'typeOfWork', 'active'],
  },
]

export class slaService {
  newSLA = async (_req: Request, res: Response) => {
    try {
      await SLARepos.create({ ..._req.body, active: true })
      const sla = await SLARepos.findAll({
        where: { active: true },
        include: includes,
      })
      res.status(200).json(sla)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  getAllSLA = (_req: Request, res: Response) => {
    SLARepos.findAll({
      include: includes,
    })
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getSLA = (_req: Request, res: Response) => {
    SLARepos.findAll({
      where: { active: true },
      include: includes,
    })
      .then(sla => {
        res.status(200).json(sla)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }
  deleteSLA = async (_req: Request, res: Response) => {
    const { selectedSLA } = _req.body
    try {
      await SLARepos.update(selectedSLA, {
        active: false,
      })
      const sla = await SLARepos.findAll({
        where: { active: true },
      })
      res.status(200).json(sla)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  fullDeleteSLA = async (_req: Request, res: Response) => {
    const { selectedSLA } = _req.body
    try {
      await SLARepos.destroy({
        where: { id: selectedSLA },
      })
      const sla = await SLARepos.findAll({})
      res.status(200).json(sla)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  pullSLAFromArchive = async (_req: Request, res: Response) => {
    const { selectedSLA } = _req.body
    try {
      await SLARepos.update(selectedSLA, {
        active: true,
      })
      const sla = await SLARepos.findAll({
        where: { active: true },
        include: includes,
      })
      res.status(200).json(sla)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  changeSLA = async (_req: Request, res: Response) => {
    const { sla, id, days, time, timeStart, timeEnd, id_typeOfWork } = _req.body
    try {
      await SLARepos.update(id, {
        sla,
        days,
        time,
        timeStart,
        timeEnd,
        id_typeOfWork,
      })
      const slas = await SLARepos.findAll({
        where: { active: true },
        include: includes,
      })
      res.status(200).json(slas)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  newOLA = async (_req: Request, res: Response) => {
    try {
      await OLARepos.create({ ..._req.body, active: true })
      const ola = await OLARepos.findAll({
        where: { active: true },
        include: includes,
      })
      res.status(200).json(ola)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  getAllOLA = (_req: Request, res: Response) => {
    OLARepos.findAll({ include: includes })
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getOLA = (_req: Request, res: Response) => {
    OLARepos.findAll({
      where: { active: true },
      include: includes,
    })
      .then(ola => {
        res.status(200).json(ola)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }
  deleteOLA = async (_req: Request, res: Response) => {
    const { selectedOLA } = _req.body
    try {
      await OLARepos.update(selectedOLA, {
        active: false,
      })
      const ola = await OLARepos.findAll({
        where: { active: true },
      })
      res.status(200).json(ola)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  fullDeleteOLA = async (_req: Request, res: Response) => {
    const { selectedOLA } = _req.body
    try {
      await OLARepos.destroy({
        where: { id: selectedOLA },
      })
      const ola = await OLARepos.findAll({})
      res.status(200).json(ola)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  pullOLAFromArchive = async (_req: Request, res: Response) => {
    const { selectedOLA } = _req.body
    try {
      await OLARepos.update(selectedOLA, {
        active: true,
      })
      const ola = await OLARepos.findAll({
        where: { active: true },
        include: includes,
      })
      res.status(200).json(ola)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  changeOLA = async (_req: Request, res: Response) => {
    const { ola, id, days, time, timeStart, timeEnd, id_typeOfWork } = _req.body
    try {
      await OLARepos.update(id, {
        ola,
        days,
        time,
        timeStart,
        timeEnd,
        id_typeOfWork,
      })
      const olas = await OLARepos.findAll({
        where: { active: true },
        include: includes,
      })
      res.status(200).json(olas)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
}

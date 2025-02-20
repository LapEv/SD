import type { Request, Response } from 'express'
import { Department, DivisionRepos, Users } from '../db'
import { getOrder } from '../utils/getOrder'

const orderDepartment = getOrder('departmentName', 'ASC')
const orderUsers = getOrder('lastName', 'ASC')
const include = [
  {
    model: Department,
    attributes: ['id', 'department', 'departmentName'],
    where: { active: true },
    order: orderDepartment,
    required: false,
    include: [
      {
        model: Users,
        required: false,
        where: { active: true },
        order: orderUsers,
        attributes: [
          'id',
          'lastName',
          'firstName',
          'middleName',
          'post',
          'email',
          'phone',
          'username',
        ],
      },
    ],
  },
]
const order = getOrder('divisionName', 'ASC')
const attributes = ['id', 'division', 'divisionName', 'active']

export class divisionService {
  newDivision = async (_req: Request, res: Response) => {
    const { division, divisionName } = _req.body
    try {
      await DivisionRepos.create({
        division,
        divisionName,
        active: true,
      })
      const divisions = await DivisionRepos.findAll({
        where: { active: true },
        order,
        include,
        attributes,
      })
      res.status(200).json(divisions)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  getDivisions = (_req: Request, res: Response) => {
    DivisionRepos.findAll({
      where: { active: true },
      order,
      include,
      attributes,
    })
      .then(divisions => res.status(200).json(divisions))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getDivisionsData = async () => {
    try {
      const divisions = await DivisionRepos.findAll({
        where: { active: true },
        order,
        include,
        attributes,
      })
      return divisions
    } catch (err) {
      return { error: ['db error', err as Error] }
    }
  }
  getAllDivisions = (_req: Request, res: Response) => {
    DivisionRepos.findAll({
      order,
      include,
      attributes,
    })
      .then(divisions => res.status(200).json(divisions))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  deleteDivision = async (_req: Request, res: Response) => {
    const { selectedDivisions } = _req.body
    try {
      await DivisionRepos.update(selectedDivisions, {
        active: false,
      })
      const divisions = await DivisionRepos.findAll({
        where: { active: true },
        order,
        include,
        attributes,
      })
      res.status(200).json(divisions)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  pullDivisionFromArchive = async (_req: Request, res: Response) => {
    const { selectedDivisions } = _req.body
    try {
      await DivisionRepos.update(selectedDivisions, {
        active: true,
      })
      const divisions = await DivisionRepos.findAll({
        where: { active: true },
        include,
        attributes,
      })
      res.status(200).json(divisions)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  fullDeleteDivision = async (_req: Request, res: Response) => {
    const { selectedDivisions } = _req.body
    try {
      await DivisionRepos.destroy({
        where: { id: selectedDivisions },
      })
      const divisions = await DivisionRepos.findAll({
        order,
        include,
        attributes,
      })
      res.status(200).json(divisions)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  updateDivision = async (_req: Request, res: Response) => {
    const { selectedDivisions } = _req.body
    try {
      await DivisionRepos.update(selectedDivisions, {
        active: false,
      })
      const divisions = await DivisionRepos.findAll({
        where: { active: true },
        order,
        include,
        attributes,
      })
      res.status(200).json(divisions)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  changeNameDivision = async (_req: Request, res: Response) => {
    const { id, division, divisionName } = _req.body
    try {
      await DivisionRepos.update(id, {
        division,
        divisionName,
      })
      const divisions = await DivisionRepos.findAll({
        where: { active: true },
        order,
        include,
        attributes,
      })
      res.status(200).json(divisions)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
}

import type { Request, Response } from 'express'
import { DepartmentRepos, Division, Users } from '../db'
import { getOrder } from '../utils/getOrder'

const orderDivision = getOrder('divisionName', 'ASC')
const orderUsers = getOrder('lastName', 'ASC')
const include = [
  {
    model: Division,
    attributes: ['id', 'division', 'divisionName'],
    where: { active: true },
    order: orderDivision,
    required: false,
  },
  {
    model: Users,
    required: false,
    where: { active: true },
    order: orderUsers,
  },
]
const order = getOrder('departmentName', 'ASC')
const attributes = ['id', 'department', 'departmentName', 'active']

export class departmentService {
  newDepartment = async (_req: Request, res: Response) => {
    const { department, departmentName, division, id_division } = _req.body
    try {
      await DepartmentRepos.create({
        department,
        departmentName,
        division,
        id_division,
        active: true,
      })
      const departments = await DepartmentRepos.findAll({
        where: { active: true },
        order,
        include,
        attributes,
      })
      res.status(200).json(departments)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  getDepartments = (_req: Request, res: Response) => {
    DepartmentRepos.findAll({
      where: { active: true },
      order,
      include,
      attributes,
    })
      .then(departments => res.status(200).json(departments))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getAllDepartments = (_req: Request, res: Response) => {
    DepartmentRepos.findAll({ order, include, attributes })
      .then(departments => res.status(200).json(departments))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  deleteDepartment = async (_req: Request, res: Response) => {
    const { selectedDepartments } = _req.body
    try {
      await DepartmentRepos.update(selectedDepartments, {
        active: false,
      })
      const departaments = await DepartmentRepos.findAll({
        where: { active: true },
        order,
        include,
        attributes,
      })
      res.status(200).json(departaments[1])
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  pullDepartmentFromArchive = async (_req: Request, res: Response) => {
    const { selectedDepartments } = _req.body
    try {
      await DepartmentRepos.update(selectedDepartments, {
        active: true,
      })
      const departments = await DepartmentRepos.findAll({
        where: { active: true },
        order,
        include,
        attributes,
      })
      res.status(200).json(departments)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  fullDeleteDepartment = async (_req: Request, res: Response) => {
    const { selectedDepartments } = _req.body
    try {
      await DepartmentRepos.destroy({
        where: { id: selectedDepartments },
      })
      const departaments = await DepartmentRepos.findAll({
        order,
        include,
        attributes,
      })
      res.status(200).json(departaments)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  updateDepartment = async (_req: Request, res: Response) => {
    const { selectedDepartments } = _req.body
    try {
      await DepartmentRepos.update(selectedDepartments, {
        active: false,
      })
      const departaments = await DepartmentRepos.findAll({
        where: { active: true },
        order,
        include,
        attributes,
      })
      res.status(200).json(departaments)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  changeNameDepartment = async (_req: Request, res: Response) => {
    const { id, department, departmentName } = _req.body
    try {
      await DepartmentRepos.update(id, {
        department,
        departmentName,
      })
      const departaments = await DepartmentRepos.findAll({
        where: { active: true },
        order,
        include,
        attributes,
      })
      res.status(200).json(departaments)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
}

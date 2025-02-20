import type { Request, Response } from 'express'
import {
  roleRepos,
  roleGroupRepos,
  Roles,
  ThroughModelRolesGroupRepos,
} from '../db'
import { RolesGroup } from '/models/roles'

const include = [
  {
    model: Roles,
    required: false,
    attributes: ['id', 'role', 'nameRole', 'active'],
  },
]

const attributes = ['id', 'group', 'groupName', 'active']

export class roleService {
  newRolesGroup = async (_req: Request, res: Response) => {
    const { group, groupName, selectedRoles } = _req.body
    try {
      const newRoleGroup = await roleGroupRepos.create({
        group,
        groupName,
        active: true,
      })
      const newthroughRolesGroup = selectedRoles.map((item: string) => {
        return {
          id_roles: item,
          id_rolesGroup: newRoleGroup.id,
        }
      })
      await ThroughModelRolesGroupRepos.bulkCreate(newthroughRolesGroup)
      const rolesGroup = await roleGroupRepos.findAll({
        where: { active: true },
        include,
        attributes,
      })
      res.status(200).json(rolesGroup)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  getRolesGroup = (_req: Request, res: Response) => {
    roleGroupRepos
      .findAll({ where: { active: true }, include, attributes })
      .then(rolesGroup => res.status(200).json(rolesGroup))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getAllRolesGroup = (_req: Request, res: Response) => {
    roleGroupRepos
      .findAll({ include, attributes })
      .then(rolesGroup => res.status(200).json(rolesGroup))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getRolesGroupNotRoles = (_req: Request, res: Response) => {
    roleGroupRepos
      .findAll({ where: { active: true }, attributes })
      .then(rolesGroup => res.status(200).json(rolesGroup))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getAllRolesGroupNotRoles = (_req: Request, res: Response) => {
    roleGroupRepos
      .findAll({ attributes })
      .then(rolesGroup => res.status(200).json(rolesGroup))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getRolesGroupByID = (_req: Request, res: Response) => {
    const { id } = _req.body
    roleGroupRepos
      .findAll({
        where: { active: true, id },
        include,
        attributes,
      })
      .then(rolesGroup => {
        res.status(200).json(rolesGroup)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }
  deleteRolesGroup = async (_req: Request, res: Response) => {
    const { selectedRolesGroup } = _req.body
    try {
      await roleGroupRepos.update(selectedRolesGroup, {
        active: false,
      })
      const rolesGroup = await roleGroupRepos.findAll({
        where: { active: true },
        include,
        attributes,
      })
      res.status(200).json(rolesGroup)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  fullDeleteRolesGroup = async (_req: Request, res: Response) => {
    const { selectedRolesGroup } = _req.body
    try {
      const checkRolesGroup = (await roleGroupRepos.findOne({
        where: { id: selectedRolesGroup },
      })) as RolesGroup
      if (
        checkRolesGroup.group === 'SUPERADMIN' ||
        checkRolesGroup.group === 'ADMIN'
      ) {
        return res
          .status(400)
          .json({ message: 'Нельзя удалить админские роли!!!' })
      }
      await roleGroupRepos.destroy({
        where: { id: selectedRolesGroup },
      })
      await ThroughModelRolesGroupRepos.destroy({
        where: { id_rolesGroup: selectedRolesGroup },
      })
      const rolesGroup = await roleGroupRepos.findAll({})
      res.status(200).json(rolesGroup)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  pullRolesGroupFromArchive = async (_req: Request, res: Response) => {
    const { selectedRolesGroup } = _req.body
    try {
      await roleGroupRepos.update(selectedRolesGroup, {
        active: true,
      })
      const roles = await roleGroupRepos.findAll({
        where: { active: true },
        include,
        attributes,
      })
      res.status(200).json(roles)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  changeRolesGroup = async (_req: Request, res: Response) => {
    const { selectedRoles, activeRolesGroup } = _req.body
    try {
      await ThroughModelRolesGroupRepos.deleteByCustomId({
        id_rolesGroup: activeRolesGroup,
      })
      const newThroughContractRolesGroup = selectedRoles.map((item: string) => {
        return {
          id_rolesGroup: activeRolesGroup,
          id_roles: item,
        }
      })
      await ThroughModelRolesGroupRepos.bulkCreate(newThroughContractRolesGroup)
      const rolesGroup = await roleGroupRepos.findAll({
        where: { active: true },
        include,
        attributes,
      })
      res.status(200).json(rolesGroup)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  changeNameRolesGroup = async (_req: Request, res: Response) => {
    const { id, group, groupName } = _req.body
    try {
      await roleGroupRepos.update(id, {
        group,
        groupName,
      })
      const rolesGroup = await roleGroupRepos.findAll({
        where: { active: true },
        include,
        attributes,
      })
      res.status(200).json(rolesGroup)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  newRole = async (_req: Request, res: Response) => {
    const { role, nameRole, selectedRolesGroups } = _req.body
    try {
      const newRole = await roleRepos.create({ role, nameRole, active: true })
      const newthroughRolesGroup = selectedRolesGroups.map((item: string) => {
        return {
          id_roles: newRole.id,
          id_rolesGroup: item,
        }
      })
      await ThroughModelRolesGroupRepos.bulkCreate(newthroughRolesGroup)
      const roles = await roleRepos.findAll({ where: { active: true } })
      res.status(200).json(roles)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  getRoles = (_req: Request, res: Response) => {
    roleRepos
      .findAll({ where: { active: true } })
      .then(roles => res.status(200).json(roles))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  deleteRoles = async (_req: Request, res: Response) => {
    const { selectedRoles } = _req.body
    try {
      await roleRepos.update(selectedRoles, {
        active: false,
      })
      const roles = await roleRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(roles)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  fullDeleteRole = async (_req: Request, res: Response) => {
    const { selectedRoles } = _req.body
    try {
      await roleRepos.destroy({
        where: { id: selectedRoles },
      })
      await ThroughModelRolesGroupRepos.destroy({
        where: { id_roles: selectedRoles },
      })
      const roles = await roleRepos.findAll({})
      res.status(200).json(roles)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  pullRoleFromArchive = async (_req: Request, res: Response) => {
    const { selectedRoles } = _req.body
    try {
      await roleRepos.update(selectedRoles, {
        active: true,
      })
      const roles = await roleRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(roles)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  getAllRoles = async (_req: Request, res: Response) => {
    try {
      const roles = await roleRepos.findAll({})
      res.status(200).json(roles)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  changeNameRole = async (_req: Request, res: Response) => {
    const { id, role, nameRole } = _req.body
    try {
      await roleRepos.update(id, {
        role,
        nameRole,
      })
      const roles = await roleRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(roles)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
}

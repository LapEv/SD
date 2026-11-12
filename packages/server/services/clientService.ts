import { ClientsRepos, ClientsGroupRepos, Contacts, Files } from '../db'
import type { Request, Response } from 'express'
import { getOrder } from '../utils/getOrder'
import bcrypt from 'bcryptjs'

export const order = getOrder('client', 'ASC')
const orderGroup = getOrder('groupName', 'ASC')

export const includesContacts = [
  {
    model: Contacts,
    attributes: [
      'id',
      'lastName',
      'firstName',
      'middleName',
      'email',
      'post',
      'phone',
      'comment',
      'id_client',
      'active',
    ],
    required: false,
  },
  {
    model: Files,
    required: false,
    attributes: ['id', 'name', 'path', 'size', 'mimetype'],
  },
]

export class clientService {
  newClient = async (_req: Request, res: Response) => {
    try {
      await ClientsRepos.create({
        ..._req.body,
        active: true,
      })
      const clients = await ClientsRepos.findAll({
        where: { active: true },
        include: includesContacts,
        order,
      })
      res.status(200).json(clients)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  getAllClients = (_req: Request, res: Response) => {
    ClientsRepos.findAll({ order, include: includesContacts })
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }

  getClients = (_req: Request, res: Response) => {
    ClientsRepos.findAll({
      where: { active: true },
      order,
      include: includesContacts,
    })
      .then(clients => {
        res.status(200).json(clients)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }

  deleteClient = async (_req: Request, res: Response) => {
    try {
      const { selectedClients } = _req.body
      await ClientsRepos.update(selectedClients, {
        active: false,
      })
      const clients = await ClientsRepos.findAll({
        where: { active: true },
        order,
        include: includesContacts,
      })
      res.status(200).json(clients)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  fulldeleteClient = async (_req: Request, res: Response) => {
    const { selectedClients } = _req.body
    try {
      await ClientsRepos.destroy({
        where: { id: selectedClients },
      })
      const clients = await ClientsRepos.findAll({
        order,
        include: includesContacts,
      })
      res.status(200).json(clients)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  pullClientFromArchive = async (_req: Request, res: Response) => {
    const { selectedClients } = _req.body
    try {
      await ClientsRepos.update(selectedClients, {
        active: true,
      })
      const clients = await ClientsRepos.findAll({
        where: { active: true },
        order,
        include: includesContacts,
      })
      res.status(200).json(clients)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  changeClient = async (_req: Request, res: Response) => {
    const { id } = _req.body
    try {
      const { password } = _req.body
      const hashPassword = bcrypt.hashSync(password, 7)
      const newData = {
        ..._req.body,
        password: hashPassword,
      }
      await ClientsRepos.update(id, newData)
      const clients = await ClientsRepos.findAll({
        where: { active: true },
        order,
        include: includesContacts,
      })
      res.status(200).json(clients)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  newClientGroup = async (_req: Request, res: Response) => {
    try {
      await ClientsGroupRepos.create({ ..._req.body, active: true })
      const clientsGroup = await ClientsGroupRepos.findAll({
        where: { active: true },
        order: orderGroup,
      })
      res.status(200).json(clientsGroup)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  getAllClientGroups = (_req: Request, res: Response) => {
    ClientsGroupRepos.findAll({ order: orderGroup })
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }

  getClientGroups = (_req: Request, res: Response) => {
    ClientsGroupRepos.findAll({
      where: { active: true },
      order: orderGroup,
    })
      .then(clients => {
        res.status(200).json(clients)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }

  deleteClientGroup = async (_req: Request, res: Response) => {
    const { selectedClientsGroup } = _req.body
    try {
      await ClientsGroupRepos.update(selectedClientsGroup, {
        active: false,
      })
      const clientsGroup = await ClientsGroupRepos.findAll({
        where: { active: true },
        order: orderGroup,
      })
      res.status(200).json(clientsGroup)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  fulldeleteClientsGroup = async (_req: Request, res: Response) => {
    const { selectedClientsGroup } = _req.body
    try {
      await ClientsGroupRepos.destroy({
        where: { id: selectedClientsGroup },
      })
      const clientsGroup = await ClientsGroupRepos.findAll({
        order: orderGroup,
      })
      res.status(200).json(clientsGroup)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  pullClientsGroupFromArchive = async (_req: Request, res: Response) => {
    const { selectedClientsGroup } = _req.body
    try {
      await ClientsGroupRepos.update(selectedClientsGroup, {
        active: true,
      })
      const clientsGroup = await ClientsGroupRepos.findAll({
        where: { active: true },
        order: orderGroup,
      })
      res.status(200).json(clientsGroup)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  changeClientGroup = async (_req: Request, res: Response) => {
    const { groupName, clients, id } = _req.body
    try {
      await ClientsRepos.update(id, {
        groupName,
        clients,
      })
      const clientsGroup = await ClientsGroupRepos.findAll({
        where: { active: true },
        order: orderGroup,
      })
      res.status(200).json(clientsGroup)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
}

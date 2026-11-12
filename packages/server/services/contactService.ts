import type { Request, Response } from 'express'
import { getOrder } from '../utils/getOrder'
import { ClientsRepos, ContactsRepos } from '../db'
import { includesContacts, order as orderClient } from './clientService'
import { IClientContact } from '/models/contacts'

const order = getOrder('lastName', 'ASC')

export class contactService {
  newContact = async (_req: Request, res: Response) => {
    try {
      await ContactsRepos.create({
        ..._req.body,
        active: true,
      })
      const client = await ClientsRepos.findAll({
        where: { id: _req.body.id_client },
        order: orderClient,
        include: includesContacts,
      })

      res.status(200).json(client)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  getAllContacts = (_req: Request, res: Response) => {
    ContactsRepos.findAll({ order })
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }

  getContacts = (_req: Request, res: Response) => {
    ContactsRepos.findAll({
      order,
    })
      .then(contacts => {
        res.status(200).json(contacts)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }

  deleteContact = async (_req: Request, res: Response) => {
    const { selectedContacts } = _req.body
    try {
      await ContactsRepos.update(selectedContacts, {
        active: false,
      })
      const contacts = await ContactsRepos.findAll({
        order,
      })
      res.status(200).json(contacts)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  fullDeleteContact = async (_req: Request, res: Response) => {
    const { selectedContacts } = _req.body
    try {
      await ContactsRepos.destroy({
        where: { id: selectedContacts },
      })
      const contacts = await ContactsRepos.findAll({ order })
      res.status(200).json(contacts)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  pullContactFromArchive = async (_req: Request, res: Response) => {
    const { selectedContacts } = _req.body
    try {
      await ContactsRepos.update(selectedContacts, {
        active: true,
      })
      const contacts = await ContactsRepos.findAll({
        order,
      })
      res.status(200).json(contacts)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  changeContact = async (_req: Request, res: Response) => {
    const newContacts = _req.body as IClientContact[]
    try {
      await Promise.all(
        newContacts.map(async contact => {
          const { id } = contact
          await ContactsRepos.update(id, { ...contact })
        }),
      )
      const contacts = await ContactsRepos.findAll({
        order,
      })
      res.status(200).json(contacts)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
}

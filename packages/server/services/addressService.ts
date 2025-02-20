import type { Request, Response } from 'express'
import { AddressesRepos, Regions, RegionsRepos } from '../db'

export class addressService {
  newAddress = async (_req: Request, res: Response) => {
    try {
      await AddressesRepos.create({ ..._req.body, active: true })
      const addresses = await AddressesRepos.findAll({})
      res.status(200).json(addresses)
    } catch (err) {
      res
        .status(500)
        .json({ error: ['db error: unable to set new address', err as Error] })
    }
  }

  getAllAddresses = (_req: Request, res: Response) => {
    AddressesRepos.findAll({
      include: {
        model: Regions,
        attributes: ['region'],
        required: false,
      },
    })
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }

  getAddresses = (_req: Request, res: Response) => {
    AddressesRepos.findAll({
      where: { active: true },
      include: {
        model: Regions,
        attributes: ['region'],
        required: false,
      },
    })
      .then(addresses => {
        res.status(200).json(addresses)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }

  deleteAddress = async (_req: Request, res: Response) => {
    const { selectedAddresses } = _req.body
    try {
      await AddressesRepos.update(selectedAddresses, {
        active: false,
      })
      const addresses = await AddressesRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(addresses)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  fullDeleteAddress = async (_req: Request, res: Response) => {
    const { selectedAddresses } = _req.body
    try {
      await AddressesRepos.destroy({
        where: { id: selectedAddresses },
      })
      const addresses = await AddressesRepos.findAll({})
      res.status(200).json(addresses)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  pullAddressFromArchive = async (_req: Request, res: Response) => {
    const { selectedAddresses } = _req.body
    try {
      await AddressesRepos.update(selectedAddresses, {
        active: true,
      })
      const users = await AddressesRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(users)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  changeAddress = async (_req: Request, res: Response) => {
    const { address, coordinates, activeRolesGroup } = _req.body
    try {
      await AddressesRepos.update(activeRolesGroup, {
        address,
        coordinates,
      })
      const addresses = await AddressesRepos.findAll({})
      res.status(200).json(addresses)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  newRegion = async (_req: Request, res: Response) => {
    try {
      await RegionsRepos.create({ ..._req.body, active: true })
      const regions = await RegionsRepos.findAll({})
      res.status(200).json(regions)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  getAllRegions = (_req: Request, res: Response) => {
    RegionsRepos.findAll({})
      .then(regions => res.status(200).json(regions))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getRegions = (_req: Request, res: Response) => {
    RegionsRepos.findAll({
      where: { active: true },
    })
      .then(regions => {
        res.status(200).json(regions)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }
  deleteRegion = async (_req: Request, res: Response) => {
    const { selectedRegions } = _req.body
    try {
      await RegionsRepos.update(selectedRegions, {
        active: false,
      })
      const regions = await RegionsRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(regions)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  fullDeleteRegion = async (_req: Request, res: Response) => {
    const { selectedRegions } = _req.body
    try {
      await RegionsRepos.destroy({
        where: { id: selectedRegions },
      })
      const regions = await RegionsRepos.findAll({})
      res.status(200).json(regions)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  pullRegionFromArchive = async (_req: Request, res: Response) => {
    const { selectedRegions } = _req.body
    try {
      await RegionsRepos.update(selectedRegions, {
        active: true,
      })
      const users = await RegionsRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(users)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  changeRegion = async (_req: Request, res: Response) => {
    const { region, id } = _req.body
    try {
      await RegionsRepos.update(id, {
        region,
      })
      const regions = await RegionsRepos.findAll({})
      res.status(200).json(regions)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
}

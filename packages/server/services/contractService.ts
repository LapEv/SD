import {
  ClassifierEquipment,
  ClassifierModels,
  Clients,
  ContractsRepos,
  IncindentStatuses,
  Objects,
  SLA,
  ThroughContractsEquipmentsRepos,
  ThroughContractsIncStatussesRepos,
  ThroughContractsModelsRepos,
  ThroughContractsObjectsRepos,
  ThroughContractsSLARepos,
  TypesOfWork,
  TypicalMalfunctions,
} from '../db'
import type { Request, Response } from 'express'
import { getOrder } from '../utils/getOrder'

const includes = [
  {
    model: SLA,
    where: { active: true },
    required: false,
    include: [
      {
        model: TypesOfWork,
        attributes: ['id', 'typeOfWork', 'active'],
        where: { active: true },
        required: false,
      },
    ],
  },
  {
    model: Objects,
    where: { active: true },
    required: false,
    through: {
      attributes: [],
    },
  },
  {
    model: IncindentStatuses,
    where: { active: true },
    required: false,
    through: {
      attributes: [],
    },
  },
  {
    model: ClassifierEquipment,
    where: { active: true },
    required: false,
    include: [
      {
        model: ClassifierModels,
        required: false,
        attributes: ['id', 'model', 'id_equipment', 'active'],
        where: { active: true },
        include: [
          {
            model: TypicalMalfunctions,
            required: false,
            attributes: ['id', 'typicalMalfunction', 'id_equipment', 'active'],
            where: { active: true },
          },
        ],
      },
    ],
  },
  {
    model: Clients,
    required: false,
    where: { active: true },
  },
]

const includesAll = [
  {
    model: SLA,
    required: false,
    include: [
      { model: TypesOfWork, attributes: ['id', 'typeOfWork', 'active'] },
    ],
  },
  {
    model: Objects,
    required: false,
    through: {
      attributes: [],
    },
  },
  {
    model: ClassifierEquipment,
    required: false,
    include: [
      {
        model: ClassifierModels,
        required: false,
        attributes: ['id', 'model', 'active'],
        include: [
          {
            model: TypicalMalfunctions,
            required: false,
            // attributes: ['id', 'typicalMalfunction', 'active'],
          },
        ],
      },
    ],
  },
  {
    model: Clients,
    required: false,
  },
]

const order = getOrder('contract', 'ASC')

export class contractService {
  newContract = async (_req: Request, res: Response) => {
    const { sla, equipment, model, objects, ...data } = _req.body
    try {
      const new_contract = await ContractsRepos.create({
        ...data,
        active: true,
      })
      const newThroughContractSla = sla.map((item: string) => {
        return {
          id_contract: new_contract.id,
          id_sla: item,
        }
      })
      await ThroughContractsSLARepos.bulkCreate(newThroughContractSla)
      const newThroughContractEquipment = equipment.map((item: string) => {
        return {
          id_contract: new_contract.id,
          id_equipment: item,
        }
      })
      await ThroughContractsEquipmentsRepos.bulkCreate(
        newThroughContractEquipment,
      )

      const newThroughContractModels = model.map((item: string) => {
        return {
          id_contract: new_contract.id,
          id_model: item,
        }
      })
      await ThroughContractsModelsRepos.bulkCreate(newThroughContractModels)

      const newThroughContractObject = objects.map((item: string) => {
        return {
          id_contract: new_contract.id,
          id_object: item,
        }
      })
      await ThroughContractsObjectsRepos.bulkCreate(newThroughContractObject)

      const contracts = await ContractsRepos.findAll({
        where: { active: true },
        order,
        include: includes,
      })
      res.status(200).json(contracts)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  newContractName = async (_req: Request, res: Response) => {
    const { contract, id } = _req.body
    try {
      await ContractsRepos.update(id, {
        contract,
      })
      const contracts = await ContractsRepos.findAll({
        where: { active: true },
        order,
        include: includes,
      })
      res.status(200).json(contracts)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  getAllContracts = (_req: Request, res: Response) => {
    ContractsRepos.findAll({ include: includesAll, order })
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }

  getContracts = (_req: Request, res: Response) => {
    ContractsRepos.findAll({
      where: { active: true },
      include: includes,
      order,
    })
      .then(contracts => {
        res.status(200).json(contracts)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }

  getContractsByClientID = (_req: Request, res: Response) => {
    const { id_client } = _req.body
    ContractsRepos.findAll({
      where: { active: true, id_client },
      include: includes,
      order,
    })
      .then(contracts => {
        res.status(200).json(contracts)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }

  deleteContract = async (_req: Request, res: Response) => {
    const { selectedContracts } = _req.body
    try {
      await ContractsRepos.update(selectedContracts, {
        active: false,
      })
      const contracts = await ContractsRepos.findAll({
        where: { active: true },
        order,
      })
      res.status(200).json(contracts)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  fullDeleteContract = async (_req: Request, res: Response) => {
    const { selectedContracts } = _req.body
    try {
      await ContractsRepos.destroy({
        where: { id: selectedContracts },
      })
      const contracts = await ContractsRepos.findAll({ order })
      res.status(200).json(contracts)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  pullContractFromArchive = async (_req: Request, res: Response) => {
    const { selectedContracts } = _req.body
    try {
      await ContractsRepos.update(selectedContracts, {
        active: true,
      })
      const contracts = await ContractsRepos.findAll({
        where: { active: true },
        order,
        include: includes,
      })
      res.status(200).json(contracts)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  changeContract = async (_req: Request, res: Response) => {
    const {
      number,
      date,
      id,
      sla,
      equipment,
      model,
      objects,
      incStatusses,
      notificationEmail,
    } = _req.body
    try {
      await ContractsRepos.update(id, { number, date, notificationEmail })
      if (sla && sla.length) {
        await ThroughContractsSLARepos.deleteByCustomId({
          id_contract: id,
        })
        const newThroughContractSla = sla.map((item: string) => {
          return {
            id_contract: id,
            id_sla: item,
          }
        })
        await ThroughContractsSLARepos.bulkCreate(newThroughContractSla)
      }

      if (equipment && equipment.length) {
        await ThroughContractsEquipmentsRepos.deleteByCustomId({
          id_contract: id,
        })
        const newThroughContractEquipment = equipment.map((item: string) => {
          return {
            id_contract: id,
            id_equipment: item,
          }
        })
        await ThroughContractsEquipmentsRepos.bulkCreate(
          newThroughContractEquipment,
        )
      }

      if (model && model.length) {
        await ThroughContractsModelsRepos.deleteByCustomId({
          id_contract: id,
        })
        const newThroughContractModel = model.map((item: string) => {
          return {
            id_contract: id,
            id_model: item,
          }
        })
        await ThroughContractsModelsRepos.bulkCreate(newThroughContractModel)
      }

      if (objects && objects.length) {
        await ThroughContractsObjectsRepos.deleteByCustomId({
          id_contract: id,
        })
        const newThroughContractObject = objects.map((item: string) => {
          return {
            id_contract: id,
            id_object: item,
          }
        })
        await ThroughContractsObjectsRepos.bulkCreate(newThroughContractObject)
      }

      if (incStatusses && incStatusses.length) {
        await ThroughContractsIncStatussesRepos.deleteByCustomId({
          id_contract: id,
        })
        const newThroughContractincStatusses = incStatusses.map(
          (item: string) => {
            return {
              id_contract: id,
              id_incStatusses: item,
            }
          },
        )
        await ThroughContractsIncStatussesRepos.bulkCreate(
          newThroughContractincStatusses,
        )
      }

      const contracts = await ContractsRepos.findAll({
        where: { active: true },
        order,
        include: includes,
      })
      res.status(200).json(contracts)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
}

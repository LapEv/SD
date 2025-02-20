import { Order } from 'sequelize'
import {
  ClassifierEquipment,
  // ClassifierEquipment,
  ClassifierEquipmentRepos,
  ClassifierModels,
  ClassifierModelsRepos,
  ThroughModelTypMalfunctionsRepos,
  TypicalMalfunctions,
  TypicalMalfunctionsRepos,
} from '../db'
import type { Request, Response } from 'express'

const includesEquipment = [
  {
    model: ClassifierModels,
    attributes: ['id', 'model', 'id_equipment', 'active'],
    where: { active: true },
    required: false,
    include: [
      {
        model: TypicalMalfunctions,
        attributes: ['id', 'typicalMalfunction', 'id_equipment', 'active'],
        where: { active: true },
        required: false,
      },
    ],
  },
  {
    model: TypicalMalfunctions,
    attributes: ['id', 'typicalMalfunction', 'id_equipment', 'active'],
    where: { active: true },
    required: false,
  },
]

const includesModel = [
  {
    model: TypicalMalfunctions,
    attributes: ['id', 'typicalMalfunction', 'id_equipment', 'active'],
    where: { active: true },
    required: false,
  },
  {
    model: ClassifierEquipment,
    attributes: ['id', 'equipment'],
    where: { active: true },
    required: true,
  },
]

const includesTypMalnuction = [
  {
    model: ClassifierModels,
    attributes: ['id', 'model'],
    where: { active: true },
    required: false,
  },
  {
    model: ClassifierEquipment,
    attributes: ['id', 'equipment'],
    where: { active: true },
    required: true,
  },
]

const includesAllEquipment = [
  {
    model: ClassifierModels,
    attributes: ['id', 'model', 'id_equipment', 'active'],
    required: false,
    include: [
      {
        model: TypicalMalfunctions,
        attributes: ['id', 'typicalMalfunction', 'id_equipment', 'active'],
        required: false,
      },
    ],
  },
  {
    model: TypicalMalfunctions,
    attributes: ['id', 'typicalMalfunction', 'id_equipment', 'active'],
    required: false,
  },
]

const includesAllModel = [
  {
    model: TypicalMalfunctions,
    attributes: ['id', 'typicalMalfunction', 'id_equipment', 'active'],
    required: false,
  },
  {
    model: ClassifierEquipment,
    attributes: ['id', 'equipment'],
    where: { active: true },
    required: true,
  },
]

const order = [
  ['equipment', 'ASC'],
  [ClassifierModels, 'model', 'ASC'],
  [TypicalMalfunctions, 'typicalMalfunction', 'ASC'],
] as Order

const orderModel = [
  ['model', 'ASC'],
  [TypicalMalfunctions, 'typicalMalfunction', 'ASC'],
] as Order

const orderTypicalMalfunction = [['typicalMalfunction', 'ASC']] as Order

export class classifierService {
  newClassifierEquipment = async (_req: Request, res: Response) => {
    try {
      await ClassifierEquipmentRepos.create({ ..._req.body, active: true })
      const classifierEquipments = await ClassifierEquipmentRepos.findAll({
        where: { active: true },
        include: includesEquipment,
        order,
      })
      res.status(200).json(classifierEquipments)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  getAllClassifierEquipments = (_req: Request, res: Response) => {
    ClassifierEquipmentRepos.findAll({
      include: includesAllEquipment,
      order,
    })
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getClassifierEquipments = (_req: Request, res: Response) => {
    ClassifierEquipmentRepos.findAll({
      where: { active: true },
      include: includesEquipment,
      order,
    })
      .then(classifierEquipments => {
        res.status(200).json(classifierEquipments)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }
  deleteClassifierEquipment = async (_req: Request, res: Response) => {
    const { selectedClassifierEquipments } = _req.body
    try {
      await ClassifierEquipmentRepos.update(selectedClassifierEquipments, {
        active: false,
      })
      const classifierEquipments = await ClassifierEquipmentRepos.findAll({
        where: { active: true },
        include: includesEquipment,
        order,
      })
      res.status(200).json(classifierEquipments)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  fullDeleteClassifierEquipment = async (_req: Request, res: Response) => {
    const { selectedClassifierEquipments } = _req.body
    try {
      await ClassifierEquipmentRepos.destroy({
        where: { id: selectedClassifierEquipments },
      })
      const classifierEquipments = await ClassifierEquipmentRepos.findAll({
        where: {
          include: includesEquipment,
          order,
        },
      })
      res.status(200).json(classifierEquipments[1])
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  pullClassifierEquipmentFromArchive = async (_req: Request, res: Response) => {
    const { selectedClassifierEquipments } = _req.body
    try {
      await ClassifierEquipmentRepos.update(selectedClassifierEquipments, {
        active: true,
      })
      const classifierEquipments = await ClassifierEquipmentRepos.findAll({
        where: { active: true },
        include: includesEquipment,
        order,
      })
      res.status(200).json(classifierEquipments)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  changeClassifierEquipment = async (_req: Request, res: Response) => {
    const { equipment, id } = _req.body
    try {
      await ClassifierEquipmentRepos.update(id, { equipment })
      const classifierEquipments = await ClassifierEquipmentRepos.findAll({
        where: { active: true },
        include: includesEquipment,
        order,
      })
      res.status(200).json(classifierEquipments)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  newClassifierModel = async (_req: Request, res: Response) => {
    const { id_equipment, model, selectedTypicalMalfunctions } = _req.body
    try {
      const newModel = await ClassifierModelsRepos.create({
        id_equipment,
        model,
        active: true,
      })
      if (selectedTypicalMalfunctions && selectedTypicalMalfunctions.length) {
        const newThroughModelTypicalMalfunction =
          selectedTypicalMalfunctions.map((item: string) => {
            return {
              id_model: newModel.id,
              id_typicalMalfunction: item,
            }
          })
        await ThroughModelTypMalfunctionsRepos.bulkCreate(
          newThroughModelTypicalMalfunction,
        )
      }
      const classifierEquipment = await ClassifierEquipmentRepos.findAll({
        where: { active: true },
        include: includesEquipment,
        order,
      })
      res.status(200).json(classifierEquipment)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  getAllClassifierModels = (_req: Request, res: Response) => {
    ClassifierModelsRepos.findAll({
      include: includesAllModel,
      order: orderModel,
    })
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getClassifierModels = (_req: Request, res: Response) => {
    ClassifierModelsRepos.findAll({
      where: { active: true },
      include: includesModel,
      order: orderModel,
    })
      .then(classifierModels => {
        res.status(200).json(classifierModels)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }
  getClassifierModelsById = (_req: Request, res: Response) => {
    const { id_equipment } = _req.body
    ClassifierModelsRepos.findAll({
      where: { active: true, id_equipment },
      include: includesModel,
      order: orderModel,
    })
      .then(classifierModels => {
        res.status(200).json(classifierModels)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }
  deleteClassifierModel = async (_req: Request, res: Response) => {
    const { selectedClassifierModels } = _req.body
    try {
      await ClassifierModelsRepos.update(selectedClassifierModels, {
        active: false,
      })
      const classifierEquipment = await ClassifierEquipmentRepos.findAll({
        where: { active: true },
        include: includesEquipment,
        order,
      })
      res.status(200).json(classifierEquipment)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  fullDeleteClassifierModel = async (_req: Request, res: Response) => {
    const { selectedСlassifierModels } = _req.body
    try {
      await ClassifierModelsRepos.destroy({
        where: { id: selectedСlassifierModels },
      })
      const classifierModels = await ClassifierModelsRepos.findAll({
        where: { active: true },
        include: includesModel,
        order: orderModel,
      })
      res.status(200).json(classifierModels)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  pullClassifierModelFromArchive = async (_req: Request, res: Response) => {
    const { selectedClassifierModels } = _req.body
    try {
      await ClassifierModelsRepos.update(selectedClassifierModels, {
        active: true,
      })
      const classifierModels = await ClassifierModelsRepos.findAll({
        where: { active: true },
        include: includesModel,
        order: orderModel,
      })
      res.status(200).json(classifierModels)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  changeClassifierModel = async (_req: Request, res: Response) => {
    const { model, id, selectedTypicalMalfunctions } = _req.body
    try {
      await ClassifierModelsRepos.update(id, { model })

      if (selectedTypicalMalfunctions && selectedTypicalMalfunctions.length) {
        await ThroughModelTypMalfunctionsRepos.deleteByCustomId({
          id_model: id,
        })
        const newThroughModelTypicalMalfunction =
          selectedTypicalMalfunctions.map((item: string) => {
            return {
              id_model: id,
              id_typicalMalfunction: item,
            }
          })
        await ThroughModelTypMalfunctionsRepos.bulkCreate(
          newThroughModelTypicalMalfunction,
        )
      }
      const classifierEquipment = await ClassifierEquipmentRepos.findAll({
        where: { active: true },
        include: includesEquipment,
        order,
      })
      res.status(200).json(classifierEquipment)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  newTypicalMalfunction = async (_req: Request, res: Response) => {
    const { selectedModels, ...data } = _req.body
    try {
      const typMalfunction = await TypicalMalfunctionsRepos.create({
        ...data,
        active: true,
      })
      if (selectedModels && selectedModels.length) {
        const newThroughModelTypMalfunctions = selectedModels.map(
          (item: string) => {
            return {
              id_typicalMalfunction: typMalfunction.id,
              id_model: item,
            }
          },
        )
        await ThroughModelTypMalfunctionsRepos.bulkCreate(
          newThroughModelTypMalfunctions,
        )
      }
      const equipments = await ClassifierEquipmentRepos.findAll({
        where: { active: true },
        include: includesEquipment,
        order,
      })
      res.status(200).json(equipments)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  getAllTypicalMalfunctions = (_req: Request, res: Response) => {
    TypicalMalfunctionsRepos.findAll({ order: orderTypicalMalfunction })
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getTypicalMalfunctions = (_req: Request, res: Response) => {
    TypicalMalfunctionsRepos.findAll({
      where: { active: true },
      include: includesTypMalnuction,
      order: orderTypicalMalfunction,
    })
      .then(typicalMalfunctions => {
        res.status(200).json(typicalMalfunctions)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }
  getTypicalMalfunctionsById = (_req: Request, res: Response) => {
    const { id_equipment } = _req.body
    TypicalMalfunctionsRepos.findAll({
      where: { active: true, id_equipment },
      order: orderTypicalMalfunction,
    })
      .then(typicalMalfunctions => {
        res.status(200).json(typicalMalfunctions)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }
  deleteTypicalMalfunction = async (_req: Request, res: Response) => {
    const { selectedtypicalMalfunctions } = _req.body
    try {
      await TypicalMalfunctionsRepos.update(selectedtypicalMalfunctions, {
        active: false,
      })
      const equipments = await ClassifierEquipmentRepos.findAll({
        where: { active: true },
        include: includesEquipment,
        order,
      })
      res.status(200).json(equipments)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  fullDeleteTypicalMalfunction = async (_req: Request, res: Response) => {
    const { selectedtypicalMalfunctions } = _req.body
    try {
      await TypicalMalfunctionsRepos.destroy({
        where: { id: selectedtypicalMalfunctions },
      })
      const typicalMalfunctions = await TypicalMalfunctionsRepos.findAll({})
      res.status(200).json(typicalMalfunctions)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  pullTypicalMalfunctionFromArchive = async (_req: Request, res: Response) => {
    const { selectedTypicalMalfunctions } = _req.body
    try {
      await TypicalMalfunctionsRepos.update(selectedTypicalMalfunctions, {
        active: true,
      })
      const typicalMalfunctions = await TypicalMalfunctionsRepos.findAll({
        where: { active: true },
        order: orderTypicalMalfunction,
      })
      res.status(200).json(typicalMalfunctions)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  changeTypicalMalfunction = async (_req: Request, res: Response) => {
    const { typicalMalfunction, id } = _req.body
    try {
      await TypicalMalfunctionsRepos.update(id, {
        typicalMalfunction,
      })
      const equipments = await ClassifierEquipmentRepos.findAll({
        where: { active: true },
        include: includesEquipment,
        order,
      })
      res.status(200).json(equipments)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
}

import { IRolesGroup } from './../models/roles'
import {
  Addresses,
  AddressesRepos,
  ClassifierEquipment,
  ClassifierEquipmentRepos,
  ClassifierModels,
  ClassifierModelsRepos,
  Clients,
  ClientsRepos,
  Contracts,
  ContractsRepos,
  Files,
  IncidentLogs,
  IncidentLogsRepos,
  IncidentRepos,
  IncidentStatusesRepos,
  IncindentStatuses,
  Objects,
  ObjectsRepos,
  Regions,
  RegionsRepos,
  SLA,
  SLARepos,
  TypesCompletedWork,
  TypesCompletedWorkRepos,
  TypesOfWork,
  TypesOfWorkRepos,
  TypicalMalfunctions,
  Users,
  roleGroupRepos,
  userRepos,
} from './../db'
import type { Request, Response } from 'express'
import { AppConst } from '../data/const'
import { convertDateToString } from '../utils/convertDate'
import { mailerChangeStatus, mailerRegInc } from '../Mailer'
import {
  IIncindent,
  IIncindentStatuses,
  Incindent,
  INewINCFromMail,
  ITimeSLA,
} from '/models/incidents'
import { Op, Order, WhereOptions } from 'sequelize'
import { IContracts, IContractsSLA } from '/models/contracts'
import { IClients } from '/models/clients'
import { IObjects } from '/models/objects'
import { ISLA } from '/models/sla'
import { IAddresses, IRegions } from '/models/adresses'
import { IUser } from '/models/users'
import { IClassifierEquipment, IClassifierModels } from '/models/classifier'
import { getOrderINC } from '../utils/getOrder'
import { getNewINC } from '../utils/getNewINC'
import { checkTemplateFromSD } from '../Mailer/checkTemplate'
import { IPrepareStatusObj } from './interfaces'
import { checkForCloseINC } from '../utils/checkForCloseINC'

export class incidentService {
  get Includes() {
    return this.includes
  }

  set IncludesAddress(data: string) {
    const incl = this.includes.map(item => {
      if (item.model === Objects) {
        return {
          model: Objects,
          required: true,
          attributes: [
            'id',
            'object',
            'internalClientID',
            'internalClientName',
            'active',
          ],
          include: item.include?.map(value => {
            if (value.model === Addresses) {
              return {
                model: Addresses,
                required: true,
                attributes: ['id', 'address', 'coordinates', 'active'],
                where: { id: data },
              }
            }
            return value
          }) as [],
        }
      }
      return item
    })
    this.includes = incl
  }

  set IncludesRegion(data: string) {
    const incl = this.includes.map(item => {
      if (item.model === Objects) {
        return {
          model: Objects,
          required: true,
          attributes: [
            'id',
            'object',
            'internalClientID',
            'internalClientName',
            'active',
          ],
          include: item.include?.map(value => {
            if (value.model === Regions) {
              return {
                model: Regions,
                required: true,
                attributes: ['id', 'region', 'active'],
                where: { id: data },
              }
            }
            return value
          }) as [],
        }
      }
      return item
    })
    this.includes = incl
  }

  get ResetIncludesAddress() {
    const incl = this.includes.map(item => {
      if (item.model === Objects) {
        return {
          model: Objects,
          required: true,
          attributes: [
            'id',
            'object',
            'internalClientID',
            'internalClientName',
            'active',
          ],
          include: [
            {
              model: Addresses,
              required: true,
              attributes: ['id', 'address', 'coordinates', 'active'],
            },
            {
              model: Regions,
              required: true,
              attributes: ['id', 'region', 'active'],
            },
          ],
        }
      }
      return item
    })
    this.includes = incl
    return this.includes
  }

  incLogs = [
    {
      model: Users,
      required: true,
      attributes: [
        'id',
        'username',
        'firstName',
        'lastName',
        'middleName',
        'shortName',
        'active',
      ],
    },
  ]

  includes = [
    {
      model: IncindentStatuses,
      required: true,
      attributes: ['id', 'statusINC', 'stateNumber', 'active'],
    },
    {
      model: TypesOfWork,
      required: true,
      attributes: ['id', 'typeOfWork', 'active'],
    },
    {
      model: TypesCompletedWork,
      required: false,
      attributes: ['id', 'typeCompletedWork', 'active'],
    },
    {
      model: SLA,
      required: true,
      attributes: [
        'id',
        'sla',
        'days',
        'time',
        'timeStart',
        'timeEnd',
        'active',
      ],
    },
    {
      model: Clients,
      required: true,
      attributes: ['id', 'legalName', 'client', 'active'],
    },
    {
      model: Contracts,
      required: true,
      attriIncidentLogsReposbutes: [
        'id',
        'contract',
        'active',
        'notificationEmail',
      ],
      include: [
        {
          model: IncindentStatuses,
          required: false,
          attributes: ['id', 'statusINC', 'active'],
        },
      ],
    },
    {
      model: Objects,
      required: true,
      attributes: [
        'id',
        'object',
        'internalClientID',
        'internalClientName',
        'active',
      ],
      include: [
        {
          model: Addresses,
          required: true,
          attributes: ['id', 'address', 'coordinates', 'active'],
        },
        {
          model: Regions,
          required: true,
          attributes: ['id', 'region', 'active'],
        },
      ],
    },
    {
      model: Users,
      required: false,
      attributes: [
        'id',
        'username',
        'firstName',
        'lastName',
        'middleName',
        'shortName',
        'active',
      ],
    },
    {
      model: Users,
      as: 'UserExecutor',
      required: false,
      attributes: [
        'id',
        'username',
        'firstName',
        'lastName',
        'middleName',
        'shortName',
        'active',
      ],
    },
    {
      model: Users,
      as: 'UserResponsible',
      required: false,
      attributes: [
        'id',
        'username',
        'firstName',
        'lastName',
        'middleName',
        'shortName',
        'active',
      ],
    },
    {
      model: Users,
      as: 'UserClosingCheck',
      required: false,
      attributes: [
        'id',
        'username',
        'firstName',
        'lastName',
        'middleName',
        'shortName',
        'active',
      ],
    },
    {
      model: Users,
      as: 'UserClosing',
      required: false,
      attributes: [
        'id',
        'username',
        'firstName',
        'lastName',
        'middleName',
        'shortName',
        'active',
      ],
    },
    {
      model: ClassifierEquipment,
      required: false,
      attributes: ['id', 'equipment', 'active'],
    },
    {
      model: ClassifierModels,
      required: false,
      attributes: ['id', 'model', 'active'],
    },
    {
      model: TypicalMalfunctions,
      required: false,
      attributes: ['id', 'typicalMalfunction', 'active'],
    },
    {
      model: IncidentLogs,
      required: false,
      attributes: ['id', 'time', 'log'],
      include: this.incLogs,
    },
    {
      model: Files,
      required: false,
      attributes: ['id', 'name', 'size', 'mimetype', 'path', 'createdAt'],
    },
  ]

  orderINC = [
    [IncindentStatuses, 'stateNumber', 'ASC'],
    [TypesOfWork, 'typeOfWork', 'ASC'],
    [TypesCompletedWork, 'typeCompletedWork', 'ASC'],
    [SLA, 'sla', 'ASC'],
    [Clients, 'client', 'ASC'],
    [Contracts, 'contract', 'ASC'],
    [Objects, 'object', 'ASC'],
    [Users, 'shortName', 'ASC'],
    [ClassifierEquipment, 'equipment', 'ASC'],
    [ClassifierModels, 'model', 'ASC'],
    [TypicalMalfunctions, 'typicalMalfunction', 'ASC'],
    [IncidentLogs, 'time', 'ASC'],
    [Files, 'createdAt', 'ASC'],
  ] as Order

  checkDataFilter = async (data: []) => {
    return await Promise.all(
      data.map(
        async (item: []) =>
          await Promise.all(
            item.map(async value => {
              if (value['contract']) {
                const contract = (await ContractsRepos.findOne({
                  where: { contract: value['contract'] },
                })) as IContracts
                return { id_incContract: contract?.id }
              }
              if (value['client']) {
                const client = (await ClientsRepos.findOne({
                  where: { client: value['client'] },
                })) as IClients
                return { id_incClient: client?.id }
              }
              if (value['legalName']) {
                const legalName = (await ClientsRepos.findOne({
                  where: { legalName: value['legalName'] },
                })) as IClients
                return { id_incClient: legalName?.id }
              }
              if (value['object']) {
                const object = (await ObjectsRepos.findOne({
                  where: { object: value['object'] },
                })) as IObjects
                return { id_incObject: object?.id }
              }
              if (value['address']) {
                const address = (await AddressesRepos.findOne({
                  where: { address: value['address'] },
                })) as IAddresses
                this.IncludesAddress = address?.id
                return []
              }
              if (value['region']) {
                const region = (await RegionsRepos.findOne({
                  where: { region: value['region'] },
                })) as IRegions
                this.IncludesRegion = region?.id
                return []
              }
              if (value['userAccepted']) {
                const userAccepted = (await userRepos.findOne({
                  where: { shortName: value['userAccepted'] },
                })) as IUser
                return { id_incUser: userAccepted?.id }
              }
              if (value['sla']) {
                const sla = (await SLARepos.findOne({
                  where: { sla: value['sla'] },
                })) as ISLA
                return { id_incSLA: sla?.id }
              }
              if (value['equipment']) {
                const equipment = (await ClassifierEquipmentRepos.findOne({
                  where: { equipment: value['equipment'] },
                })) as IClassifierEquipment
                return { id_incEquipment: equipment?.id }
              }
              if (value['model']) {
                const model = (await ClassifierModelsRepos.findOne({
                  where: { model: value['model'] },
                })) as IClassifierModels
                return { id_incModel: model?.id }
              }
              if (value['executor']) {
                const executor = (await userRepos.findOne({
                  where: { shortName: value['executor'] },
                })) as IUser
                return { id_incExecutor: executor?.id }
              }
              if (value['responsible']) {
                const responsible = (await userRepos.findOne({
                  where: { shortName: value['responsible'] },
                })) as IUser
                return { id_incResponsible: responsible?.id }
              }

              return value
            }),
          ),
      ),
    )
  }
  getFilterOptions = async (data: []): Promise<WhereOptions> => {
    if (!data) {
      return [{ active: 'true' }]
    }
    const dataFilter = await this.checkDataFilter(data)
    const _dataFilter = dataFilter.filter(
      elem => elem.filter(item => !Array.isArray(item) || item.length).length,
    )

    return _dataFilter.map(item => {
      return { [Op.or]: item as WhereOptions }
    })
  }
  prepareStatusObj = async (data: IPrepareStatusObj, id: string) => {
    const currentDate = new Date()
    if (data.status === 'Зарегистрирован') {
      return {
        _data: {
          ...data,
          timeRegistration: currentDate,
        },
        currentDate,
      }
    }
    if (data.status === 'В работе') {
      const inc = (await IncidentRepos.findOne({
        where: { id: id },
      })) as IIncindent
      const { timeInWork } = inc
      const sla = new Date(data.timeSLA).getTime()
      const now = currentDate.getTime()
      const overdue = now > sla ? true : false
      return {
        _data: {
          ...data,
          timeInWork: timeInWork ?? currentDate,
          overdue,
        },
        currentDate,
      }
    }
    if (data.status === 'Ожидание ЗИП/оборудования') {
      const sla = new Date(data.timeSLA).getTime()
      const now = currentDate.getTime()
      const overdue = now > sla ? true : false
      return {
        _data: {
          ...data,
          overdue,
        },
        currentDate,
      }
    }
    if (data.status === 'Решён') {
      const sla = new Date(data.timeSLA).getTime()
      const now = currentDate.getTime()
      const overdue = now > sla ? true : false
      return {
        _data: {
          ...data,
          overdue,
          timeCloseCheck: currentDate,
        },
        currentDate,
      }
    }
    if (data.status === 'Зыкрыт') {
      checkForCloseINC()
    }
    return { _data: {}, currentDate }
  }
  newIncidentStatuses = async (_req: Request, res: Response) => {
    try {
      const incStatuses = (await IncidentStatusesRepos.findAll({
        where: { active: true },
        order: [['stateNumber', 'ASC']],
      })) as IIncindentStatuses[]
      const id = incStatuses.slice(-1)[0].id
      await IncidentStatusesRepos.update(id, {
        stateNumber: incStatuses.length + 1,
      })
      await IncidentStatusesRepos.create({ ..._req.body, active: true })
      const incStatusesFull = await IncidentStatusesRepos.findAll({
        where: { active: true },
        order: [['stateNumber', 'ASC']],
      })
      res.status(200).json(incStatusesFull)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  getAllIncidentStatuses = (_req: Request, res: Response) => {
    IncidentStatusesRepos.findAll({ order: [['stateNumber', 'ASC']] })
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getIncidentStatuses = (_req: Request, res: Response) => {
    IncidentStatusesRepos.findAll({
      where: { active: true },
      order: [['stateNumber', 'ASC']],
    })
      .then(incStatuses => {
        res.status(200).json(incStatuses)
      })
      .catch(err => res.status(500).json({ error: ['db error:', err] }))
  }
  deleteIncidentStatuses = async (_req: Request, res: Response) => {
    const { selectedINCStatuses } = _req.body
    try {
      await IncidentStatusesRepos.update(selectedINCStatuses, {
        active: false,
      })
      const incStatuses = await IncidentStatusesRepos.findAll({
        where: { active: true },
        order: [['stateNumber', 'ASC']],
      })
      res.status(200).json(incStatuses)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  fullDeleteIncidentStatuses = async (_req: Request, res: Response) => {
    const { selectedINCStatuses } = _req.body
    try {
      await IncidentStatusesRepos.destroy({
        where: { id: selectedINCStatuses },
      })
      const incStatuses = await IncidentStatusesRepos.findAll({
        order: [['stateNumber', 'ASC']],
      })
      res.status(200).json(incStatuses)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  pullIncidentStatusesFromArchive = async (_req: Request, res: Response) => {
    const { selectedINCStatuses } = _req.body
    try {
      await IncidentStatusesRepos.update(selectedINCStatuses, {
        active: true,
      })
      const incStatuses = await IncidentStatusesRepos.findAll({
        where: { active: true },
        order: [['stateNumber', 'ASC']],
      })
      res.status(200).json(incStatuses)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  changeIncidentStatuses = async (_req: Request, res: Response) => {
    const { statusINC, id } = _req.body
    try {
      await IncidentStatusesRepos.update(id, { statusINC })
      const incStatuses = await IncidentStatusesRepos.findAll({
        where: { active: true },
        order: [['stateNumber', 'ASC']],
      })
      res.status(200).json(incStatuses)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  changeStateIncidentStatuses = async (_req: Request, res: Response) => {
    try {
      const ids = _req.body.map((item: IIncindentStatuses) => item.id)
      await IncidentStatusesRepos.destroy({
        where: { id: ids },
      })
      await IncidentStatusesRepos.bulkCreate(_req.body)
      const incStatuses = await IncidentStatusesRepos.findAll({
        where: { active: true },
        order: [['stateNumber', 'ASC']],
      })
      res.status(200).json(incStatuses)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  newTypeOfWork = async (_req: Request, res: Response) => {
    try {
      await TypesOfWorkRepos.create({ ..._req.body, active: true })
      const typesOfWork = await TypesOfWorkRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(typesOfWork)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  getAllTypesOfWork = (_req: Request, res: Response) => {
    TypesOfWorkRepos.findAll({})
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getTypesOfWork = (_req: Request, res: Response) => {
    TypesOfWorkRepos.findAll({
      where: { active: true },
    })
      .then(typesOfWork => {
        res.status(200).json(typesOfWork)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }
  deleteTypesOfWork = async (_req: Request, res: Response) => {
    const { selectedTypesOfWork } = _req.body
    try {
      await TypesOfWorkRepos.update(selectedTypesOfWork, {
        active: false,
      })
      const typesOfWork = await TypesOfWorkRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(typesOfWork)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  fullDeleteTypesOfWork = async (_req: Request, res: Response) => {
    const { selectedTypesOfWork } = _req.body
    try {
      await TypesOfWorkRepos.destroy({
        where: { id: selectedTypesOfWork },
      })
      const typesOfWork = await TypesOfWorkRepos.findAll({})
      res.status(200).json(typesOfWork)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  pullTypesOfWorkFromArchive = async (_req: Request, res: Response) => {
    const { selectedTypesOfWork } = _req.body
    try {
      await TypesOfWorkRepos.update(selectedTypesOfWork, {
        active: true,
      })
      const typesOfWork = await TypesOfWorkRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(typesOfWork)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  changeTypesOfWork = async (_req: Request, res: Response) => {
    const { typeOfWork, id } = _req.body
    try {
      await TypesOfWorkRepos.update(id, { typeOfWork })
      const typesOfWork = await TypesOfWorkRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(typesOfWork)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  newTypeCompletedWork = async (_req: Request, res: Response) => {
    try {
      await TypesCompletedWorkRepos.create({ ..._req.body, active: true })
      const typesCompletedWork = await TypesCompletedWorkRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(typesCompletedWork)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  getAllTypesCompletedWork = (_req: Request, res: Response) => {
    TypesCompletedWorkRepos.findAll({})
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getTypesCompletedWork = (_req: Request, res: Response) => {
    TypesCompletedWorkRepos.findAll({
      where: { active: true },
    })
      .then(typesCompletedWork => {
        res.status(200).json(typesCompletedWork)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }
  deleteTypesCompletedWork = async (_req: Request, res: Response) => {
    const { selectedTypeCompletedWork } = _req.body
    try {
      await TypesCompletedWorkRepos.update(selectedTypeCompletedWork, {
        active: false,
      })
      const typesCompletedWork = await TypesCompletedWorkRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(typesCompletedWork)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  fullDeleteTypesCompletedWork = async (_req: Request, res: Response) => {
    const { selectedTypeCompletedWork } = _req.body
    try {
      await TypesCompletedWorkRepos.destroy({
        where: { id: selectedTypeCompletedWork },
      })
      const typesCompletedWork = await TypesCompletedWorkRepos.findAll({})
      res.status(200).json(typesCompletedWork)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  pullTypesCompletedWorkFromArchive = async (_req: Request, res: Response) => {
    const { selectedTypeCompletedWork } = _req.body
    try {
      await TypesCompletedWorkRepos.update(selectedTypeCompletedWork, {
        active: true,
      })
      const typesCompletedWork = await TypesCompletedWorkRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(typesCompletedWork)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  changeTypesCompletedWork = async (_req: Request, res: Response) => {
    const { typeCompletedWork, id } = _req.body
    try {
      await TypesCompletedWorkRepos.update(id, { typeCompletedWork })
      const typesCompletedWork = await TypesCompletedWorkRepos.findAll({
        where: { active: true },
      })
      res.status(200).json(typesCompletedWork)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  newINCfromMail = async ({
    client,
    contract,
    clientINC,
    object,
    comment,
    applicant,
    applicantContacts,
  }: INewINCFromMail) => {
    const numberINC = AppConst.numberINC
    const incident = AppConst.incident
    const timeRegistration = new Date()

    const clientID = (await ClientsRepos.findOne({
      where: { client },
    })) as IClients

    const contractID = (await ContractsRepos.findOne({
      where: { contract, id_client: clientID.id },
      include: [
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
      ],
    })) as IContractsSLA

    const sla = contractID.SLAs.find(item => item.sla.includes('Mail')) as ISLA
    const objectID = (await ObjectsRepos.findOne({
      where: { internalClientID: object, id_client: clientID.id },
    })) as IObjects

    const status = (await IncidentStatusesRepos.findOne({
      where: { stateNumber: 1 },
    })) as IIncindentStatuses

    const rolesGroup = (await roleGroupRepos.findOne({
      where: { groupName: 'SUPERADMIN' },
    })) as IRolesGroup

    const userAdmin = (await userRepos.findOne({
      where: { id_rolesGroup: rolesGroup.id },
    })) as IUser

    const newINCdb = await IncidentRepos.create({
      numberINC,
      incident,
      clientINC,
      timeSLA: new Date(timeRegistration.getTime() * 30 * 60 * 1000),
      timeRegistration,
      description: comment,
      methodsReuqest: 'email',
      active: true,
      id_incClient: clientID.id,
      id_incStatus: status.id,
      id_incUser: userAdmin.id,
      id_typeOfWork: sla.id_typeOfWork,
      id_incSLA: sla.id,
      id_incContract: contractID.id,
      id_incObject: objectID.id,
      id_executor: '',
      id_responsible: '',
      id_closingCheck: '',
      id_closing: '',
      status: status?.statusINC,
      applicant,
      applicantContacts,
    })

    await IncidentLogsRepos.create({
      id_incLog: newINCdb.id,
      time: timeRegistration,
      log: `${AppConst.ActionComment.incidentRegistration}${incident}`,
      id_incLogUser: userAdmin.id,
    })

    getNewINC(numberINC)

    const inc = (await IncidentRepos.findOne({
      where: { id: newINCdb.id },
      include: this.includes,
      order: this.orderINC,
    })) as IIncindent

    return inc
  }
  newINC = async (_req: Request, res: Response) => {
    const {
      id_incStatus,
      clientINC,
      slaDiff,
      description,
      comment,
      methodsReuqest,
      parentalIncident,
      relatedIncident,
      applicant,
      applicantContacts,
      clientID,
      typeOfWorkID,
      SLAID,
      contractID,
      objectID,
      responsibleID,
      equipmentId,
      modelId,
      typicalMalfunctionID,
      nameSort,
      direction,
      limit,
      page,
      filterOptions,
      timeInterval,
    } = _req.body
    try {
      const numberINC = AppConst.numberINC
      const incident = AppConst.incident
      const timeRegistration = new Date()
      const timeSLA = new Date(new Date().getTime() + slaDiff)
      const timeZone = AppConst.timeGMT * 60 * 60 * 1000
      const timeRegistrationForEmail = new Date(new Date().getTime() + timeZone)
      const timeSLAForEmail = new Date(
        new Date().getTime() + slaDiff + timeZone,
      )

      const status = (await IncidentStatusesRepos.findOne({
        where: { id: id_incStatus },
      })) as IIncindentStatuses

      const newINCdb = await IncidentRepos.create({
        numberINC,
        incident,
        clientINC,
        timeSLA,
        timeRegistration,
        description,
        comment,
        methodsReuqest,
        parentalIncident,
        relatedIncident,
        applicant,
        applicantContacts,
        active: true,
        id_incClient: clientID,
        id_incStatus,
        id_typeOfWork: typeOfWorkID,
        id_incSLA: SLAID,
        id_incContract: contractID,
        id_incObject: objectID,
        id_incUser: responsibleID,
        id_incEquipment: equipmentId,
        id_incModel: modelId,
        id_incTypicalMalfunction: typicalMalfunctionID,
        id_executor: '',
        id_responsible: '',
        id_closingCheck: '',
        id_closing: '',
        status: status?.statusINC,
      })

      getNewINC(numberINC)

      await IncidentLogsRepos.create({
        id_incLog: newINCdb.id,
        time: timeRegistration,
        log: `${AppConst.ActionComment.incidentRegistration}${incident}`,
        id_incLogUser: responsibleID,
      })

      const inc = (await IncidentRepos.findOne({
        where: { id: newINCdb.id },
        include: this.includes,
        order: this.orderINC,
      })) as IIncindent

      const isStatusses = inc?.Contract.IncindentStatuses.map(
        (item: IIncindentStatuses) =>
          item.statusINC === inc?.IncindentStatus.statusINC,
      ).filter((item: boolean) => item)

      if (isStatusses && isStatusses.length) {
        await mailerRegInc({
          mailTo: inc?.Contract.notificationEmail ?? '',
          incident,
          status: inc?.IncindentStatus.statusINC ?? '',
          clientINC,
          timeRegistration: convertDateToString(timeRegistrationForEmail) ?? '',
          timeSLA: convertDateToString(timeSLAForEmail) ?? '',
          client: inc?.Client?.client ?? '',
          legalName: inc?.Client?.legalName ?? '',
          object: inc?.Object?.object ?? '',
          objectClientID: inc?.Object?.internalClientID ?? '',
          objectClientName: inc?.Object?.internalClientName ?? '',
          address: inc?.Object?.Address?.address as string,
          equipment: inc?.ClassifierEquipment?.equipment as string,
          model: inc?.ClassifierModel?.model as string,
          malfunction: inc?.TypicalMalfunction?.typicalMalfunction as string,
          description: description ?? '',
          applicant: applicant ?? '',
          applicantContacts: applicantContacts ?? '',
          userAccepted: inc?.User?.shortName ?? '',
        })
      }

      if (timeInterval) {
        const currentDate = new Date()
        const endDate = currentDate.setDate(
          currentDate.getDate() - timeInterval,
        )
        const _endDate = new Date(endDate)
        const incs = await IncidentRepos.findAll({
          where: { createdAt: { [Op.gt]: _endDate } },
          include: this.Includes,
          order: this.orderINC,
        })
        const count = await IncidentRepos.count({
          where: { createdAt: { [Op.gt]: _endDate } },
        })
        res.status(200).json({ incs, count })
        return
      }

      if (typeof timeInterval === 'number' && timeInterval === 0) {
        const incs = await IncidentRepos.findAll({
          where: { active: true },
          include: this.includes,
          order: this.orderINC,
        })
        const count = incs.length
        res.status(200).json({ incs, count })
        return
      }

      const offset = Number(page * limit) ?? 1
      const order = getOrderINC(nameSort, direction)
      const filterData = await this.getFilterOptions(filterOptions as [])

      const incs = await IncidentRepos.findAll({
        where: { [Op.and]: filterData },
        order,
        limit: Number(limit),
        offset,
        include: this.includes,
      })
      const count = await IncidentRepos.count({
        where: { [Op.and]: filterData },
      })
      const filterListData = await this.getFilterListFunc()
      res.status(200).json({ incs, count, filterListData })
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  getAllINC = (_req: Request, res: Response) => {
    IncidentRepos.findAll({ include: this.includes, order: this.orderINC })
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error: ', err.status] }))
  }
  getINC = async (_req: Request, res: Response) => {
    try {
      const incs = await IncidentRepos.findAll({
        where: { active: true },
        include: this.includes,
        order: this.orderINC,
      })
      const count = incs.length
      res.status(200).json({ incs, count })
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  getFilter = async (_req: Request, res: Response) => {
    try {
      const filterListData = await this.getFilterListFunc()
      res.status(200).json(filterListData)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  getFilterListFunc = async () => {
    const incs = (await IncidentRepos.findAll({
      where: { active: true },
      include: this.includes,
      order: this.orderINC,
    })) as IIncindent[]
    const statusList = [
      ...new Set(incs.map(item => item.IncindentStatus.statusINC)),
    ]
    const contractList = [...new Set(incs.map(item => item.Contract.contract))]
    const clientsList = [...new Set(incs.map(item => item.Client.client))]
    const legalNameList = [...new Set(incs.map(item => item.Client.legalName))]
    const objectsList = [...new Set(incs.map(item => item.Object.object))]
    const addressList = [
      ...new Set(incs.map(item => item.Object.Address.address)),
    ]
    const regionList = [...new Set(incs.map(item => item.Object.Region.region))]
    const userAcceptedList = [...new Set(incs.map(item => item.User.shortName))]
    const equipmentList = [
      ...new Set(
        incs
          .map(item =>
            item.ClassifierEquipment ? item.ClassifierEquipment.equipment : '',
          )
          .filter(item => item.length > 0),
      ),
    ]
    const modelList = [
      ...new Set(
        incs
          .map(item => (item.ClassifierModel ? item.ClassifierModel.model : ''))
          .filter(item => item.length > 0),
      ),
    ]
    const executorList = [
      ...new Set(
        incs.map(item =>
          item.UserExecutor ? item.UserExecutor.shortName : '',
        ),
      ),
    ]
    const responsibleList = [
      ...new Set(
        incs.map(item =>
          item.UserResponsible ? item.UserResponsible.shortName : '',
        ),
      ),
    ]
    const overdueList = [...new Set(incs.map(item => item.overdue))]
    const slaList = [...new Set(incs.map(item => item.SLA.sla))]

    return {
      status: statusList,
      legalName: legalNameList,
      client: clientsList,
      contract: contractList,
      object: objectsList,
      address: addressList,
      region: regionList,
      userAccepted: userAcceptedList,
      equipment: equipmentList,
      model: modelList,
      executor: executorList,
      responsible: responsibleList,
      overdue: overdueList,
      sla: slaList,
    }
  }
  getINCs = async (_req: Request, res: Response) => {
    try {
      const counts = await IncidentRepos.count({})
      const filterListData = await this.getFilterListFunc()
      if (counts === 0) {
        res.status(200).json({ incs: [], count: counts, filterListData })
        return
      }
      const { limit, nameSort, direction, page, filterOptions } = _req.query
      const offsetPL = Number(page) * Number(limit)
      const offset = offsetPL ?? 1
      const filterData = await this.getFilterOptions(filterOptions as [])
      const order = getOrderINC(nameSort as string, direction as string)

      const incs = await IncidentRepos.findAll({
        where: { [Op.and]: filterData },
        // include: { all: true, nested: true },
        // include: { all: true },
        include: this.Includes,
        order,
        limit: Number(limit),
        offset,
      })
      this.ResetIncludesAddress
      const count = await IncidentRepos.count({
        where: { [Op.and]: filterData },
      })
      res.status(200).json({ incs, count, filterListData })
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  getINCsByDate = async (_req: Request, res: Response) => {
    try {
      const { endDate } = _req.query
      const incs = (await IncidentRepos.findAll({
        where: { createdAt: { [Op.gt]: endDate } },
        include: this.Includes,
        order: this.orderINC,
      })) as Incindent[]
      res.status(200).json({ incs, count: incs.length })
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  deleteINC = async (_req: Request, res: Response) => {
    const { selectedINCs } = _req.body
    try {
      await IncidentRepos.update(selectedINCs, {
        active: false,
      })
      const incs = await IncidentRepos.findAll({
        where: { active: true },
        include: this.includes,
        order: this.orderINC,
      })
      res.status(200).json(incs)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  fullDeleteINC = async (_req: Request, res: Response) => {
    const { selectedINCs } = _req.body
    try {
      await IncidentRepos.destroy({
        where: { id: selectedINCs },
      })
      const incs = await IncidentRepos.findAll({
        include: this.includes,
        order: this.orderINC,
      })
      res.status(200).json(incs)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  pullINCFromArchive = async (_req: Request, res: Response) => {
    const { selectedINCs } = _req.body
    try {
      await IncidentRepos.update(selectedINCs, {
        active: true,
      })
      const incs = await IncidentRepos.findAll({
        where: { active: true },
        include: this.includes,
        order: this.orderINC,
      })
      res.status(200).json(incs)
    } catch (err) {
      res.status(500).json({ error: ['db error = ', err as Error] })
    }
  }
  changeINC = async (_req: Request, res: Response) => {
    const { editINC, logs, endDate } = _req.body
    const { id, ...data } = editINC
    try {
      const isUpdate = await IncidentRepos.update(id, { ...data })
      if (isUpdate[0] <= 0) {
        return res.status(403).json({
          message:
            'Ошибка с изменением инцидента! Попробуйте перезагрузить страницу и заново внести изменения. Или обратитесь к администратору.',
        })
      }
      if (logs.length > 0) {
        const log = { ...logs, time: new Date() }
        await IncidentLogsRepos.bulkCreate(log)
      }
      const incs = await IncidentRepos.findAll({
        where: { createdAt: { [Op.gt]: endDate } },
        include: this.Includes,
        order: this.orderINC,
      })

      res.status(200).json({ incs })
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  changeINCAddFiles = async (_req: Request, res: Response) => {
    const { logs, endDate } = _req.body
    try {
      if (logs.length > 0) {
        const log = { ...logs, time: new Date() }
        await IncidentLogsRepos.bulkCreate(log)
      }
      if (endDate === 0) {
        const incs = await IncidentRepos.findAll({
          where: { active: true },
          include: this.includes,
          order: this.orderINC,
        })
        const count = incs.length
        res.status(200).json({ incs, count })
      }
      const incs = await IncidentRepos.findAll({
        where: { createdAt: { [Op.gt]: endDate } },
        include: this.Includes,
        order: this.orderINC,
      })

      res.status(200).json({ incs, count: incs.length })
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  changeExecutor = async (_req: Request, res: Response) => {
    const { id, id_incExecutor, incident, executor, userID } = _req.body
    try {
      const isUpdate = await IncidentRepos.update(id, {
        id_incExecutor: id_incExecutor.length ? id_incExecutor : null,
        executor,
      })
      if (isUpdate[0] <= 0) {
        return res.status(403).json({
          message:
            'Ошибка с назначением исполнителя! Попробуйте назначить исполнителя заново или обратитесь к администратору.',
        })
      }
      await IncidentLogsRepos.create({
        id_incLog: id,
        time: new Date(),
        log: `${AppConst.ActionComment.changeExecutor.first}${incident}${AppConst.ActionComment.changeExecutor.second}${executor}`,
        id_incLogUser: userID,
      })

      res.status(200).json()
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  changeResponsible = async (_req: Request, res: Response) => {
    const { id, id_incResponsible, incident, responsible, userID } = _req.body
    try {
      const isUpdate = await IncidentRepos.update(id, {
        id_incResponsible: id_incResponsible.length ? id_incResponsible : null,
        responsible,
      })
      if (isUpdate[0] <= 0) {
        return res.status(403).json({
          message:
            'Ошибка с назначением ответственного! Попробуйте назначить ответственного заново или обратитесь к администратору.',
        })
      }
      await IncidentLogsRepos.create({
        id_incLog: id,
        time: new Date(),
        log: `${AppConst.ActionComment.changeResponsible.first}${incident}${AppConst.ActionComment.changeResponsible.second}${responsible}`,
        id_incLogUser: userID,
      })
      res.status(200).json()
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  changeStatus = async (_req: Request, res: Response) => {
    const { id, log, ...data } = _req.body
    try {
      const obj = await this.prepareStatusObj(data, id)
      const isUpdate = await IncidentRepos.update(id, obj._data)
      if (isUpdate && isUpdate[0] <= 0) {
        return res.status(403).json({
          message:
            'Ошибка с изменением статуса! Попробуйте изменить статус заново или обратитесь к администратору.',
        })
      }
      const _log = log.log
      const logs = { ..._log, time: new Date() }

      await IncidentLogsRepos.create(logs)
      const inc = (await IncidentRepos.findOne({
        where: { id },
        include: this.includes,
        order: this.orderINC,
      })) as IIncindent

      const isStatusses = inc.Contract.IncindentStatuses.filter(
        (item: IIncindentStatuses) => item.id === data.id_incStatus,
      ).filter((item: IIncindentStatuses) => item)
      const timeZone = AppConst.timeGMT * 60 * 60 * 1000
      const timeChangeStatus = new Date(new Date().getTime() + timeZone)
      const timeSLA = new Date(Date.parse(inc.timeSLA) + timeZone)
      if (isStatusses && isStatusses.length) {
        await mailerChangeStatus({
          mailTo: inc.Contract.notificationEmail ?? '',
          incident: inc.incident,
          status: data.status,
          clientINC: inc.clientINC,
          timeChangeStatus: convertDateToString(timeChangeStatus) ?? '',
          timeSLA: convertDateToString(timeSLA) ?? '',
          client: inc.Client.client ?? '',
          legalName: inc.Client.legalName ?? '',
          object: inc.Object.object ?? '',
          objectClientID: inc.Object.internalClientID ?? '',
          objectClientName: inc.Object.internalClientName ?? '',
          address: inc.Object.Address.address as string,
          equipment: inc.ClassifierEquipment.equipment as string,
          model: inc.ClassifierModel.model as string,
          malfunction: inc.TypicalMalfunction.typicalMalfunction as string,
          description: inc.description ?? '',
          commentCloseCheck: data.commentCloseCheck ?? inc.commentCloseCheck,
          typeCompletedWork:
            data.typeCompletedWork && data.typeCompletedWork.label
              ? data.typeCompletedWork.label
              : inc.typeCompletedWork,
        })
      }

      // checkTemplate
      checkTemplateFromSD({
        newStatus: data.status,
        client: inc.Client.client,
        contract: inc.Contract.contract,
        clientINC: inc.clientINC,
        commentCloseCheck: `${data.typeCompletedWork ? data.typeCompletedWork.label : ''}. ${inc.commentCloseCheck}`,
      })

      res.status(200).json()
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  changeUserClosingCheck = async (_req: Request, res: Response) => {
    const { id, id_incClosingCheck } = _req.body
    try {
      await IncidentRepos.update(id, { id_incClosingCheck })
      const incs = await IncidentRepos.findAll({
        where: { active: true },
        // include: { all: true },
        include: this.includes,
        order: this.orderINC,
      })
      res.status(200).json(incs)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  changeUserClosing = async (_req: Request, res: Response) => {
    const { id, id_incClosing } = _req.body
    try {
      await IncidentRepos.update(id, { id_incClosing })
      const incs = await IncidentRepos.findAll({
        where: { active: true },
        // include: { all: true },
        include: this.includes,
        order: this.orderINC,
      })
      res.status(200).json(incs)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  changeComment = async (_req: Request, res: Response) => {
    const { id, comment } = _req.body
    try {
      await IncidentRepos.update(id, { comment })
      await IncidentRepos.findAll({
        where: { active: true },
        // include: { all: true },
        include: this.includes,
        order: this.orderINC,
      })
      res.status(200).json({ id, comment })
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  getTimeSLAs = async (_req: Request, res: Response) => {
    try {
      const incs = (await IncidentRepos.findAll({
        where: { active: true },
        include: this.includes,
        order: this.orderINC,
      })) as IIncindent[]
      const timeSLA = incs.map(item => {
        return { id: item.id, timeSLA: item.timeSLA }
      })
      res.status(200).json(timeSLA)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  changeTimeSLAs = async (_req: Request, res: Response) => {
    try {
      const { data } = _req.body as ITimeSLA
      data.map(async ({ id, timeSLA }) => {
        await IncidentRepos.update(id, { timeSLA })
      })
      const incs = await IncidentRepos.findAll({
        where: { active: true },
        include: this.includes,
        order: this.orderINC,
      })
      res.status(200).json(incs)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }

  getAllINCLogs = (_req: Request, res: Response) => {
    IncidentLogsRepos.findAll({
      include: this.incLogs,
      order: [['time', 'desc']] as Order,
    })
      .then(item => res.status(200).json(item))
      .catch(err => res.status(500).json({ error: ['db error', err.status] }))
  }
  getINCLogs = (_req: Request, res: Response) => {
    IncidentLogsRepos.findAll({
      where: { active: true },
      order: [['time', 'desc']] as Order,
      include: this.incLogs,
    })
      .then(logs => {
        res.status(200).json(logs)
      })
      .catch(err => res.status(500).json({ error: ['db error', err] }))
  }
  checkForCloseINC = async (_req: Request, res: Response) => {
    try {
      console.log('checkForCloseINC')
      const result = await checkForCloseINC()
      res.status(200).json({ result })
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
}

import {
  Addresses,
  ClassifierEquipment,
  ClassifierModels,
  Clients,
  Contracts,
  Files,
  IncidentLogs,
  IncidentLogsRepos,
  IncidentRepos,
  IncidentStatusesRepos,
  IncindentStatuses,
  Objects,
  Regions,
  SLA,
  TypesCompletedWork,
  TypesOfWork,
  TypicalMalfunctions,
  Users,
} from './../db'
import { Op, Order, WhereOptions } from 'sequelize'
import {
  IIncidentLogs,
  IIncindent,
  IIncindentStatuses,
} from '/models/incidents'
import type { Request, Response } from 'express'
const socket = require('../utils/socket')

export class engineerService {
  get Includes() {
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
      attributes: ['id', 'time', 'log', 'isSystem'],
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

  prepareWhere = async (
    endDate: string,
    id: string,
    /* eslint-disable @typescript-eslint/no-explicit-any */
  ): Promise<WhereOptions<any> | undefined> => {
    /* eslint-enable @typescript-eslint/no-explicit-any */
    const statusInWork = (await IncidentStatusesRepos.findOne({
      where: { statusINC: 'В работе' },
    })) as IIncindentStatuses
    const statusDone = (await IncidentStatusesRepos.findOne({
      where: { statusINC: 'Выполнено' },
    })) as IIncindentStatuses
    const statusResolved = (await IncidentStatusesRepos.findOne({
      where: { statusINC: 'Решён' },
    })) as IIncindentStatuses
    const statusClose = (await IncidentStatusesRepos.findOne({
      where: { statusINC: 'Закрыт' },
    })) as IIncindentStatuses

    return Number(endDate) === 0
      ? {
          active: true,
          id_incExecutor: id,
          id_incStatus: {
            [Op.or]: [
              statusInWork.id,
              statusDone.id,
              statusResolved.id,
              statusClose.id,
            ],
          },
        }
      : {
          active: true,
          createdAt: { [Op.gt]: endDate },
          id_incExecutor: id,
          id_incStatus: {
            [Op.or]: [
              statusInWork.id,
              statusDone.id,
              statusResolved.id,
              statusClose.id,
            ],
          },
        }
  }
  getINCsByFieldEngineer = async (_req: Request, res: Response) => {
    const { id } = _req.query
    const { endDate } = _req.query
    try {
      const whereOptions = await this.prepareWhere(
        endDate as string,
        id as string,
      )
      const incs = await IncidentRepos.findAll({
        where: whereOptions,
        include: this.includes,
        order: this.orderINC,
      })
      const count = incs.length
      res.status(200).json({ incs, count })
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  getINCbyID = async (_req: Request, res: Response) => {
    const { id } = _req.query
    try {
      const inc = await IncidentRepos.findOne({
        where: { id },
        include: this.includes,
        order: this.orderINC,
      })
      res.status(200).json(inc)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  changeINCAddEngineerFiles = async (_req: Request, res: Response) => {
    const { logs, endDate, id, userId } = _req.body
    try {
      if (logs.length > 0) {
        const log = (logs as IIncidentLogs[]).map(item => {
          return { ...item, time: new Date() }
        })
        await IncidentLogsRepos.bulkCreate(log)
      }
      const whereOptions = await this.prepareWhere(
        endDate as string,
        userId as string,
      )
      const incs = await IncidentRepos.findAll({
        where: whereOptions,
        include: this.includes,
        order: this.orderINC,
      })
      const count = incs.length
      const socketINC = (await IncidentRepos.findOne({
        where: { id },
        include: this.includes,
        order: this.orderINC,
      })) as IIncindent
      const token = _req.header('Authorization')?.replace('Bearer ', '')
      socket.getIO().emit('server_SBI', {
        token,
        category: 'incidents',
        action: 'changeINCAddFiles',
        data: socketINC,
      })

      res.status(200).json({ incs, count })
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  changeStatusDone = async (_req: Request, res: Response) => {
    const { id, log, ...data } = _req.body
    try {
      const currentDate = new Date()
      const statusDone = (await IncidentStatusesRepos.findOne({
        where: { statusINC: 'Выполнено' },
      })) as IIncindentStatuses

      const obj = {
        _data: {
          ...data,
          timeDone: currentDate,
          id_incStatus: statusDone.id,
          status: statusDone.statusINC,
        },
        currentDate,
      }
      const isUpdate = await IncidentRepos.update(id, obj._data)
      if (isUpdate && isUpdate[0] <= 0) {
        return res.status(403).json({
          message:
            'Ошибка с изменением статуса! Попробуйте изменить статус заново или обратитесь к администратору.',
        })
      }
      const _log = log.log
      const logs = { ..._log, time: new Date() }

      const token = _req.header('Authorization')?.replace('Bearer ', '')
      socket.getIO().emit('server_SBI', {
        token,
        category: 'incidents',
        action: 'changeStatus',
        data: {
          id,
          ...obj._data,
          log,
        },
      })

      await IncidentLogsRepos.create(logs)
      res.status(200).json()
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
}

import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'

export interface ISLA {
  id: string
  sla: string
  days: number
  time: string
  timeStart: string
  timeEnd: string
  active: boolean
}

export interface SLA {
  id: string
  sla: string
  days: number
  time: string
  timeStart: string
  timeEnd: string
  active: boolean
}

export const sla: ModelAttributes<Model, SLA> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  sla: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  days: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  time: {
    type: DataType.TIME,
    allowNull: false,
  },
  timeStart: {
    type: DataType.TIME,
    allowNull: false,
  },
  timeEnd: {
    type: DataType.TIME,
    allowNull: false,
  },
  active: {
    type: DataType.BOOLEAN,
    allowNull: false,
  },
}

export interface IOLA {
  id: string
  ola: string
  days: number
  time: string
  timeStart: string
  timeEnd: string
  active: boolean
}
export interface OLA {
  id: string
  ola: string
  days: number
  time: string
  timeStart: string
  timeEnd: string
  active: boolean
}

export const ola: ModelAttributes<Model, OLA> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  ola: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  days: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  time: {
    type: DataType.STRING,
    allowNull: false,
  },
  timeStart: {
    type: DataType.TIME,
    allowNull: false,
  },
  timeEnd: {
    type: DataType.TIME,
    allowNull: false,
  },
  active: {
    type: DataType.BOOLEAN,
    allowNull: false,
  },
}

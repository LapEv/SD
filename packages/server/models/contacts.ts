import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'

export interface Contacts {
  id: number
  lastName: string
  firstName: string
  middleName: string
  post: string
  phone: string
  email: string
  comment: string
  active: boolean
}

export interface IClientContact {
  id: string
  id_client: string
  firstName: string
  lastName: string
  middleName: string
  email: string
  post: string
  phone: string
  comment: string
}

export const contacts: ModelAttributes<Model, Contacts> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  lastName: {
    type: DataType.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataType.STRING,
    allowNull: false,
  },
  middleName: {
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '',
  },
  post: {
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '',
  },
  phone: {
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '',
  },
  email: {
    type: DataType.STRING,
    allowNull: true,
    unique: true,
    defaultValue: '',
  },
  comment: {
    type: DataType.STRING(1024),
    allowNull: true,
    defaultValue: '',
  },
  active: {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}

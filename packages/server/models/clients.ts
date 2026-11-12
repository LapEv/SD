import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'
import { IClientContact } from './contacts'

export interface FilesData {
  id: string
  name: string
  size: string
  mimetype: string
  path: string
  src?: string
}

export interface IClients {
  id: string
  legalName: string
  client: string
  office: string
  officePhone: string
  comments: string
  active: boolean
  login: string
  password: string
  Contacts?: IClientContact
  Files?: FilesData[]
}

export interface Clients {
  id: string
  legalName: string
  client: string
  office: string
  officePhone: string
  comments: string
  active: boolean
  login: string
  password: string
}

export const clients: ModelAttributes<Model, Clients> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  legalName: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  client: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  office: {
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '',
  },
  officePhone: {
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '',
  },
  comments: {
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '',
  },
  active: {
    type: DataType.BOOLEAN,
    allowNull: false,
  },
  login: {
    type: DataType.STRING,
    allowNull: true,
    unique: true,
    defaultValue: '',
  },
  password: {
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '',
  },
}

export interface ClientsGroup {
  id: string
  groupName: string
  clients: string[]
  active: boolean
}

export const clientsGroup: ModelAttributes<Model, ClientsGroup> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  groupName: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  clients: {
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  },
  active: {
    type: DataType.BOOLEAN,
    allowNull: false,
  },
}

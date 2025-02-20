import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'

export interface IClients {
  id: number
  legalName: string
  client: string
  office: string
  contacts: string[]
  comments: string
  active: boolean
}

export interface Clients {
  id: number
  legalName: string
  client: string
  office: string
  contacts: string[]
  comments: string
  active: boolean
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
  },
  contacts: {
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
  },
  comments: {
    type: DataType.STRING,
    allowNull: true,
  },
  active: {
    type: DataType.BOOLEAN,
    allowNull: false,
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

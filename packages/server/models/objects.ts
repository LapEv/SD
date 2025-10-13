import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'
import { IAddresses, IRegions } from './adresses'

export interface IObjects {
  id: string
  object: string
  internalClientID: string
  internalClientName: string
  active: boolean
  Address: IAddresses
  Region: IRegions
}

export interface Objects {
  id: string
  object: string
  internalClientID: string
  internalClientName: string
  active: boolean
}

export const objects: ModelAttributes<Model, Objects> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  object: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  internalClientID: {
    type: DataType.STRING,
    allowNull: true,
  },
  internalClientName: {
    type: DataType.STRING,
    allowNull: true,
  },
  active: {
    type: DataType.BOOLEAN,
    allowNull: false,
  },
}

import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'

export interface IAddresses {
  id: string
  address: string
  coordinates: string
  active: boolean
}

export interface Addresses {
  id: string
  address: string
  coordinates: string
  active: boolean
}

export const addresses: ModelAttributes<Model, Addresses> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  address: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  coordinates: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  active: {
    type: DataType.BOOLEAN,
    allowNull: false,
  },
}

export interface IRegions {
  id: string
  region: string
  active: boolean
}

export interface Regions {
  id: string
  region: string
  active: boolean
}

export const regions: ModelAttributes<Model, Regions> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  region: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  active: {
    type: DataType.BOOLEAN,
    allowNull: false,
  },
}

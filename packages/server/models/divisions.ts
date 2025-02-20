import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'

export interface IDivision {
  id: string
  division: string
  divisionName: string
  active: boolean
}

export interface Division {
  id: string
  division: string
  divisionName: string
  active: boolean
}

export const division: ModelAttributes<Model, Division> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  division: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  divisionName: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  active: {
    type: DataType.BOOLEAN,
    allowNull: false,
  },
}

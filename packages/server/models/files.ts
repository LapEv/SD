import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'

export interface FILES {
  id: string
  name: string
  size: number
  mimetype: string
  path: string
}

export const files: ModelAttributes<Model, FILES> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataType.STRING,
    allowNull: false,
  },
  size: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  mimetype: {
    type: DataType.STRING,
    allowNull: false,
  },
  path: {
    type: DataType.STRING,
    allowNull: false,
  },
}

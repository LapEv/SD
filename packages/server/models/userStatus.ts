import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'

export interface Usercategory {
  id: number
  category: string
  categoryName: string
}

export const userStatus: ModelAttributes<Model, Usercategory> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  category: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  categoryName: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
}

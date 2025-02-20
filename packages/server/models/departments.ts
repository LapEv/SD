import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'

export interface IDepartment {
  id: string
  department: string
  departmentName: string
  division: string
  id_division: string
  active: boolean
}

export interface Department {
  id: string
  department: string
  departmentName: string
  division: string
  id_division: string
  active: boolean
}

export const department: ModelAttributes<Model, Department> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  department: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  departmentName: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  division: {
    type: DataType.STRING,
    allowNull: false,
  },
  id_division: {
    type: DataType.STRING,
    allowNull: false,
  },
  active: {
    type: DataType.BOOLEAN,
    allowNull: false,
  },
}

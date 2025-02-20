import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'
import { RolesGroup } from './roles'

export interface IUser {
  id: string
  username: string
  password: string
  firstName: string
  lastName: string
  middleName: string
  shortName: string
  email: string
  phone?: string
  post?: string
  avatar?: string
  active: boolean
  theme: string
  chiefDivision: boolean
  chiefDepartment: boolean
  id_division: string
  id_department: string
  id_rolesGroup: string
  status: string
  reasonOfDelete: string
  RolesGroup: RolesGroup
  appOptions: object
}

export interface User {
  id: number
  username: string
  password: string
  firstName: string
  lastName: string
  middleName: string
  shortName: string
  email: string
  phone?: string
  post?: string
  avatar?: string
  active: boolean
  theme: string
  chiefDivision: boolean
  chiefDepartment: boolean
  id_division: string
  id_department: string
  id_rolesGroup: string
  id_avatarFiles: string
  status: string
  reasonOfDelete: string
  appOptions: object
}

export const users: ModelAttributes<Model, User> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  firstName: {
    type: DataType.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataType.STRING,
    allowNull: false,
  },
  middleName: {
    type: DataType.STRING,
    allowNull: false,
  },
  shortName: {
    type: DataType.STRING,
    allowNull: false,
  },
  email: {
    type: DataType.STRING,
    allowNull: false,
  },
  phone: {
    type: DataType.STRING,
    allowNull: false,
  },
  password: {
    type: DataType.STRING,
    allowNull: false,
  },
  post: {
    type: DataType.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataType.STRING,
    allowNull: true,
  },
  active: {
    type: DataType.BOOLEAN,
    allowNull: true,
  },
  theme: {
    type: DataType.STRING,
    allowNull: false,
  },
  chiefDivision: {
    type: DataType.BOOLEAN,
    allowNull: true,
  },
  id_division: {
    type: DataType.STRING,
    allowNull: false,
  },
  chiefDepartment: {
    type: DataType.BOOLEAN,
    allowNull: true,
  },
  id_department: {
    type: DataType.STRING,
    allowNull: false,
  },
  id_rolesGroup: {
    type: DataType.STRING,
    allowNull: false,
  },
  id_avatarFiles: {
    type: DataType.STRING,
    allowNull: true,
  },
  status: {
    type: DataType.STRING,
    allowNull: false,
  },
  reasonOfDelete: {
    type: DataType.STRING,
    allowNull: true,
  },
  appOptions: {
    type: DataType.JSONB,
    allowNull: true,
  },
}

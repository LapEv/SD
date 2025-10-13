import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'

export interface IRolesGroup {
  id: string
  group: string
  groupName: string
  active: boolean
  Roles: IRoles[]
}

export interface RolesGroup {
  id: string
  group: string
  groupName: string
  active: boolean
}

export const rolesGroup: ModelAttributes<Model, RolesGroup> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  group: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  groupName: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  active: {
    type: DataType.BOOLEAN,
    allowNull: false,
  },
}

export interface IRoles {
  id: string
  role: string
  nameRole: string
  active: boolean
}

export const roles: ModelAttributes<Model, IRoles> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  role: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  nameRole: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  active: {
    type: DataType.BOOLEAN,
    allowNull: false,
  },
}

export interface IThroughModelRolesGroup {
  id: string
  id_roles: string
  id_rolesGroup: string
}

export const throughModelRolesGroup: ModelAttributes<
  Model,
  IThroughModelRolesGroup
> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  id_roles: {
    type: DataType.STRING,
    allowNull: false,
  },
  id_rolesGroup: {
    type: DataType.STRING,
    allowNull: false,
  },
}

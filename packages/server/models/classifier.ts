import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'

export interface IClassifierEquipment {
  id: string
  equipment: string
  active: boolean
}

export interface ClassifierEquipment {
  id: string
  equipment: string
  active: boolean
}

export const classifierEquipment: ModelAttributes<Model, ClassifierEquipment> =
  {
    id: {
      type: DataType.STRING,
      defaultValue: DataType.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    equipment: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    },
    active: {
      type: DataType.BOOLEAN,
      allowNull: false,
    },
  }

export interface IClassifierModels {
  id: string
  model: string
  active: boolean
}

export interface ClassifierModels {
  id: string
  model: string
  active: boolean
}

export const classifierModels: ModelAttributes<Model, ClassifierModels> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  model: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  active: {
    type: DataType.BOOLEAN,
    allowNull: false,
  },
}

export interface ITypicalMalfunctions {
  id: string
  typicalMalfunction: string
  active: boolean
}

export interface TypicalMalfunctions {
  id: string
  typicalMalfunction: string
  active: boolean
}

export const typicalMalfunctions: ModelAttributes<Model, TypicalMalfunctions> =
  {
    id: {
      type: DataType.STRING,
      defaultValue: DataType.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    typicalMalfunction: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    },
    active: {
      type: DataType.BOOLEAN,
      allowNull: false,
    },
  }

export interface IThroughModelTypMalfunctions {
  id: string
  id_model: string
  id_typicalMalfunction: string
}

export const throughModelTypMalfunctions: ModelAttributes<
  Model,
  IThroughModelTypMalfunctions
> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  id_model: {
    type: DataType.STRING,
    allowNull: false,
  },
  id_typicalMalfunction: {
    type: DataType.STRING,
    allowNull: false,
  },
}

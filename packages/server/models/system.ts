import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'

export interface ISystem {
  general: IGeneralSystem
  auth: IAuthSystem
  additional: IAdditionalSystem
  emailServer: IEmailServerSystem
  incident: IIncidentSystem
}

export interface IGeneralSystem {
  name: string
  emailSystem: string
}

export interface IAuthSystem {
  passwordMinLength: number
  passwordMaxLength: number
}

export interface IAdditionalSystem {
  maxSizeFileUpload: number
}

export interface IEmailServerSystem {
  timeZoneForNotification: number
  host: string
  port: number
  email: string
  password: string
}

export interface IIncidentSystem {
  daysForClose: number
  emailTechnicalSupport: string
}

export const system: ModelAttributes<Model, ISystem> = {
  general: {
    type: DataType.JSONB,
    allowNull: false,
  },
  auth: {
    type: DataType.JSONB,
    allowNull: false,
  },
  additional: {
    type: DataType.JSONB,
    allowNull: false,
  },
  emailServer: {
    type: DataType.JSONB,
    allowNull: false,
  },
  incident: {
    type: DataType.JSONB,
    allowNull: false,
  },
}

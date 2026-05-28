export interface SystemState {
  system: ISystem
  isLoadingSystem: boolean
  error?: string
}

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
  host: string | undefined
  port: number | undefined
  email: string | undefined
  password: string | undefined
}

export interface IIncidentSystem {
  daysForClose: number
  emailTechnicalSupport: string
}

export interface AnswerGetSystem {
  data: ISystem
  message: {
    text: string
    type: string
  }
}

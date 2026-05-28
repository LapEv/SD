import dotenv from 'dotenv'
dotenv.config({ path: '../../../.env' })

export const systemStartData = [
  {
    general: {
      name: '',
      emailSystem: '',
    },
    auth: {
      passwordMinLengthname: 5,
      passwordMaxLength: 30,
    },
    additional: {
      maxSizeFileUpload: 50,
    },
    emailServer: {
      timeZoneForNotification: 3,
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      email: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD,
    },
    incident: {
      daysForClose: 30,
      emailTechnicalSupport: '',
    },
  },
]

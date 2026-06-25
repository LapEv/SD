export const systemStartData = [
  {
    general: {
      name: '',
      emailSystem: '',
    },
    auth: {
      passwordMinLength: 5,
      passwordMaxLength: 30,
    },
    additional: {
      maxSizeFileUpload: 10,
    },
    emailServer: {
      timeZoneForNotification: 3,
      host: '',
      port: '',
      email: '',
      password: '',
    },
    incident: {
      daysForClose: 30,
      emailTechnicalSupport: '',
    },
  },
]

export const systemUser = {
  username: 'System',
  password: '',
  firstName: 'System',
  lastName: '',
  middleName: '',
  shortName: 'System',
  email: '',
  phone: '',
  rolesGroup: '',
  post: '',
  division: '',
  chiefDivision: false,
  department: '',
  chiefDepartment: false,
  id_division: '',
  id_department: '',
  id_rolesGroup: '',
  status: 'system',
  reasonOfDelete: '',
  theme: '',
}

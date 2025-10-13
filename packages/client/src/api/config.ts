import axios, { InternalAxiosRequestConfig } from 'axios'
import { store } from 'store'
import { clearUser } from 'storeAuth/index'

export const ApiEndPoints = {
  User: {
    Login: 'user/login',
    SetUser: 'user/setUser',
    newUser: 'user/newUser',
    SignOut: 'user/logout',
    UserInfo: 'user/getUserInfo',
    GetUsers: 'user/getActiveUsers',
    GetFieldEngineers: 'user/getFieldEngineers',
    GetDispatchers: 'user/getDispatchers',
    CheckUser: 'user/checkUser',
    UserFullInfo: 'user/getUserFullInfo',
    ChangePassword: 'user/changePassword',
    UpdateProfile: 'user/updateProfile',
    UpdateProfileAvatar: 'user/profile/changeAvatar',
    Search: 'user/search',
    ChangeUserAppOptions: 'user/changeUserAppOptions',
    GetUserTheme: 'user/theme/?id=',
    GetUserStatus: 'user/getUserStatus',
    DeleteUser: 'user/deleteUser',
    UpdateUser: 'user/updateUser',
  },
  Roles: {
    newRole: 'role/newRole',
    newRolesGroup: 'role/newRolesGroup',
    getRoles: 'role/getRoles',
    getRolesGroup: 'role/getRolesGroup',
    getRolesGroupNotRoles: 'role/getRolesGroupNotRoles',
    getRolesGroupByID: 'role/getRolesGroupByID',
    deleteRoles: 'role/deleteRoles',
    deleteRolesGroup: 'role/deleteRolesGroup',
    changeRolesGroup: 'role/changeRolesGroup',
    changeNameRolesGroup: 'role/changeNameRolesGroup',
    changeNameRole: 'role/changeNameRole',
  },
  Structure: {
    newDivision: 'structure/newDivision',
    newDepartment: 'structure/newDepartment',
    getDivisions: 'structure/getDivisions',
    getDepartments: 'structure/getDepartments',
    deleteDivision: 'structure/deleteDivision',
    deleteDepartment: 'structure/deleteDepartment',
    updateDivision: 'structure/updateDivision',
    updateDepartment: 'structure/updateDepartment',
    changeNameDivision: 'structure/changeNameDivision',
    changeNameDepartment: 'structure/changeNameDepartment',
  },
  Addresses: {
    getAddresses: 'addresses/getAddresses',
    newAddress: 'addresses/newAddress',
    deleteAddress: 'addresses/deleteAddress',
    changeAddress: 'addresses/changeAddress',
    getRegions: 'addresses/getRegions',
    newRegion: 'addresses/newRegion',
    deleteRegion: 'addresses/deleteRegion',
    changeRegion: 'addresses/changeRegion',
  },
  Objects: {
    getObjects: 'objects/getObjects',
    newObject: 'objects/newObject',
    deleteObjects: 'objects/deleteObjects',
    changeObject: 'objects/changeObject',
  },
  Classifier: {
    getClassifierEquipments: 'classifier/getClassifierEquipments',
    newClassifierEquipment: 'classifier/newClassifierEquipment',
    deleteClassifierEquipment: 'classifier/deleteClassifierEquipment',
    changeClassifierEquipment: 'classifier/changeClassifierEquipment',
    getClassifierModels: 'classifier/getClassifierModels',
    getClassifierModelsById: 'classifier/getClassifierModelsById',
    newClassifierModel: 'classifier/newClassifierModel',
    deleteClassifierModel: 'classifier/deleteClassifierModel',
    changeClassifierModel: 'classifier/changeClassifierModel',
    getTypicalMalfunctions: 'classifier/getTypicalMalfunctions',
    getTypicalMalfunctionsById: 'classifier/getTypicalMalfunctionsById',
    newTypicalMalfunction: 'classifier/newTypicalMalfunction',
    deleteTypicalMalfunction: 'classifier/deleteTypicalMalfunction',
    changeTypicalMalfunction: 'classifier/changeTypicalMalfunction',
    changeModelsInTypicalMalfunction:
      'classifier/changeModelsInTypicalMalfunction',
  },
  SLA: {
    getSLA: 'SLA/getSLA',
    newSLA: 'SLA/newSLA',
    deleteSLA: 'SLA/deleteSLA',
    changeSLA: 'SLA/changeSLA',
    getOLA: 'SLA/getOLA',
    newOLA: 'SLA/newOLA',
    deleteOLA: 'SLA/deleteOLA',
    changeOLA: 'SLA/changeOLA',
  },
  Clients: {
    getClientGroups: 'client/getClientGroups',
    newClientGroup: 'client/newClientGroup',
    deleteClientGroup: 'client/deleteClientGroup',
    changeClientGroup: 'client/changeClientGroup',
    getClients: 'client/getClients',
    newClient: 'client/newClient',
    deleteClient: 'client/deleteClient',
    changeClient: 'client/changeClient',
  },
  Contracts: {
    getContracts: 'contracts/getContracts',
    getContractsByClientID: 'contracts/getContractsByClientID',
    newContract: 'contracts/newContract',
    newContractName: 'contracts/newContractName',
    deleteContract: 'contracts/deleteContract',
    changeContract: 'contracts/changeContract',
  },
  INC: {
    getINC: 'incidents/getINC',
    getFilter: 'incidents/getFilter',
    getINCs: 'incidents/getINCs',
    newINC: 'incidents/newINC',
    changeINC: 'incidents/changeINC',
    changeExecutor: 'incidents/changeExecutor',
    changeResponsible: 'incidents/changeResponsible',
    changeStatus: 'incidents/changeStatus',
    changeUserClosingCheck: 'incidents/changeUserClosingCheck',
    changeUserClosing: 'incidents/changeUserClosing',
    changeComment: 'incidents/changeComment',
    getIncidentStatuses: 'incidents/getIncidentStatuses',
    newIncidentStatuses: 'incidents/newIncidentStatuses',
    deleteIncidentStatuses: 'incidents/deleteIncidentStatuses',
    changeIncidentStatuses: 'incidents/changeIncidentStatuses',
    changeStateIncidentStatuses: 'incidents/changeStateIncidentStatuses',
    getTypesOfWork: 'incidents/getTypesOfWork',
    newTypeOfWork: 'incidents/newTypeOfWork',
    deleteTypesOfWork: 'incidents/deleteTypesOfWork',
    changeTypesOfWork: 'incidents/changeTypesOfWork',
    getTypesCompletedWork: 'incidents/getTypesCompletedWork',
    newTypeCompletedWork: 'incidents/newTypeCompletedWork',
    deleteTypesCompletedWork: 'incidents/deleteTypesCompletedWork',
    changeTypesCompletedWork: 'incidents/changeTypesCompletedWork',
  },
  Files: {
    getFiles: 'files/getFiles',
    getFile: 'files/getFile',
    getAvatar: 'files/getAvatar',
    uploadFiles: 'files/uploadFiles',
    uploadAvatars: 'files/uploadAvatars',
    deleteAvatar: 'files/deleteAvatar',
  },
}

const url = __BASE_URL__.includes('https')
  ? `${__BASE_URL__}/api/`
  : `http://${__BASE_URL__}:${__SERVER_PORT__}/api/`

const authhost = axios.create({
  baseURL: url,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

const authFileHost = axios.create({
  baseURL: url,
  timeout: 5000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

const host = axios.create({
  baseURL: url,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

const authInterceptor = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}

authhost.interceptors.request.use(authInterceptor)
authFileHost.interceptors.request.use(authInterceptor)

authhost.interceptors.response.use(
  res => res,
  error => {
    console.log('res error = ', error)
    if (error.response) {
      if (error.response.status) {
        if (
          (error.response.status === 401 &&
            error.response.statusText === 'Unauthorized') ||
          (error.response.status === 403 &&
            error.response.statusText === 'Forbidden' &&
            error.response.data.message === 'The user is not logged in')
        ) {
          localStorage.removeItem('token')
          store.dispatch(clearUser())
        }
      }
    }
    return Promise.reject(error)
  },
)

export { host, authhost, authFileHost }

import { RolesGroup } from 'storeRoles/interfaces'
import { FilterListData } from '../incidents/interfaces'
import { Files } from '../files/interfaces'

export interface User {
  id?: string
  username?: string
  firstName?: string
  lastName?: string
  middleName?: string
  shortName?: string
  phone?: string
  email?: string
  avatar?: string
  password?: string
  theme?: string
  post?: string
  token?: string
  department?: string
  id_division?: string
  id_department?: string
  id_rolesGroup?: string
  status?: string
  RolesGroup?: RolesGroup
  Files?: Files[]
  appOptions?: AppOptions
}

export type ThemeMode = 'light' | 'dark'
export interface AppOptions {
  theme?: ThemeMode
  font?: string
  colorTheme?: IColorTheme
}

export interface IColorTheme {
  colorLight: string
  colorDark: string
}

export interface ICheckUser {
  user: User
  filterData: FilterListData
  token: string
}

export interface Users {
  data: {
    id?: string
    username?: string
    firstName?: string
    lastName?: string
    middleName?: string
    shortName?: string
    phone?: string
    email?: string
    avatar?: string
    password?: string
    theme?: string
    post?: string
    token?: string
    department?: string
    id_division?: string
    id_department?: string
    id_rolesGroup?: string
    RolesGroup?: RolesGroup
  }[]
}

export interface SignUp {
  username: string
  firstName: string
  lastName: string
  phone: string
  email: string
  password: string
}

export interface NewUser {
  username: string
  firstName: string
  lastName: string
  middleName: string
  phone: string
  email: string
  password: string
  post: string
  id_rolesGroup: string
  chiefDivision: boolean
  id_division: string
  chiefDepartment: boolean
  id_department: string
  status: string
  reasonOfDelete: string
}

export interface Login {
  username: string
  password: string
}

export interface ChangePasswordProps {
  oldPassword: string
  newPassword: string
  id: string
}
export interface ChangeAppProps {
  id: string
  appOptions: AppOptions
}
export interface AvatarProps {
  selectedFile: FileProps
  id_avatarFiles: string
  id: string
}

export interface UserStatus {
  category: string
  categoryName: string
  id: string
}

export interface AnswerUser {
  data: User[]
  type: string
}

export type AuthState = {
  user: User
  userData: User
  userInfo: User
  activeUserInfo: string
  users: User[]
  userStatus: UserStatus[]
  avatar: string
  fieldEngineers: User[]
  dispatchers: User[]
  userByDepartment: User[]
  admin: boolean
  superAdmin: boolean
  isLoadingAuth: boolean
  error?: string
  colorTheme: IColorTheme
}

export interface UserForINC {
  id: string
  username: string
  firstName: string
  lastName: string
  middleName: string
  shortName: string
  active: boolean
}

export interface delData {
  id: string
  reasonOfDelete: string
}

export interface UserProfile {
  username: string
  firstName: string
  lastName: string
  middleName: string
  phone: string
  email: string
  post: string
  avatar: string
  id: string
}

export interface FileProps {
  data: string | ArrayBuffer | null
  info: File | undefined
}

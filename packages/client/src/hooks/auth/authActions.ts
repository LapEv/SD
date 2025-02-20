import {
  SignUp,
  AvatarProps,
  Login,
  User,
  ChangePasswordProps,
  ChangeAppProps,
  NewUser,
  IColorTheme,
} from 'storeAuth/interfaces'
export interface AuthActions {
  signin: (authData: Login) => void
  signup: (signUpData: SignUp) => void
  newUser: (newUserData: NewUser) => void
  signout: () => void
  updateProfile: (data: User) => void
  changeAvatar: (data: AvatarProps) => void
  changePassword: (data: ChangePasswordProps) => void
  changeUserAppOptions: (options: ChangeAppProps) => void
  getUserInfo: (id: string) => void
  getFieldEngineers: () => void
  getDispatchers: () => void
  getActiveUsers: (data: User) => void
  checkUser: () => void
  updateUserData: (data: User) => void
  getUserStatus: () => void
  deleteUser: (id: string, reasonOfDelete: string) => void
  updateUser: (data: User) => void
  setActiveUserInfo: (id: string) => void
  deleteAvatar: (id: string) => void
  setAvatar: (data: string) => void
  changeColorTheme: (data: IColorTheme) => void
}

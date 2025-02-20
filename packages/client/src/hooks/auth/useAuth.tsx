import { useSelector } from 'react-redux'
import {
  getUserInfo,
  GetActiveUsers,
  GetFieldEngineers,
  updateProfile,
  ChangeAvatar,
  changePassword,
  changeUserAppOptions,
  CheckUser,
  getUserStatus,
  deleteUser,
  updateUser,
  GetDispatchers,
  newUser,
  deleteAvatar,
} from 'api/user'
import { signin, signup } from 'api/user'
import { RootState } from 'store'
import { useAppDispatch } from 'store/hooks'
import {
  setActiveUserInfo,
  signout,
  updateUserData,
  setAvatar,
  changeColorTheme,
} from 'store/slices/auth'
import { AuthActions } from './authActions'
import { AuthState } from 'storeAuth/interfaces'

export function useAuth(): [AuthState, AuthActions] {
  const auth = useSelector((state: RootState) => state.auth)
  const dispatch = useAppDispatch()

  return [
    auth,
    {
      signin(authData) {
        dispatch(signin(authData))
      },
      signup(signUpData) {
        dispatch(signup(signUpData))
      },
      newUser(newUserData) {
        dispatch(newUser(newUserData))
      },
      signout() {
        dispatch(signout())
      },
      updateProfile(data) {
        dispatch(updateProfile(data))
      },
      changeAvatar(data) {
        dispatch(ChangeAvatar(data))
      },
      changePassword(data) {
        dispatch(changePassword(data))
      },
      changeUserAppOptions(options) {
        dispatch(changeUserAppOptions(options))
      },
      getUserInfo(id) {
        dispatch(getUserInfo(id))
      },
      getFieldEngineers() {
        dispatch(GetFieldEngineers())
      },
      getDispatchers() {
        dispatch(GetDispatchers())
      },
      getActiveUsers(data) {
        dispatch(GetActiveUsers(data))
      },
      checkUser() {
        dispatch(CheckUser())
      },
      updateUserData(data) {
        dispatch(updateUserData(data))
      },
      // updateEditStatus(data) {
      //   dispatch(updateEditStatus(data))
      // },
      getUserStatus() {
        dispatch(getUserStatus())
      },
      deleteUser(id, reasonOfDelete) {
        dispatch(deleteUser({ id, reasonOfDelete }))
      },
      updateUser(data) {
        dispatch(updateUser(data))
      },
      setActiveUserInfo(data) {
        dispatch(setActiveUserInfo(data))
      },
      deleteAvatar(id) {
        dispatch(deleteAvatar(id))
      },
      setAvatar(data) {
        dispatch(setAvatar(data))
      },
      changeColorTheme(data) {
        dispatch(changeColorTheme(data))
      },
    },
  ]
}

import { ChangePasswordProps, ISystem } from 'store/slices/system/interfaces'

export interface SystemActions {
  setSystem: (data: ISystem) => void
  getSystem: () => void
  changePasswordSystem: (data: ChangePasswordProps) => void
}

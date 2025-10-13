import {
  ChangeNameRole,
  ChangeNameRolesGroup,
  NewRole,
  NewRolesGroup,
} from 'storeRoles/interfaces'

export interface RolesActions {
  getRoles: () => void
  getRolesGroup: () => void
  getRolesGroupNotRoles: () => void
  getRolesGroupByID: (id: string) => void
  setActiveRolesGroup: (data: string) => void
  newRole: (data: NewRole) => void
  newRolesGroup: (data: NewRolesGroup) => void
  deleteRoles: (data: string[]) => void
  deleteRolesGroup: (data: string[]) => void
  changeRolesGroup: (selectedRoles: string[], activeRolesGroup: string) => void
  changeNameRolesGroup: (data: ChangeNameRolesGroup) => void
  changeNameRole: (data: ChangeNameRole) => void
}

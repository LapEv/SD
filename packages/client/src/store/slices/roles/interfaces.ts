export interface Roles {
  id: string
  role: string
  nameRole: string
  createdAt?: string
  updatedAt?: string
}

export interface RolesGroup {
  group: string
  id: string
  groupName: string
  Roles?: Roles[]
}

export interface NewRolesGroup {
  group: string
  groupName: string
  selectedRoles: string[]
}

export interface NewRole {
  role: string
  nameRole: string
  selectedRolesGroups: string[]
}

export interface RolesGroupObject {
  nameRole: string
  id: string
  role: string
}

export interface СhangeRolesGroup {
  selectedRoles: string[]
  activeRolesGroup: string
}

export interface AnswerRole {
  data: Roles[]
  type: string
}

export interface AnswerRolesGroup {
  data: RolesGroup[]
  type: string
}

export type RolesState = {
  roles: Roles[]
  rolesGroup: RolesGroup[]
  activeRolesGroup: string
  isLoadingRoles: boolean
  error?: string
}

export interface ChangeNameRolesGroup {
  id: string
  group: string
  groupName: string
}

export interface ChangeNameRole {
  id: string
  role: string
  nameRole: string
}

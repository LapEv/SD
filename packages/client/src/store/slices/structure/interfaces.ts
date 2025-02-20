import { User } from 'storeAuth/interfaces'

export interface Division {
  id?: string
  division?: string
  divisionName: string
  data?: string[]
  id_division?: string
  Departments?: Department[]
}

export interface Department {
  id?: string
  department?: string
  departmentName: string
  division?: string
  divisionName?: string
  id_division?: string
  id_department?: string
  Users?: User[]
  Division?: Division
}

export interface NewDivision {
  division: string
  divisionName: string
}

export interface NewDepartment {
  department: string
  departmentName: string
  division: string
  id_division: string
}

export interface StructureState {
  divisions: Division[]
  departaments: Department[]
  activeDivision: string
  activeDepartment: string
  isLoadingStructure: boolean
  error?: string
}

export interface AnswerDivision {
  data: Division[]
  type: string
}

export interface AnswerDepartment {
  data: Department[]
  type: string
}

export interface ChangeNameDivision {
  id: string
  division: string
  divisionName: string
}

export interface ChangeNameDepartment {
  id: string
  department: string
  departmentName: string
}

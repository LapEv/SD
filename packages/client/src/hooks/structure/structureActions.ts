import {
  ChangeNameDepartment,
  ChangeNameDivision,
  NewDepartment,
  NewDivision,
} from 'store/slices/structure/interfaces'

export interface StructureActions {
  getDivisions: () => void
  getDepartments: () => void
  newDivision: (data: NewDivision) => void
  newDepartment: (data: NewDepartment) => void
  deleteDivision: (divisions: string[]) => void
  deleteDepartment: (departaments: string[]) => void
  setActiveDivision: (division: string) => void
  setActiveDepartment: (departament: string) => void
  changeNameDivision: (data: ChangeNameDivision) => void
  changeNameDepartment: (data: ChangeNameDepartment) => void
}

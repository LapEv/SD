import { useSelector } from 'react-redux'
import { useAppDispatch } from 'store/hooks'
import { StructureActions } from './structureActions'
import {
  deleteDepartment,
  deleteDivision,
  getDepartments,
  getDivisions,
  newDepartment,
  newDivision,
  changeNameDivision,
  changeNameDepartment,
} from 'api/structure'
import { setActiveDepartment, setActiveDivision } from 'store/slices/structure'
import { RootState } from 'store'
import { StructureState } from 'store/slices/structure/interfaces'

export function useStructure(): [StructureState, StructureActions] {
  const structure = useSelector((state: RootState) => state.structure)
  const dispatch = useAppDispatch()

  return [
    structure,
    {
      getDivisions() {
        dispatch(getDivisions())
      },
      getDepartments() {
        dispatch(getDepartments())
      },
      newDivision(data) {
        dispatch(newDivision(data))
      },
      newDepartment(data) {
        dispatch(newDepartment(data))
      },
      deleteDivision(divisions) {
        dispatch(deleteDivision(divisions))
      },
      deleteDepartment(department) {
        dispatch(deleteDepartment(department))
      },
      setActiveDivision(division) {
        dispatch(setActiveDivision(division))
      },
      setActiveDepartment(department) {
        dispatch(setActiveDepartment(department))
      },
      changeNameDivision(data) {
        dispatch(changeNameDivision(data))
      },
      changeNameDepartment(data) {
        dispatch(changeNameDepartment(data))
      },
    },
  ]
}

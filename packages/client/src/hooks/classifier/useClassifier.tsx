import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { useAppDispatch } from 'store/hooks'
import { ClassifierActions } from './ClassifierActions'
import {
  getClassifierEquipments,
  getClassifierModels,
  getTypicalMalfunctions,
  newClassifierEquipment,
  newClassifierModel,
  newTypicalMalfunction,
  deleteClassifierEquipment,
  deleteClassifierModel,
  deleteTypicalMalfunction,
  changeClassifierEquipment,
  changeClassifierModel,
  changeTypicalMalfunction,
  getClassifierModelsById,
  getTypicalMalfunctionsById,
  changeModelsInTypicalMalfunction,
} from 'api/classifier'
import { ClassifierState } from 'store/slices/classifier/interfaces'
import {
  resetModels,
  resetTypicalMalfunction,
  setActiveEquipment,
  setActiveModel,
} from 'store/slices/classifier'

export function useClassifier(): [ClassifierState, ClassifierActions] {
  const classifier = useSelector((state: RootState) => state.classifier)
  const dispatch = useAppDispatch()

  return [
    classifier,
    {
      getClassifierEquipments() {
        dispatch(getClassifierEquipments())
      },
      getClassifierModels() {
        dispatch(getClassifierModels())
      },
      getClassifierModelsById(id_equipment) {
        dispatch(getClassifierModelsById(id_equipment))
      },
      getTypicalMalfunctions() {
        dispatch(getTypicalMalfunctions())
      },
      getTypicalMalfunctionsById(id_equipment) {
        dispatch(getTypicalMalfunctionsById(id_equipment))
      },
      newClassifierEquipment(data) {
        dispatch(newClassifierEquipment(data))
      },
      newClassifierModel(data) {
        dispatch(newClassifierModel(data))
      },
      newTypicalMalfunction(data) {
        dispatch(newTypicalMalfunction(data))
      },
      deleteClassifierEquipment(data) {
        dispatch(deleteClassifierEquipment(data))
      },
      deleteClassifierModel(data) {
        dispatch(deleteClassifierModel(data))
      },
      deleteTypicalMalfunction(data) {
        dispatch(deleteTypicalMalfunction(data))
      },
      changeClassifierEquipment(data) {
        dispatch(changeClassifierEquipment(data))
      },
      changeClassifierModel(data) {
        dispatch(changeClassifierModel(data))
      },
      changeTypicalMalfunction(data) {
        dispatch(changeTypicalMalfunction(data))
      },
      changeModelsInTypicalMalfunction({
        id_equipment,
        newTypicalMalfunction,
      }) {
        dispatch(
          changeModelsInTypicalMalfunction({
            id_equipment,
            newTypicalMalfunction,
          })
        )
      },
      setActiveEquipment(id) {
        dispatch(setActiveEquipment(id))
      },
      setActiveModel(id) {
        dispatch(setActiveModel(id))
      },
      resetTypicalMalfunction() {
        dispatch(resetTypicalMalfunction())
      },
      resetModels() {
        dispatch(resetModels())
      },
    },
  ]
}

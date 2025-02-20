import { ChangeObject, Objects } from 'store/slices/objects/interfaces'

export interface ObjectsActions {
  getObjects: () => void
  newObject: (data: Objects) => void
  deleteObjects: (data: string[]) => void
  changeObject: (data: ChangeObject) => void
  setActiveObject: (id: string) => void
}

import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { useAppDispatch } from 'store/hooks'
import { ObjectsActions } from './objectsActions'
import { changeObject, deleteObjects, getObjects, newObject } from 'api/objects'
import { setActiveObject } from 'store/slices/objects'
import { ObjectsState } from 'store/slices/objects/interfaces'

export function useObjects(): [ObjectsState, ObjectsActions] {
  const objects = useSelector((state: RootState) => state.objects)
  const dispatch = useAppDispatch()

  return [
    objects,
    {
      getObjects() {
        dispatch(getObjects())
      },
      newObject(data) {
        dispatch(newObject(data))
      },
      deleteObjects(data) {
        dispatch(deleteObjects(data))
      },
      changeObject(data) {
        dispatch(changeObject(data))
      },
      setActiveObject(id) {
        dispatch(setActiveObject(id))
      },
    },
  ]
}

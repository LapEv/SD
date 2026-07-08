import { useSelector } from 'react-redux'
import { SystemActions } from './systemActions'
import { RootState } from 'store/index'
import { useAppDispatch } from 'store/hooks'
import { SystemState } from 'store/slices/system/interfaces'
import { changePasswordSystem, getSystem, setSystem } from 'api/system'

export function useSystem(): [SystemState, SystemActions] {
  const system = useSelector((state: RootState) => state.system)
  const dispatch = useAppDispatch()

  return [
    system,
    {
      setSystem(data) {
        dispatch(setSystem(data))
      },
      getSystem() {
        dispatch(getSystem())
      },
      changePasswordSystem(data) {
        dispatch(changePasswordSystem(data))
      },
    },
  ]
}

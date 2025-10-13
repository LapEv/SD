import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { useAppDispatch } from 'store/hooks'
import { SLAState } from 'store/slices/sla/interfaces'
import { SLAActions } from './slaActions'
import {
  getSLA,
  getOLA,
  newSLA,
  newOLA,
  deleteSLA,
  deleteOLA,
  changeSLA,
  changeOLA,
} from 'api/sla'
import { setActiveList, setActiveSLA } from 'store/slices/sla'

export function useSLA(): [SLAState, SLAActions] {
  const sla = useSelector((state: RootState) => state.sla)
  const dispatch = useAppDispatch()

  return [
    sla,
    {
      getSLA() {
        dispatch(getSLA())
      },
      getOLA() {
        dispatch(getOLA())
      },
      newSLA(data) {
        dispatch(newSLA(data))
      },
      newOLA(data) {
        dispatch(newOLA(data))
      },
      deleteSLA(data) {
        dispatch(deleteSLA(data))
      },
      deleteOLA(data) {
        dispatch(deleteOLA(data))
      },
      changeSLA(data) {
        dispatch(changeSLA(data))
      },
      changeOLA(data) {
        dispatch(changeOLA(data))
      },
      setActiveSLA(id) {
        dispatch(setActiveSLA(id))
      },
      setActiveList(id) {
        dispatch(setActiveList(id))
      },
    },
  ]
}

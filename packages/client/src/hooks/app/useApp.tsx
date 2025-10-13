import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { useAppDispatch } from 'store/hooks'
import { AppState } from 'store/slices/app/interfaces'
import { setDataWidth } from 'store/slices/app'
import { AppActions } from './appActions'

export function useApp(): [AppState, AppActions] {
  const app = useSelector((state: RootState) => state.app)
  const dispatch = useAppDispatch()

  return [
    app,
    {
      setDataWidth(dataWidth) {
        dispatch(setDataWidth(dataWidth))
      },
    },
  ]
}

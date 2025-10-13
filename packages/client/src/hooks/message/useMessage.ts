import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { useAppDispatch } from 'store/hooks'
import { MessageActions } from './messageActions'
import { resetMessage, setMessage } from 'store/slices/message'
import { MessageState } from 'store/slices/message/interfaces'

export function useMessage(): [MessageState, MessageActions] {
  const message = useSelector((state: RootState) => state.message)
  const dispatch = useAppDispatch()

  return [
    message,
    {
      resetMessage() {
        dispatch(resetMessage())
      },
      setMessage(data) {
        dispatch(setMessage(data))
      },
    },
  ]
}

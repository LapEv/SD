import { Message_State } from 'store/slices/message/interfaces'

export interface MessageActions {
  resetMessage: () => void
  setMessage: (data: Message_State) => void
}

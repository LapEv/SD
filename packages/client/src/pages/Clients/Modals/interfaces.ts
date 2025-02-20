import { Options } from 'components/DropDown/interface'

export interface ChooseModalProps {
  modalImage?: string
  handleModal: (state: boolean) => void
  title?: string
}

export interface AddValuesProps {
  list: {
    name: string
    label: string
    value: string
    validation: object
    type: string
    required?: boolean
  }[]
}
export interface AddValuesPropsTwoForms {
  list2: {
    name: string
    label: string
    value: string
    validation: object
    type: string
    required?: boolean
  }[]
}

export interface answerModalAddAddressInObject {
  state: boolean
  region: Options
  address: Options
  coordinates: string
}

export interface IModalAddAddressInObject {
  handleModal: (data: answerModalAddAddressInObject) => void
  question: string
  address: string
}

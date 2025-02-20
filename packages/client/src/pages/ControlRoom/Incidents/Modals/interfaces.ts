import { Options } from 'components/DropDown/interface'

export interface ChooseModalProps {
  modalImage?: string
  handleModal: (state: boolean) => void
  title?: string
  id?: string
  incident?: string
}

export interface ModalImageProps {
  image?: string
  id: string
  incident: string
}

export interface DataCloseINC {
  state: boolean
  typeCompletedWork?: Options
  commentCloseCheck?: string
  files?: FileList
  spaceParts?: string[]
  data: Options
}

export interface CloseINCProps {
  modalImage?: string
  handleModal: (data: DataCloseINC) => void
  title?: string
  data: Options
}

export interface AddValuesProps {
  list: {
    name: string
    label: string
    value: string
    validation: object
    type: string
    required: boolean
    tabIndex: number
  }[]
}

export interface AddValuesPropsINC {
  listAddSLA: {
    name: string
    label: string
    value: string
    validation: object
    type: string
    required: boolean
  }[]
}

export interface TypeModels {
  id: string
  models: string[]
}

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
    required: boolean
  }[]
}

export interface AddValuesPropsSLA {
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

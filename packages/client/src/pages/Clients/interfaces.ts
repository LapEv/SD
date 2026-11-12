import { MouseEvent } from 'react'
import { Control, FieldArrayWithId, FieldErrors } from 'react-hook-form'
import { FileProps } from 'store/slices/auth/interfaces'
import {
  AvatarClientProps,
  Clients,
  IClientContact,
} from 'store/slices/clients/interfaces'

export interface IEquipmentList {
  equipmentID: string[]
  modelID: string[]
  onChooseGroup: (data: string[]) => void
  onChooseItems: (data: string[]) => void
  clearChanges?: boolean
  onClearChanges?: (clearChanges: boolean) => void
}

export interface IIncStatussesList {
  incStatussesID: string[]
  onChooseItems: (checked: boolean, id: string) => void
}

export interface IObjectList {
  objectID: string[]
  onChooseItems: (checked: boolean, id: string) => void
}

export interface ISLAList {
  slaID: string[]
  onChooseItems: (checked: boolean, id: string) => void
}

export interface ClientsAddValuesProps {
  list: {
    name: string
    label: string
    value: string | boolean
    validation: object
    type: string | boolean | undefined
    required: boolean
    tabIndex: number
  }[]
  listInfo: {
    name: string
    label: string
    value: string
    validation: object
    type: string
    required: boolean
    tabIndex: number
  }[]
  listWeb: {
    name: string
    label: string
    value: string
    validation: object
    type: string
    required: boolean
    tabIndex: number
  }[]
}

export interface IClientsList {
  clientData: Clients
  key?: string
}

export interface IGeneralBox {
  clientData: {
    id?: string
    legalName: string
    client: string
    login?: string
    password?: string
    Contacts?: IClientContact[] | []
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type IControl = Control<ClientsAddValuesProps, any, ClientsAddValuesProps>
/* eslint-enable @typescript-eslint/no-explicit-any */

export interface IGeneralInfo {
  clientData: {
    legalName: string
    client: string
    login?: string
    password?: string
  }
  fieldsInfo: FieldArrayWithId<ClientsAddValuesProps, 'listInfo', 'id'>[]
  errors: FieldErrors<ClientsAddValuesProps>
  control: IControl
  checkForChange: (newData: Record<never, never>) => void
}

export interface IGeneraWeb {
  clientData: {
    legalName: string
    client: string
    login?: string
    password?: string
  }
  fieldsWeb: FieldArrayWithId<ClientsAddValuesProps, 'listWeb', 'id'>[]
  errors: FieldErrors<ClientsAddValuesProps>
  control: IControl
  checkForChange: (newData: Record<never, never>) => void
}

export interface IGeneralContactBox {
  clientData: Clients
  clearContacts: boolean
  setClearContacts: (data: boolean) => void
  openContactsBox: boolean
  setOpenContactsBox: (data: MouseEvent) => void
}
export interface IContracts extends Clients {
  AddNewContract: () => void
}

export interface IGeneralContact {
  contact: IClientContact
  index: number
  clearContacts: boolean
  setClearContacts: (data: boolean) => void
  clientData: Clients
}

export interface ClientAvatarProps {
  id: string
  changeAvatar: (data: AvatarClientProps) => void
  deleteAvatar: (id: string) => void
  setAvatar: (data: string) => void
  avatar: FileProps
}

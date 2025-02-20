export interface Objects {
  id?: string
  object: string
  id_client: string
  id_address: string
  id_region: string
  internalClientID?: string
  internalClientName?: string
  active?: boolean
  Client?: {
    client: string
  }
  Address?: {
    address: string
  }
  Region?: {
    region: string
  }
  createdAt?: string
  updatedAt?: string
}

export interface AnswerObjects {
  data: Objects[]
  type: string
}

export type ObjectsState = {
  objects: Objects[]
  activeObject: string
  isLoadingObjects: boolean
  error?: string
}

export interface ChangeObject {
  id?: string
  object: string
  id_address: string
  id_region: string
  id_client: string
  internalClientID?: string
  internalClientName?: string
}
export interface ObjectsForINC {
  id: string
  object: string
  internalClientID: string
  internalClientName: string
  active: boolean
  Address?: {
    id: string
    address: string
    coordinates: string
    active: boolean
  }
  Region?: {
    id: string
    region: string
    active: boolean
  }
}

export interface Addresses {
  id?: string
  address: string
  coordinates: string
  id_region: string
  active?: boolean
  Region?: {
    region: string
  }
}

export interface Regions {
  id?: string
  region: string
  active?: boolean
}

export interface AnswerAddresses {
  data: Addresses[]
  type: string
}

export interface AnswerRegions {
  data: Regions[]
  type: string
}

export type AddressesState = {
  addresses: Addresses[]
  regions: Regions[]
  isLoadingAddress: boolean
  error?: string
}

export interface СhangeAddress {
  newAddress: Addresses
  id: string
}

export interface СhangeRegion {
  newRegion: Regions
  id: string
}

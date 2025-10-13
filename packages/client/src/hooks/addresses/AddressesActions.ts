import { Addresses, Regions } from 'store/slices/addresses/interfaces'

export interface AddressesActions {
  getAddresses: () => void
  getRegions: () => void
  newAddress: (data: Addresses) => void
  newRegion: (data: Regions) => void
  deleteAddress: (data: string[]) => void
  deleteRegion: (data: string[]) => void
  changeAddress: (newAddress: Addresses, id: string) => void
  changeRegion: (region: Regions, id: string) => void
  addAddress: (address: Addresses) => void
}

import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { useAppDispatch } from 'store/hooks'
import { AddressesActions } from './AddressesActions'
import { AddressesState } from 'store/slices/addresses/interfaces'
import {
  getAddresses,
  getRegions,
  newAddress,
  newRegion,
  deleteAddress,
  deleteRegion,
  changeAddress,
  changeRegion,
} from 'api/address'
import { addAddress } from 'store/slices/addresses'

export function useAddresses(): [AddressesState, AddressesActions] {
  const addresses = useSelector((state: RootState) => state.addresses)
  const dispatch = useAppDispatch()

  return [
    addresses,
    {
      getAddresses() {
        dispatch(getAddresses())
      },
      getRegions() {
        dispatch(getRegions())
      },
      newAddress(data) {
        dispatch(newAddress(data))
      },
      newRegion(data) {
        dispatch(newRegion(data))
      },
      deleteAddress(data) {
        dispatch(deleteAddress(data))
      },
      deleteRegion(data) {
        dispatch(deleteRegion(data))
      },
      changeAddress(newAddress, id) {
        dispatch(changeAddress({ newAddress, id }))
      },
      changeRegion(newRegion, id) {
        dispatch(changeRegion({ newRegion, id }))
      },
      addAddress(address) {
        dispatch(addAddress(address))
      },
    },
  ]
}

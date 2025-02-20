import { Order } from 'sequelize'

export const getOrderINC = (nameSort: string, direction: string) => {
  if (nameSort === 'contract') {
    return [['id_incContract', direction as string]] as Order
  }
  if (nameSort === 'client') {
    return [['id_incClient', direction as string]] as Order
  }
  if (
    nameSort === 'object' ||
    nameSort === 'address' ||
    nameSort === 'region'
  ) {
    return [['id_incObject', direction as string]] as Order
  }
  if (nameSort === 'equipment') {
    return [['id_incEquipment', direction as string]] as Order
  }
  if (nameSort === 'model') {
    return [['id_incModel', direction as string]] as Order
  }
  return [[nameSort as string, direction as string]] as Order
}

export const getOrder = (nameSort: string, direction: string) => {
  return [[nameSort as string, direction as string]] as Order
}

import { Login } from 'storeAuth/interfaces'

export interface LoginValues extends Login {
  list: {
    label: string
    value: string
    validation: object
    type: string
  }[]
}

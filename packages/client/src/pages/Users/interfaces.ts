import { User } from 'storeAuth/interfaces'
export interface ProfileValues extends User {
  list: {
    name: string
    label: string
    value: string | string[] | undefined
    validation: object
    disabled: boolean
    type: string
  }[]
}

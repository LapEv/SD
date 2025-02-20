export interface DataDropDown {
  data: Options[]
  value?: string
  props?: object
  label: string
  errorLabel: string
  onChange?: (value: Options) => void
  onBlur?: (value: string) => void
  error?: boolean
  textProps?: object
  disableClearable?: boolean
  tabIndex?: number
}

export interface DataDropDownIncidents {
  data: Options[]
  value?: string
  props?: Record<string, string[]>
  label: string
  errorLabel: string
  onChange?: (value: Options) => void
  onBlur?: (value: string) => void
  error?: boolean
  textProps?: object
  disableClearable?: boolean
  tabIndex?: number
}

export interface DataDropDownMultiple {
  data: Options[]
  value?: Options[]
  props?: object
  label: string
  errorLabel: string
  onChange?: (data: Options[]) => void
  onBlur?: (value: string) => void
  error?: boolean
}

export interface Data {
  category: string
  categoryName: string
  id: string
}

export interface Options {
  label: string
  id: string
  description?: string
  descriptionID?: string
}

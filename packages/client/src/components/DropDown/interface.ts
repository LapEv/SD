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
  className?: string
}

export interface IDropDownINC {
  data: Options[]
  value?: string
  props?: Record<string, string[]>
  label: string
  onChange?: (value: Options) => void
  onBlur?: (value: string) => void
  textProps?: object
  disableClearable?: boolean
  tabIndex?: number
  disabled?: boolean
  className?: string
  error?: boolean
  errorLabel?: string
}

export interface IDropDownINConTable {
  data: Options[]
  value?: string
  props?: Record<string, string[]>
  onChange?: (value: Options) => void
  onBlur?: (value: string) => void
  textProps?: object
  disableClearable?: boolean
  tabIndex?: number
  disabled?: boolean
  className?: string
}

export interface IDropDownINConEdit {
  data: Options[]
  value?: string
  props?: Record<string, string[]>
  onChange?: (value: Options) => void
  onBlur?: (value: string) => void
  textProps?: object
  disableClearable?: boolean
  tabIndex?: number
  disabled?: boolean
  className?: string
  classNameLi?: string
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
  className?: string
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

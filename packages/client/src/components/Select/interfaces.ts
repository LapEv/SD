export interface ISelect {
  defaultData?: string
  label: string
  data: string[]
  disabled?: boolean
  props?: Record<string, unknown>
  containerProps?: Record<string, unknown>
  onChange: (data: string) => void
  value?: string
  classNameSelect?: string
  classNameFormContorl?: string
}

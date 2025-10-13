export interface ISelect {
  defaultData: string
  label: string
  data: string[]
  props?: Record<string, unknown>
  onChange: (data: string) => void
  value?: string
}

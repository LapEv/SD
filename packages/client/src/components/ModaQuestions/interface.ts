import { TypographyPropsVariantOverrides } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'
import { OverridableStringUnion } from '@mui/types'

export interface IModalChangeName {
  handleModal: (state: boolean) => void
  question?: string
  label?: string
  answer: (answer: boolean, text: string) => void
  variant?:
    | OverridableStringUnion<
        'inherit' | Variant,
        TypographyPropsVariantOverrides
      >
    | undefined
}

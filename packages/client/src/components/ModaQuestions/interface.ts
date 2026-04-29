import {
  TypographyPropsVariantOverrides,
  TypographyVariant,
} from '@mui/material'
import { OverridableStringUnion } from '@mui/types'

export interface IModalChangeName {
  handleModal: (state: boolean) => void
  question?: string
  label?: string
  answer: (answer: boolean, text: string) => void
  variant?:
    | OverridableStringUnion<
        'inherit' | TypographyVariant,
        TypographyPropsVariantOverrides
      >
    | undefined
}

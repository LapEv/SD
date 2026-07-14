import MuiButton from '@mui/material/Button'
import { TButtonProps } from './interfaces'
import { memo } from 'react'

export const Button = memo((props: TButtonProps) => {
  const { sx, ...otherprops } = props

  return (
    <MuiButton
      className="baseButton"
      variant="contained"
      sx={sx}
      {...otherprops}
    />
  )
})

export { ButtonsSection } from './ButtonsSection'
export { ButtonsModalSection } from './ButtonsModalSection'
export { ButtonsSectionNoSubmit } from './ButtonsSectionNoSubmit'
export { RotateButton } from './RotateButton'
export { EditButton } from './EditButton'
export { IconPopoverButton } from './IconPopoverButton'
export { IconToolTipButton } from './IconToolTipButton'
export { ClearButton } from './ClearButton'
export { ClearSearchModalSection } from './ClearSearchModalSection'
export { ButtonsFilterINCs } from './ButtonsFilterINCs'
export { TextButton } from './TextButton'

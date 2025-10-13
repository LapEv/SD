import MuiButton, { type ButtonProps } from '@mui/material/Button'
import { useTheme } from '@mui/styles'
import {
  ElementType,
  ForwardRefExoticComponent,
  RefAttributes,
  memo,
} from 'react'
import { LinkProps } from 'react-router-dom'
import { ITheme, ThemeMode } from 'themes/themeConfig'

type TButtonProps = Omit<ButtonProps, 'component'> & {
  component?:
    | React.ForwardRefExoticComponent<
        LinkProps & React.RefAttributes<HTMLAnchorElement>
      >
    /* eslint-disable @typescript-eslint/no-explicit-any */
    | ElementType<any>
    /* eslint-enable @typescript-eslint/no-explicit-any */
    | ForwardRefExoticComponent<LinkProps & RefAttributes<HTMLAnchorElement>>
}

export const Button = memo((props: TButtonProps) => {
  const theme = useTheme() as ITheme
  const { sx, ...otherprops } = props

  const sxprops = {
    fontWeight: 700,
    color: theme.palette.mode === ThemeMode.light ? '#000000' : '#FFFFFF',
    boxShadow:
      theme.palette.mode === ThemeMode.light
        ? `0px 0px 7px 4px rgba(0, 0, 0, 0.2)`
        : `0px 0px 7px 4px rgba(0, 0, 0, 0.2)`,
    ...sx,
  }
  return <MuiButton variant="contained" sx={sxprops} {...otherprops} />
})

export { ButtonsSection } from './ButtonsSection'
export { ButtonsModalSection } from './ButtonsModalSection'
export { ButtonsSectionNoSubmit } from './ButtonsSectionNoSubmit'
export { RotateButton } from './RotateButton'
export { EditButton } from './EditButton'
export { IconPopoverButton } from './IconPopoverButton'
export { IconToolTipButton } from './IconToolTipButton'

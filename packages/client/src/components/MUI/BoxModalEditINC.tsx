import { forwardRef } from 'react'
import Box, { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { ITheme, ThemeMode } from 'themes/themeConfig'

export const BoxModalEditINC = styled(
  forwardRef((props: BoxProps, ref) => <Box {...props} ref={ref} />),
  {
    name: 'BoxModalEditINC',
    overridesResolver: (props, styles) => {
      return [styles.root]
    },
  },
)(({ theme }) => ({
  '&.modalMainContainer': {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    height: 'auto',
    maxHeight: '95%',
    maxWidth: 1220,
    left: 0,
    right: 0,
    borderColor:
      theme.palette.mode === ThemeMode.dark
        ? (theme as ITheme).colorTheme.dark.lightSecondary
        : (theme as ITheme).colorTheme.light.darkSecondary,
    border: '2px solid',
    borderRadius: 10,
    boxShadow:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.light.shadow
        : (theme as ITheme).colorTheme.dark.shadow,
    backgroundColor:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.light.primary
        : (theme as ITheme).colorTheme.dark.primary,
    overflow: 'auto',
    padding: (theme as ITheme).device === 'mobile' ? 5 : 20,
    paddingTop: 10,
  },
  '&.modalMainContainerMH8': {
    minWidth: 320,
  },
}))

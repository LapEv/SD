import { forwardRef } from 'react'
import Box, { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { ITheme, ThemeMode } from 'themes/themeConfig'

export const BoxModal = styled(
  forwardRef((props: BoxProps, ref) => <Box {...props} ref={ref} />),
  {
    name: 'BoxModal',
    overridesResolver: (props, styles) => {
      return [styles.root]
    },
  },
)(({ theme }) => ({
  '&.modalMainContainer': {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    top: '50%',
    left: '50%',
    height: 'auto',
    maxHeight: '95%',
    minWidth: 320,
    maxWidth: 520,
    transform: 'translate(-50%, -50%)',
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
    padding: '32px',
    paddingLeft:
      (theme as ITheme).device === 'mobile'
        ? '10px!important'
        : '25px!important',
    paddingRight:
      (theme as ITheme).device === 'mobile'
        ? '10px!important'
        : '25px!important',
    overflowY: 'auto',
    overflowX: 'hidden',
    backgroundColor:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.light.primary
        : (theme as ITheme).colorTheme.dark.primary,
  },
  '&.modalMainContainerMH8': {
    minWidth: 320,
  },
}))

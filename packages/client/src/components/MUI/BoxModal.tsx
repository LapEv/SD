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
    width: '35%',
    top: '50%',
    left: '50%',
    height: 'auto',
    maxHeight: '95%',
    minWidth: 520,
    transform: 'translate(-50%, -50%)',
    borderColor: theme.palette.mode === ThemeMode.dark ? '#FFF' : '#000',
    border: '2px solid',
    borderRadius: 10,
    boxShadow:
      theme.palette.mode === ThemeMode.light
        ? `0px 0px 13px 5px rgba(0, 0, 0, 0.5)`
        : `0px 0px 13px 5px rgba(255, 255, 255, 0.5)`,
    padding: '32px',
    overflowY: 'auto',
    overflowX: 'hidden',
    backgroundColor:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.colorLight
        : (theme as ITheme).colorTheme.colorDark,
  },
  '&.modalMainContainerMH8': {
    minWidth: 560,
  },
}))

import { memo, useEffect, useRef, useState } from 'react'
import { styled, Theme, CSSObject } from '@mui/material/styles'
import { Box, Divider, Drawer as MuiDrawer, useTheme } from '@mui/material'
import { NavBar } from './navBar'
import { SideBar } from './sideBar'
import { drawerWidth, compressedWidth } from './drawerBarData'
import { DrawerHeader } from './drawerHeader'
import { Outlet } from 'react-router-dom'
import { useAuth } from 'hooks/auth/useAuth'
import { useApp } from 'hooks/app/useApp'
import { ITheme } from 'themes/themeConfig'

const openedMixin = (theme: Theme): CSSObject => ({
  width: (theme as ITheme).fontSize === 'small' ? compressedWidth : drawerWidth,
  backgroundColor: theme.palette.background.paper,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.complex,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  backgroundColor: theme.palette.background.paper,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.complex,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(9)}${(theme as ITheme).fontSize !== 'small' ? ' - 10' : ' + 10'}px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(10)}${(theme as ITheme).fontSize !== 'small' ? ' - 10' : ' + 10'}px)`,
  },
})

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  width: (theme as ITheme).fontSize === 'small' ? compressedWidth : drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

export const MainLayout = memo(() => {
  const boxRef = useRef<HTMLDivElement>(null)
  const [, { setDataWidth }] = useApp()
  const theme = useTheme()
  const [open, setOpen] = useState<boolean>(true)
  const adaptiveDrawerWidth =
    (theme as ITheme).fontSize === 'small' ? compressedWidth : drawerWidth
  const [width, setWidth] = useState<string>(
    `calc(100% - ${adaptiveDrawerWidth}px)`,
  )
  const toggleDrawer = (check: boolean) => {
    setOpen(prev => !prev)
    const widthCheck = check
      ? `calc(100% - ${adaptiveDrawerWidth}px)`
      : `calc(100% - ${theme.spacing(9)} - ${(theme as ITheme).fontSize === 'large' ? '6px' : '14px'})`
    setWidth(widthCheck)
    setTimeout(() => {
      setDataWidth(boxRef?.current?.clientWidth as number)
    }, 1000)
  }
  const [{ user }] = useAuth()

  useEffect(() => {
    setWidth(`calc(100% - ${adaptiveDrawerWidth}px)`)
    setTimeout(() => {
      setDataWidth(boxRef?.current?.offsetWidth as number)
    }, 1000)
  }, [(theme as ITheme).fontSize])

  return (
    <>
      {user && user.status ? (
        <Box sx={{ display: 'flex', width: '100%' }}>
          <NavBar />
          <Drawer sx={{ display: 'flex' }} variant="permanent" open={open}>
            <DrawerHeader open={open} toggleDrawer={toggleDrawer} />
            <Divider />
            <SideBar open={open} />
          </Drawer>
          <Box
            ref={boxRef}
            sx={{
              backgroundColor: theme.palette.background.paper,
              width,
              minHeight: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              p: 0,
            }}>
            <Outlet />
          </Box>
        </Box>
      ) : (
        <Box
          ref={boxRef}
          sx={{
            display: 'flex',
            width: '100%',
            height: '100vH',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Outlet />
        </Box>
      )}
    </>
  )
})

import { styled, Theme, CSSObject } from '@mui/material/styles'
import { Divider, useTheme, Drawer as MuiDrawer } from '@mui/material'
import { MuiDiv } from 'components/MUI'
import { useApp } from 'hooks/app/useApp'
import { useEffect, useState } from 'react'
import { ITheme, ThemeMode } from 'themes/themeConfig'
import { compressedWidth, drawerWidth } from 'layouts/Main/drawerBarData'
import { DrawerHeader } from 'layouts/Main/Components/MainContainer/Desktop/drawerHeader'
import { SideBar } from 'layouts/Main/Components/MainContainer/Desktop/sideBar'
import { Outlet } from 'react-router-dom'
import { Nav } from './Mobile/Nav'

interface IMainContainer {
  boxRef: React.RefObject<HTMLDivElement | null>
}

export const MainContainer = ({ boxRef }: IMainContainer) => {
  const [{ device }, { setDevice, setDataWidth }] = useApp()
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

  const openedMixin = (theme: Theme): CSSObject => ({
    width:
      (theme as ITheme).fontSize === 'small' ? compressedWidth : drawerWidth,
    backgroundColor:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.light.primary
        : (theme as ITheme).colorTheme.dark.primary,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.complex,
    }),
    overflowX: 'hidden',
  })

  const closedMixin = (theme: Theme): CSSObject => ({
    backgroundColor:
      theme.palette.mode === ThemeMode.light
        ? (theme as ITheme).colorTheme.light.primary
        : (theme as ITheme).colorTheme.dark.primary,
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
    width:
      (theme as ITheme).fontSize === 'small' ? compressedWidth : drawerWidth,
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

  useEffect(() => {
    setWidth(`calc(100% - ${adaptiveDrawerWidth}px)`)
    setTimeout(() => {
      setDataWidth(boxRef?.current?.offsetWidth as number)
    }, 1000)
  }, [(theme as ITheme).fontSize])

  useEffect(() => {
    const handleResize = () => {
      const { breakpoints } = theme

      if (window.innerWidth < breakpoints.values.xs) {
        setDevice('mobile')
      } else if (window.innerWidth < breakpoints.values.sm) {
        setDevice('mobile')
      } else if (window.innerWidth < breakpoints.values.md) {
        setDevice('desktop')
      } else if (window.innerWidth < breakpoints.values.lg) {
        setDevice('desktop')
      } else {
        setDevice('desktop')
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [theme as ITheme])

  return (
    <>
      {device === 'desktop' ? (
        <MuiDiv className="dflex_w100">
          <Drawer sx={{ display: 'flex' }} variant="permanent" open={open}>
            <DrawerHeader
              open={open}
              toggleDrawer={toggleDrawer}
              theme={theme as ITheme}
            />
            <Divider />
            <SideBar open={open} />
          </Drawer>
          <MuiDiv ref={boxRef} className="mainContainerOpen" sx={{ width }}>
            <Outlet />
          </MuiDiv>
        </MuiDiv>
      ) : (
        <MuiDiv ref={boxRef} className="mainContainerClose">
          <Nav />
          <Outlet />
        </MuiDiv>
      )}
    </>
  )
}

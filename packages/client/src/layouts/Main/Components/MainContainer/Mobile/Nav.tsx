import { useState } from 'react'
import { Stack, Button, Drawer, Box, Divider, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { DataItems } from '../../SideBar/DataItems'
import { useAuth } from 'hooks/auth/useAuth'
import { MuiDiv } from 'components/MUI'
import { LinkButton } from 'components/LinkButton'
import { Routes } from 'utils/routes'

export const Nav = () => {
  const [{ user }, { signout }] = useAuth()
  const [open, setOpen] = useState(false)
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  return (
    <>
      <Button
        variant="text"
        onClick={toggleDrawer(true)}
        className="mobileButtonMenu">
        <MenuIcon />
      </Button>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        anchor="left"
        className="mobileMainMenu">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: 1,
            pr: 0,
          }}>
          <Typography
            sx={{
              mt: open ? 1 : 0,
              height: 30,
              ml: 1.5,
              display: open ? 'flex' : 'none',
            }}>
            {user ? user.shortName : ''}
          </Typography>
          <Button onClick={toggleDrawer(false)}>
            <CloseIcon />
          </Button>
        </Box>
        <Divider />
        <Stack
          overflow="auto"
          direction={{ xs: 'column', sm: 'row' }}
          gap={1.4}
          width={{ xs: '100%', sm: 'initial' }}
          textAlign={{ xs: 'center', sm: 'initial' }}
          fontSize={{ xs: '22px', sm: 'initial' }}>
          <DataItems
            user={user}
            open={open}
            closeMobileMenu={toggleDrawer(false)}
          />
        </Stack>
        <MuiDiv className="sideBarUserAuth">
          <LinkButton
            onClick={() => user && signout()}
            sx={{ width: '90%', mt: 5, display: open ? 'flex' : 'none' }}
            to={`/${Routes.Login}`}>
            {user ? 'Выйти' : 'Войти'}
          </LinkButton>
        </MuiDiv>
      </Drawer>
      <Stack
        overflow="auto"
        direction={{ xs: 'column', sm: 'row' }}
        gap={1.4}
        width={{ xs: '100%', sm: 'initial' }}
        textAlign={{ xs: 'center', sm: 'initial' }}
        fontSize={{ xs: '22px', sm: 'initial' }}
        sx={{
          display: { xs: 'none', sm: 'inherit' },
        }}>
        <DataItems
          user={user}
          open={open}
          closeMobileMenu={toggleDrawer(false)}
        />
      </Stack>
    </>
  )
}

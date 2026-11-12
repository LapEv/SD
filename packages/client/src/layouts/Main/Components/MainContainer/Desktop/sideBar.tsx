import { memo } from 'react'
import { List, Typography, Link, Divider } from '@mui/material'
import { Routes } from 'utils/routes'
import { useAuth } from 'hooks/auth/useAuth'
import { LinkButton } from 'components/LinkButton'
import { SideBarProps } from '../../../interfaces'
import { DataItems } from 'layouts/Main/Components/SideBar/DataItems'
import { Link as RouterLink } from 'react-router-dom'
import { MuiDiv } from 'components/MUI'
import { AvatarBar } from './AvatarBar'

export const SideBar = memo(({ open = false }: SideBarProps) => {
  const [{ user }, { signout }] = useAuth()

  return (
    <List sx={{ padding: 0 }}>
      <MuiDiv className="sideBarBox">
        {!open ? (
          <Link
            variant="h6"
            className="mainLink"
            component={RouterLink}
            to={`/`}>
            SBI
          </Link>
        ) : (
          <></>
        )}
        <MuiDiv
          className="avatarBox"
          sx={{
            width: open ? 100 : 45,
            height: open ? 100 : 45,
            mt: open ? 0 : 2,
          }}>
          <AvatarBar open={open} />
        </MuiDiv>
        <Typography
          sx={{
            mt: open ? 1 : 0,
            height: 30,
            display: open ? 'flex' : 'none',
          }}>
          {user ? user.shortName : ''}
        </Typography>
      </MuiDiv>
      <Divider />
      <MuiDiv className="sideBarListBox">
        <DataItems user={user} open={open} />
      </MuiDiv>
      <MuiDiv className="sideBarUserAuth">
        <LinkButton
          onClick={() => user && signout()}
          sx={{ width: '90%', mt: 5, display: open ? 'flex' : 'none' }}
          to={`/${Routes.Login}`}>
          {user ? 'Выйти' : 'Войти'}
        </LinkButton>
      </MuiDiv>
    </List>
  )
})

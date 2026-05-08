import { memo, useEffect } from 'react'
import { List, Typography, Link, Divider } from '@mui/material'
import { Avatar } from 'components/SVGIcons/Avatar'
import { Routes } from 'utils/routes'
import { useAuth } from 'hooks/auth/useAuth'
import { LinkButton } from 'components/LinkButton'
import { SideBarProps } from './interfaces'
import { FilesData } from 'store/slices/files/interfaces'
import { useFiles } from 'hooks/files/useFiles'
import { AvatarBox } from 'components/AvatarBox'
import { DataItems } from 'layouts/Main/Components/SideBar/DataItems'
import { Link as RouterLink } from 'react-router-dom'
import { MuiDiv } from 'components/MUI'

export const SideBar = memo(({ open = false }: SideBarProps) => {
  const [{ user, avatar }, { signout }] = useAuth()
  const [, { getAvatar }] = useFiles()

  useEffect(() => {
    if (avatar.length) return
    const file = user?.Files as FilesData[]
    if (!file.length) return
    const pathfile = file[0].path
    getAvatar(pathfile)
  }, [])

  return (
    <List sx={{ padding: 0 }}>
      <MuiDiv className="sideBarBox">
        {!open ? (
          <Link
            variant="h6"
            sx={{ color: 'black' }}
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
          {avatar.length ? (
            <AvatarBox
              src={`${avatar.length ? JSON.parse(avatar).data : ''}` as string}
              sx={{
                width: open ? 100 : 45,
                height: open ? 100 : 45,
                borderRadius: 50,
              }}
            />
          ) : (
            <Avatar
              sx={{ width: open ? 70 : 35, height: open ? 100 : 45 }}
              open={open}
            />
          )}
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

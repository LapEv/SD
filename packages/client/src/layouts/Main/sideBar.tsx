import { memo, useEffect } from 'react'
import { Box, List, Typography, useTheme } from '@mui/material'
import { Avatar } from 'layouts/Main/icons/Avatar'
import { Routes } from 'utils/routes'
import { useAuth } from 'hooks/auth/useAuth'
import { LinkButton } from 'components/LinkButton'
import { SideBarProps } from './interfaces'
import { Files } from 'store/slices/files/interfaces'
import { useFiles } from 'hooks/files/useFiles'
import { AvatarBox } from 'components/AvatarBox'
import { DataItems } from 'layouts/Main/Components/SideBar/DataItems'
import { ITheme, ThemeMode } from 'themes/themeConfig'

export const SideBar = memo(({ open = false }: SideBarProps) => {
  const [{ user, avatar }, { signout }] = useAuth()
  const [, { getAvatar }] = useFiles()
  const theme = useTheme() as ITheme

  useEffect(() => {
    if (avatar.length) return
    const file = user?.Files as Files[]
    if (!file.length) return
    const pathfile = file[0].path
    getAvatar(pathfile)
  }, [])

  return (
    <List>
      <Box
        sx={{
          width: '100%',
          height: 150,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          mt: 2,
        }}>
        {!open ? <Typography variant="h6">SD</Typography> : <></>}

        <Box
          sx={{
            width: open ? 100 : 50,
            height: open ? 100 : 50,
            background:
              theme.palette.mode === ThemeMode.light
                ? (theme as ITheme).colorTheme.colorDark
                : (theme as ITheme).colorTheme.colorLight,
            borderRadius: '50px',
            display: open ? 'flex' : 'flex',
            justifyContent: 'center',
            alignItems: 'center',
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
        </Box>
        <Typography
          sx={{
            mt: open ? 1 : 0,
            height: 30,
            display: open ? 'flex' : 'none',
          }}>
          {user ? user.shortName : ''}
        </Typography>
      </Box>
      <Box
        component="div"
        sx={{
          mt: 3,
          height: 'auto',
        }}>
        <DataItems user={user} open={open} />
      </Box>
      <Box
        sx={{
          width: '100%',
          height: 20,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          mt: 0,
        }}>
        <LinkButton
          onClick={() => user && signout()}
          sx={{ width: '90%', mt: 5, display: open ? 'flex' : 'none' }}
          to={`/${Routes.Login}`}>
          {user ? 'Выйти' : 'Войти'}
        </LinkButton>
      </Box>
    </List>
  )
})

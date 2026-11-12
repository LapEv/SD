import { AvatarBox } from 'components/AvatarBox'
import { useAuth } from 'hooks/auth/useAuth'
import { useClients } from 'hooks/clients/useClients'
import { useFiles } from 'hooks/files/useFiles'
import { memo, useEffect } from 'react'
import { FilesData } from 'store/slices/files/interfaces'
import { useTheme } from '@mui/material'
import { ITheme, ThemeMode } from 'themes/themeConfig'

export const AvatarBar = memo(() => {
  const [{ user, avatar }] = useAuth()
  const [, { getAvatar, getAvatarByClientId }] = useFiles()
  const [{ avatarClient }] = useClients()
  const theme = useTheme() as ITheme

  if (user.status === 'client') {
    useEffect(() => {
      if (avatarClient && avatarClient.length) return
      getAvatarByClientId(user.id as string)
    }, [])

    if (avatarClient && avatarClient.length) {
      return (
        <AvatarBox
          src={
            `${avatarClient.length ? JSON.parse(avatarClient).data : ''}` as string
          }
          sx={{
            width: 40,
            height: 40,
            borderRadius: 50,
          }}
        />
      )
    }

    return (
      <AvatarBox
        sx={{
          width: 40,
          height: 40,
          borderRadius: 50,
          bgcolor:
            theme.palette.mode === ThemeMode.light
              ? (theme as ITheme).colorTheme.light.darkPrimary
              : (theme as ITheme).colorTheme.dark.lightPrimary,
        }}
      />
    )
  }

  if (user.status === 'employee') {
    useEffect(() => {
      if (avatar.length) return
      const file = (user?.Files as FilesData[]) ?? []
      if (!file.length) return
      const pathfile = file[0].path
      getAvatar(pathfile)
    }, [])

    if (avatar && avatar.length) {
      return (
        <AvatarBox
          src={`${avatar.length ? JSON.parse(avatar).data : ''}` as string}
          sx={{
            width: 40,
            height: 40,
            borderRadius: 50,
          }}
        />
      )
    }
    return (
      <AvatarBox
        sx={{
          width: 40,
          height: 40,
          borderRadius: 50,
          bgcolor:
            theme.palette.mode === ThemeMode.light
              ? (theme as ITheme).colorTheme.light.darkPrimary
              : (theme as ITheme).colorTheme.dark.lightPrimary,
        }}
      />
    )
  }

  return (
    <AvatarBox
      sx={{
        width: 40,
        height: 40,
        borderRadius: 50,
        bgcolor:
          theme.palette.mode === ThemeMode.light
            ? (theme as ITheme).colorTheme.light.darkPrimary
            : (theme as ITheme).colorTheme.dark.lightPrimary,
      }}
    />
  )
})

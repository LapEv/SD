import { AvatarBox } from 'components/AvatarBox'
import { useAuth } from 'hooks/auth/useAuth'
import { useClients } from 'hooks/clients/useClients'
import { useFiles } from 'hooks/files/useFiles'
import { memo, useEffect } from 'react'
import { FilesData } from 'store/slices/files/interfaces'
import { Avatar } from 'components/SVGIcons/Avatar'
import { SideBarProps } from 'layouts/Main/interfaces'
import { AvatarClient } from 'components/SVGIcons/AvatarClient'

export const AvatarBar = memo(({ open }: SideBarProps) => {
  const [{ user, avatar }] = useAuth()
  const [, { getAvatar, getAvatarByClientId }] = useFiles()
  const [{ avatarClient }] = useClients()

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
            width: open ? 100 : 45,
            height: open ? 100 : 45,
            borderRadius: 50,
          }}
        />
      )
    }

    return (
      <AvatarClient
        sx={{ width: open ? 70 : 35, height: open ? 100 : 45 }}
        open={open}
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
            width: open ? 100 : 45,
            height: open ? 100 : 45,
            borderRadius: 50,
          }}
        />
      )
    }
    return (
      <Avatar
        sx={{ width: open ? 70 : 35, height: open ? 100 : 45 }}
        open={open}
      />
    )
  }

  return (
    <Avatar
      sx={{ width: open ? 70 : 35, height: open ? 100 : 45 }}
      open={open}
    />
  )
})

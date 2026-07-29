import { useState, memo, useEffect } from 'react'
import { Box, ListItemText, ListItemButton } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { User } from 'storeAuth/interfaces'
import { RotateButton } from 'components/Buttons'
import { ProfileData } from './'
import { useAuth } from 'hooks/auth/useAuth'
import { MuiDiv } from 'components/MUI'
import { useFiles } from 'hooks/files/useFiles'

export const ListUsers = memo((user: User) => {
  const [
    { activeUserInfo },
    { getUserInfo, clearUserInfo, setActiveUserInfo, clearAvatar },
  ] = useAuth()
  const [, { getAvatarListUser }] = useFiles()
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    if (!open) {
      setActiveUserInfo(user.id as string)
    }

    setOpen(!open)
    clearUserInfo()
    getUserInfo(user.id as string)
    clearAvatar()
    getAvatarListUser(user.id_avatarFiles as string)
  }

  useEffect(() => {
    if (activeUserInfo !== user.id) {
      setOpen(false)
    }
  }, [activeUserInfo])

  return (
    <Box>
      <ListItemButton
        divider={open}
        className={'itemButtonCollapse'}
        onClick={handleClick}>
        <MuiDiv className="textUsers">
          <ListItemText
            primary={`${user.lastName} ${user.firstName} ${user.middleName}`}
          />
          <ListItemText primary={`${user.post}`} sx={{ ml: 1.5 }} />
        </MuiDiv>
        <RotateButton open={open} handleClick={handleClick} />
      </ListItemButton>
      <Collapse
        className="collapseList_UserData"
        in={open}
        timeout="auto"
        unmountOnExit>
        <ProfileData {...user} />
      </Collapse>
    </Box>
  )
})

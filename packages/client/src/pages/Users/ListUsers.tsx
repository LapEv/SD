import { useState, memo, useEffect } from 'react'
import { Box, ListItemText, ListItemButton } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { User } from 'storeAuth/interfaces'
import { RotateButton } from 'components/Buttons'
import { ProfileData } from './'
import { useAuth } from 'hooks/auth/useAuth'
import { listItemButton } from 'static/styles/listItemButton'

export const ListUsers = memo((user: User) => {
  const [{ activeUserInfo }, { getUserInfo, setActiveUserInfo }] = useAuth()
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    if (!open) {
      setActiveUserInfo(user.id as string)
    }

    setOpen(!open)
    getUserInfo(user.id as string)
  }

  useEffect(() => {
    if (activeUserInfo !== user.id) {
      setOpen(false)
    }
  }, [activeUserInfo])

  return (
    <Box>
      <ListItemButton divider={open} sx={listItemButton} onClick={handleClick}>
        <Box>
          <ListItemText
            primary={`${user.lastName} ${user.firstName} ${user.middleName}`}
            sx={{ ml: 8 }}
          />
          <ListItemText primary={`${user.post}`} sx={{ ml: 10 }} />
        </Box>
        <RotateButton open={open} handleClick={handleClick} />
      </ListItemButton>
      <Collapse
        sx={{ width: '90%', mt: 4, ml: 10, height: 'auto' }}
        in={open}
        timeout="auto"
        unmountOnExit>
        <ProfileData {...user} />
      </Collapse>
    </Box>
  )
})

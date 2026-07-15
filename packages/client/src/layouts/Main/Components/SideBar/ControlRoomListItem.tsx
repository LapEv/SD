import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { NanListItemProps } from 'layouts/Main/interfaces'

export const ControlRoomListItem = memo(
  ({ icon, text, to, isExpanded, closeMobileMenu }: NanListItemProps) => {
    const [openControl, setOpenControl] = useState<boolean>(false)

    const click = () => {
      setOpenControl(!openControl)
      closeMobileMenu()
    }

    return (
      <Box sx={{ display: 'block', ml: isExpanded ? 2 : 1 }}>
        <ListItemButton
          sx={{
            minHeight: 24,
            justifyContent: isExpanded ? 'initial' : 'center',
          }}
          component={Link}
          to={to}
          onClick={click}>
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: isExpanded ? 3 : 'auto',
              justifyContent: 'center',
            }}>
            {icon}
          </ListItemIcon>
          <ListItemText
            primary={isExpanded ? text : ''}
            className="controlRoomlistText"
          />
        </ListItemButton>
      </Box>
    )
  },
)

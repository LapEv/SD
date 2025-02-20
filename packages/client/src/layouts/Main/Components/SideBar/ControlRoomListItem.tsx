import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material'
import { controlRoomCustomFilter } from 'layouts/Main/drawerBarData'
import { RotateButton } from 'components/Buttons'
import { NanListItemProps } from 'layouts/Main/interfaces'
import { ControlRoomCustomFilterList } from 'layouts/Main/Components/SideBar/ControlRoomCustomFilterList'

export const ControlRoomListItem = memo(
  ({ icon, text, to, isExpanded }: NanListItemProps) => {
    const [openControl, setOpenControl] = useState<boolean>(false)
    return (
      <Box sx={{ display: 'block', ml: 2 }}>
        <ListItemButton
          sx={{
            minHeight: 24,
            justifyContent: isExpanded ? 'initial' : 'center',
          }}
          component={Link}
          to={to}
          onClick={() => setOpenControl(!openControl)}>
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: isExpanded ? 3 : 'auto',
              justifyContent: 'center',
            }}>
            {icon}
          </ListItemIcon>
          <ListItemText
            primary={text}
            sx={{ display: isExpanded ? 'block' : 'none' }}
          />
          <RotateButton
            open={openControl}
            handleClick={() => setOpenControl(!openControl)}
          />
        </ListItemButton>
        <Collapse
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            ml: -1,
          }}
          in={openControl}
          timeout="auto"
          unmountOnExit>
          {controlRoomCustomFilter.map(value => (
            <ControlRoomCustomFilterList
              key={value.text}
              {...value}
              isExpanded={openControl}
            />
          ))}
        </Collapse>
      </Box>
    )
  },
)

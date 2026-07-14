import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
} from '@mui/material'
import { controlRoomMenuData } from 'layouts/Main/drawerBarData'
import { RotateButton } from 'components/Buttons'
import { NanListItemProps } from 'layouts/Main/interfaces'
import { ControlRoomListItem } from 'layouts/Main/Components/SideBar/ControlRoomListItem'

export const NanListItem = memo(
  ({ icon, text, to, isExpanded }: NanListItemProps) => {
    const [openControl, setOpenControl] = useState<boolean>(false)

    return (
      <>
        {text === 'Диспетчерская' ? (
          <Box sx={{ display: 'block' }}>
            <ListItemButton
              className="heightList"
              sx={{
                justifyContent: isExpanded ? 'space-between' : 'center',
              }}
              onClick={() => setOpenControl(!openControl)}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isExpanded ? 3 : 'auto',
                  justifyContent: 'center',
                }}>
                {icon}
              </ListItemIcon>
              <ListItemText primary={isExpanded ? text : ''} />
              {isExpanded && (
                <RotateButton
                  sx={{ padding: '0! important' }}
                  open={openControl}
                  handleClick={() => setOpenControl(!openControl)}
                />
              )}
            </ListItemButton>
            <Collapse
              className="collapseCRoomList"
              in={openControl}
              timeout="auto"
              unmountOnExit>
              {controlRoomMenuData.map(value => (
                <ControlRoomListItem
                  key={value.text}
                  {...value}
                  isExpanded={isExpanded}
                />
              ))}
            </Collapse>
            {openControl && <Divider />}
          </Box>
        ) : (
          <ListItem disablePadding sx={{ display: 'block', mt: 0.5 }}>
            <ListItemButton
              sx={{
                justifyContent: isExpanded ? 'initial' : 'center',
              }}
              component={Link}
              to={to}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isExpanded ? 3 : 'auto',
                  justifyContent: 'center',
                }}>
                {icon}
              </ListItemIcon>
              <ListItemText primary={isExpanded ? text : ''} />
            </ListItemButton>
          </ListItem>
        )}
      </>
    )
  },
)

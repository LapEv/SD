import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  useTheme,
} from '@mui/material'
import { controlRoomMenuData } from 'layouts/Main/drawerBarData'
import { RotateButton } from 'components/Buttons'
import { ITheme } from 'themes/themeConfig'
import { NanListItemProps } from 'layouts/Main/interfaces'
import { ControlRoomListItem } from 'layouts/Main/Components/SideBar/ControlRoomListItem'

export const NanListItem = memo(
  ({ icon, text, to, isExpanded }: NanListItemProps) => {
    const [openControl, setOpenControl] = useState<boolean>(false)
    const theme = useTheme() as ITheme

    return (
      <>
        {text === 'Диспетчерская' ? (
          <Box sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                height: theme.fontSize === 'small' ? 30 : 40,
                justifyContent: isExpanded ? 'space-between' : 'center',
              }}
              onClick={() => setOpenControl(!openControl)}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isExpanded ? 3 : -2,
                  ml: isExpanded ? 0 : 2,
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
              {controlRoomMenuData.map(value => (
                <ControlRoomListItem
                  key={value.text}
                  {...value}
                  isExpanded={openControl}
                />
              ))}
            </Collapse>
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
              <ListItemText
                primary={text}
                sx={{ display: isExpanded ? 'block' : 'none' }}
              />
            </ListItemButton>
          </ListItem>
        )}
      </>
    )
  },
)

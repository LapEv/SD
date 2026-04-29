import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material'
import { NanListItemProps } from 'layouts/Main/interfaces'
import { ITheme } from 'themes/themeConfig'

export const ControlRoomListItem = memo(
  ({ icon, text, to, isExpanded }: NanListItemProps) => {
    const [openControl, setOpenControl] = useState<boolean>(false)
    const theme = useTheme() as ITheme

    return (
      <Box sx={{ display: 'block', ml: isExpanded ? 2 : 1 }}>
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
            primary={isExpanded ? text : ''}
            sx={{ minHeight: theme.fontSize === 'small' ? 18 : 25 }}
          />
        </ListItemButton>
      </Box>
    )
  },
)

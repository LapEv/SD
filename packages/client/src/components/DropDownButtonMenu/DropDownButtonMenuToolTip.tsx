import { useState, MouseEvent, memo } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import { Box, Tooltip, useTheme } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { DropDownMenuTooltipProps } from './interfaces'
import { ITheme } from 'themes/themeConfig'

export const DropDownMenuToolTip = memo(
  ({ title, data, divider, onClick, icon, sx }: DropDownMenuTooltipProps) => {
    const theme = useTheme() as ITheme
    const [anchorMenuEl, setAnchorMenuEl] = useState<null | HTMLElement>(null)
    const openMenu = Boolean(anchorMenuEl)

    const handleClick = (event: MouseEvent<HTMLElement>) => {
      setAnchorMenuEl(event.currentTarget)
    }

    const handleClose = (name: string | null) => {
      setAnchorMenuEl(null)
      onClick(name)
    }

    return (
      <>
        <Tooltip
          title={title}
          sx={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
          }}>
          <IconButton
            onClick={handleClick}
            sx={{
              m: 1,
              mt: 1.5,
              width: theme.fontSize === 'small' ? 30 : 35,
              height: theme.fontSize === 'small' ? 30 : 35,
              borderRadius: '20%',
              color: theme.palette.primary.contrastText,
              backgroundColor: theme.palette.primary.main,
              boxShadow: 5,
              ...sx,
            }}>
            {icon ?? <MenuIcon />}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorMenuEl}
          id="DropDownMenu"
          open={openMenu}
          onClose={() => handleClose(null)}
          onClick={() => handleClose(null)}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                bgcolor: theme.palette.background.paper,
                mt: theme.fontSize === 'small' ? 8 : 5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: theme.palette.background.paper,
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
          {data.map(({ name, title, icon }, index) => (
            <Box key={`${name}${index}`}>
              <MenuItem
                onClick={() => handleClose(name)}
                sx={{
                  color: theme.palette.primary.contrastText,
                  '&:hover': {
                    bgcolor: theme.palette.info.main,
                  },
                }}>
                <ListItemIcon
                  sx={{ color: theme.palette.primary.contrastText }}>
                  {icon}
                </ListItemIcon>
                {title}
              </MenuItem>
              {divider?.includes(index + 1) && <Divider />}
            </Box>
          ))}
        </Menu>
      </>
    )
  },
)

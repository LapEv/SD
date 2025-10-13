import { useState, MouseEvent, memo } from 'react'
import {
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Box,
  useTheme,
  IconButton,
  Popover,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { DropDownMenuProps } from './interfaces'
import { PopoverTypography } from 'components/Popover/PopoverTypography'
import { ITheme } from 'themes/themeConfig'

export const DropDownMenu = memo(
  ({
    popover,
    data,
    divider,
    onClick,
    vertical,
    icon,
    sx,
  }: DropDownMenuProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const open = Boolean(anchorEl)
    const [anchorMenuEl, setAnchorMenuEl] = useState<null | HTMLElement>(null)
    const openMenu = Boolean(anchorMenuEl)
    const theme = useTheme() as ITheme

    const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
    }

    const handlePopoverClose = () => {
      setAnchorEl(null)
    }

    const handleClick = (event: MouseEvent<HTMLElement>) => {
      setAnchorMenuEl(event.currentTarget)
    }

    const handleClose = (name: string | null) => {
      setAnchorMenuEl(null)
      onClick(name)
    }

    return (
      <>
        <Box
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          sx={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
          }}>
          <IconButton
            onClick={handleClick}
            sx={{
              width: theme.fontSize === 'small' ? 30 : 40,
              height: theme.fontSize === 'small' ? 30 : 40,
              borderRadius: '20%',
              color: theme.palette.primary.contrastText,
              backgroundColor: theme.palette.primary.main,
              boxShadow: 5,
              ...sx,
            }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}>
            {icon ?? <MenuIcon />}
          </IconButton>
        </Box>
        {popover.length > 0 && (
          <Popover
            sx={{
              pointerEvents: 'none',
              background: 'none',
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: vertical ?? 'center',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'right',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
            container={anchorEl}>
            <PopoverTypography text={popover} />
          </Popover>
        )}
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
                mt: 1.5,
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
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
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

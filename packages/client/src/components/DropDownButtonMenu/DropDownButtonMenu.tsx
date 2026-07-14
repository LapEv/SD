import { useState, MouseEvent, memo } from 'react'
import {
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Box,
  IconButton,
  Popover,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { DropDownMenuProps } from './interfaces'
import { PopoverTypography } from 'components/Popover/PopoverTypography'
import { MuiDiv } from 'components/MUI'

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
        <MuiDiv
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          className="boxMenuButton">
          <IconButton
            onClick={handleClick}
            className="menuIconButton"
            sx={{ ...sx }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}>
            {icon ?? <MenuIcon />}
          </IconButton>
        </MuiDiv>
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
          slotProps={{ paper: { className: 'DropDownPaperMain' } }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
          {data.map(({ name, title, icon }, index) => (
            <Box key={`${name}${index}`}>
              <MenuItem
                onClick={() => handleClose(name)}
                className="dropDownMenuItem2">
                <ListItemIcon className="dropDownMenuItem">{icon}</ListItemIcon>
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

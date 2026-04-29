import { useState, MouseEvent, memo } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import { Box, Tooltip } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { DropDownMenuTooltipProps } from './interfaces'

export const DropDownMenuToolTip = memo(
  ({
    title,
    data,
    divider,
    onClick,
    icon,
    sx,
    className,
    classNameIcon,
  }: DropDownMenuTooltipProps) => {
    const [anchorMenuEl, setAnchorMenuEl] = useState<null | HTMLElement>(null)
    const openMenu = Boolean(anchorMenuEl)

    const handleClick = (event: MouseEvent<HTMLElement>) => {
      setAnchorMenuEl(event.currentTarget)
    }

    const handleClose = (name: string | null) => {
      setAnchorMenuEl(null)
      if (name) {
        onClick(name)
      }
    }

    return (
      <>
        <Tooltip title={title} className={className}>
          <IconButton
            onClick={handleClick}
            className={className}
            sx={{ boxShadow: 5, ...sx }}>
            {icon ?? <MenuIcon className={classNameIcon} />}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorMenuEl}
          id="DropDownMenu"
          open={openMenu}
          onClose={() => handleClose(null)}
          onClick={() => handleClose(null)}
          slotProps={{ paper: { className: 'DropDownPaper' } }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
          {data.map(({ name, title, icon }, index) => (
            <Box key={`${name}${index}`}>
              <MenuItem
                className={'dropDownMenuItem'}
                onClick={() => handleClose(name)}>
                <ListItemIcon>{icon}</ListItemIcon>
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

import { memo } from 'react'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { MenuListItemProps } from './interfaces'
import { MuiDiv } from 'components/MUI'
import { Link } from 'react-router-dom'

export const MenuListItems = memo(({ icon, text, to }: MenuListItemProps) => {
  return (
    <MuiDiv className="boxElementMainPage">
      <ListItemButton className="mainPageIconButton" component={Link} to={to}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </MuiDiv>
  )
})

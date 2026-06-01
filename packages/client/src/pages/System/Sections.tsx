import { Collapse, ListItemButton, ListItemText } from '@mui/material'
import { MuiDiv } from 'components/MUI'
import { ISections } from './interfaces'
import { RotateButton } from 'components/Buttons'
import { useState } from 'react'
import { SystemData } from './SystemData'

export const Sections = ({ label, id }: ISections) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <MuiDiv className={'containerCollapse'}>
      <ListItemButton
        divider={open}
        className={'itemButtonCollapse1'}
        onClick={handleClick}>
        <ListItemText primary={label} />
        <RotateButton open={open} handleClick={handleClick} />
      </ListItemButton>
      <Collapse
        className={'collapseList'}
        in={open}
        timeout="auto"
        unmountOnExit>
        <SystemData id={id} />
      </Collapse>
    </MuiDiv>
  )
}

import { Collapse, ListItemButton, ListItemText } from '@mui/material'
import { RotateButton } from 'components/Buttons'
import { MuiDiv } from 'components/MUI'
import { memo, useState } from 'react'
import { GeneralBox } from './GeneralBox'
import { IClientsList } from 'pages/Clients/interfaces'

export const General = memo(({ clientData }: IClientsList) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <MuiDiv className={'containerCollapseMenu'}>
      <ListItemButton
        divider={open}
        className={'itemButtonCollapse1 height'}
        onClick={handleClick}>
        <ListItemText primary={'Общая информация'} />
        <RotateButton open={open} handleClick={handleClick} />
      </ListItemButton>
      <Collapse
        className={'width_100_height_auto'}
        in={open}
        timeout="auto"
        unmountOnExit>
        <GeneralBox clientData={clientData} />
      </Collapse>
    </MuiDiv>
  )
})

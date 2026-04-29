import { memo, useRef, useState } from 'react'
import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material'
import PrintIcon from '@mui/icons-material/Print'
import { printTypeData } from '../../data'
import HorizontalRuleOutlinedIcon from '@mui/icons-material/HorizontalRuleOutlined'
import { Normal } from './Normal'
import { Compressed } from './Compressed'
import { XCompressed } from './XCompressed'
import * as usePrint from 'react-to-print'
import { MuiDiv } from 'components/MUI'

export const Print = memo(() => {
  const [printMenuOpen, setPrintMenuOpen] = useState(false)
  const printMenuTriggerRef = useRef<HTMLButtonElement>(null)
  const [printType, setPrintType] = useState(printTypeData[0].value)
  const contentToPrint = useRef<HTMLDivElement>(null)

  const handlePrint = usePrint.useReactToPrint({
    contentRef: contentToPrint,
    documentTitle: 'Печать',
  })

  return (
    <>
      <Tooltip
        title={'Печать'}
        enterDelay={300}
        leaveDelay={100}
        placement="top">
        <IconButton
          ref={printMenuTriggerRef}
          aria-expanded={printMenuTriggerRef ? 'true' : undefined}
          id="print-menu-trigger"
          aria-controls="print-menu"
          aria-haspopup="true"
          className={'printIconButton'}
          onClick={() => setPrintMenuOpen(true)}>
          <PrintIcon className={'printIcon'} />
        </IconButton>
      </Tooltip>
      <Menu
        id="print-menu"
        anchorEl={printMenuTriggerRef.current}
        open={printMenuOpen}
        onClose={() => setPrintMenuOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          list: {
            'aria-labelledby': 'print-menu-trigger',
          },
        }}>
        {printTypeData.map(({ label, value }, index) => (
          <MuiDiv key={`${label}${value}`}>
            <MenuItem
              onClick={() => (
                setPrintType(value),
                setPrintMenuOpen(false),
                setTimeout(() => {
                  handlePrint()
                }, 50)
              )}>
              <ListItemIcon>
                <HorizontalRuleOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={label} />
            </MenuItem>
            {index < 2 && <Divider />}
          </MuiDiv>
        ))}
      </Menu>
      <MuiDiv className={'containerToPrint'}>
        <MuiDiv ref={contentToPrint} className={'printType'}>
          {printType === 'normal' && <Normal />}
          {printType === 'compressed' && <Compressed />}
          {printType === 'xcompressed' && <XCompressed />}
        </MuiDiv>
      </MuiDiv>
    </>
  )
})

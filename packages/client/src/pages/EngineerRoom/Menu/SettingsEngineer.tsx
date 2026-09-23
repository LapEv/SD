import {
  Collapse,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material'
import { useRef, useState } from 'react'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { timeEngineerIntervalData } from '../data'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import { TimeInterval } from './TimeInterval'
import * as XLSX from 'xlsx'
import { ISettingsEngineer } from '../interfaces'
import { prepareXLSXData } from '../Utils/prepareXLSXData'

export const SettingsEngineer = ({ filtered }: ISettingsEngineer) => {
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false)
  const settingsMenuTriggerRef = useRef<HTMLButtonElement>(null)
  const [openTimeInterval, setOpenTimeInterval] = useState<boolean>(false)

  const exportExcel = () => {
    const dataINCs = prepareXLSXData(filtered)
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.aoa_to_sheet(dataINCs)
    XLSX.utils.book_append_sheet(workbook, worksheet, 'INCs')
    XLSX.writeFile(workbook, 'incidents.xlsx')
  }

  return (
    <>
      <Tooltip title="Меню" enterDelay={300} leaveDelay={100} placement="top">
        <IconButton
          ref={settingsMenuTriggerRef}
          aria-expanded={settingsMenuTriggerRef ? 'true' : undefined}
          id="settings-menu-trigger"
          aria-controls="settings-menu"
          aria-haspopup="true"
          className={'settingsIconButton'}
          onClick={() => setSettingsMenuOpen(true)}>
          <MenuOutlinedIcon className={'settingsIcon'} />
        </IconButton>
      </Tooltip>
      <Menu
        id="settings-menu"
        anchorEl={settingsMenuTriggerRef.current}
        open={settingsMenuOpen}
        onClose={() => setSettingsMenuOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          list: {
            'aria-labelledby': 'settings-menu-trigger',
          },
        }}>
        <MenuItem onClick={exportExcel}>
          <ListItemIcon>
            <FileDownloadOutlinedIcon className={'exportExcelIcon'} />
          </ListItemIcon>
          <ListItemText className={'menuListText'}>
            Экспорт в эксель
          </ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => setOpenTimeInterval(!openTimeInterval)}>
          <ListItemText className={'menuListText'}>
            Временной интервал загрузки инцидентов
          </ListItemText>
          {openTimeInterval ? <ExpandLess /> : <ExpandMore />}
        </MenuItem>
        <Collapse in={openTimeInterval} timeout="auto" unmountOnExit>
          {timeEngineerIntervalData.map(({ label, value }) => (
            <TimeInterval
              key={`${label}${value}`}
              label={label}
              value={value}
              setSettingsMenuOpen={setSettingsMenuOpen}
            />
          ))}
        </Collapse>
      </Menu>
    </>
  )
}

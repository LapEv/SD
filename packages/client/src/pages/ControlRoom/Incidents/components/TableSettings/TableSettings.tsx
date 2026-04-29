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
import { DENISTY_OPTIONS, timeIntervalData } from '../../data'
import { useTableINC } from 'hooks/tableINC/useTableINC'
import { useRef, useState } from 'react'
import { Check, ExpandLess, ExpandMore, Settings } from '@mui/icons-material'
import { useIncidents } from 'hooks/incidents/useINC'

export const TableSettings = () => {
  const [
    { dense, showColumnBorders, showCellBorders, timeInterval },
    { setDense, setColumnBorder, setCellBorder, setTimeInterval },
  ] = useTableINC()
  const [, { getINCsByDate, getINC }] = useIncidents()
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false)
  const settingsMenuTriggerRef = useRef<HTMLButtonElement>(null)
  const [openTimeInterval, setOpenTimeInterval] = useState<boolean>(false)

  const checkTimeIntervalINCs = (count: number) => {
    setTimeInterval(count)
    const currentDate = new Date()
    const endDate = currentDate.setDate(currentDate.getDate() - count)
    if (count === 0) {
      getINC()
      return
    }
    getINCsByDate(new Date(endDate))
    setSettingsMenuOpen(false)
  }

  return (
    <>
      <Tooltip
        title="Настройки"
        enterDelay={300}
        leaveDelay={100}
        placement="top">
        <IconButton
          ref={settingsMenuTriggerRef}
          aria-expanded={settingsMenuTriggerRef ? 'true' : undefined}
          id="settings-menu-trigger"
          aria-controls="settings-menu"
          aria-haspopup="true"
          className={'settingsIconButton'}
          onClick={() => setSettingsMenuOpen(true)}>
          <Settings className={'settingsIcon'} />
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
        {DENISTY_OPTIONS.map(({ label, value }) => (
          <MenuItem
            dense={dense}
            key={label}
            onClick={() => (setDense(value), setSettingsMenuOpen(false))}>
            <ListItemIcon>
              {dense === value && <Check fontSize="small" />}
            </ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem
          onClick={() => (
            setColumnBorder(!showColumnBorders),
            setSettingsMenuOpen(false)
          )}>
          <ListItemIcon>
            {showColumnBorders && <Check fontSize="small" />}
          </ListItemIcon>
          <ListItemText>Показывать границы столбцов</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => (
            setCellBorder(!showCellBorders),
            setSettingsMenuOpen(false)
          )}>
          <ListItemIcon>
            {showCellBorders && <Check fontSize="small" />}
          </ListItemIcon>
          <ListItemText>Показывать границы ячеек</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => setOpenTimeInterval(!openTimeInterval)}>
          <ListItemText>Временной интервал загрузки инцидентов</ListItemText>
          {openTimeInterval ? <ExpandLess /> : <ExpandMore />}
        </MenuItem>
        <Collapse in={openTimeInterval} timeout="auto" unmountOnExit>
          {timeIntervalData.map(({ label, value }) => (
            <MenuItem
              key={`${label}${value}`}
              sx={{ pl: 4 }}
              onClick={() => (
                checkTimeIntervalINCs(value),
                setSettingsMenuOpen(false)
              )}>
              <ListItemIcon>
                {timeInterval === value && <Check fontSize="small" />}
              </ListItemIcon>
              <ListItemText primary={label} />
            </MenuItem>
          ))}
        </Collapse>
      </Menu>
    </>
  )
}

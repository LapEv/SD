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
import {
  DENISTY_OPTIONS,
  notificationINCLabel,
  timeIntervalData,
} from '../../data'
import { useTableINC } from 'hooks/tableINC/useTableINC'
import { useRef, useState } from 'react'
import { Check, ExpandLess, ExpandMore, Settings } from '@mui/icons-material'
import { NotificationsINC } from './NotificationsINC'
import { TimeInterval } from './TimeInterval'

export const TableSettings = () => {
  const [
    { dense, showColumnBorders, showCellBorders },
    { setDense, setColumnBorder, setCellBorder },
  ] = useTableINC()
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false)
  const settingsMenuTriggerRef = useRef<HTMLButtonElement>(null)
  const [openTimeInterval, setOpenTimeInterval] = useState<boolean>(false)
  const [openNotification, setOpenNotification] = useState<boolean>(false)

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
            <TimeInterval
              key={`${label}${value}`}
              label={label}
              value={value}
              setSettingsMenuOpen={setSettingsMenuOpen}
            />
          ))}
        </Collapse>
        <Divider />
        <MenuItem onClick={() => setOpenNotification(!openNotification)}>
          <ListItemText>Уведомления о новых событиях</ListItemText>
          {openNotification ? <ExpandLess /> : <ExpandMore />}
        </MenuItem>
        <Collapse in={openNotification} timeout="auto" unmountOnExit>
          {notificationINCLabel.map(({ label, name }) => (
            <NotificationsINC
              key={`${label}${name}`}
              label={label}
              name={name}
              setSettingsMenuOpen={setSettingsMenuOpen}
            />
          ))}
        </Collapse>
      </Menu>
    </>
  )
}

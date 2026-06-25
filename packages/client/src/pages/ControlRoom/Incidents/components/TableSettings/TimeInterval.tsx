import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { ITimeIntervalComponent } from '../../interfaces'
import { useTableINC } from 'hooks/tableINC/useTableINC'
import { useIncidents } from 'hooks/incidents/useINC'
import { Check } from '@mui/icons-material'

export const TimeInterval = ({
  label,
  value,
  setSettingsMenuOpen,
}: ITimeIntervalComponent) => {
  const [{ timeInterval }, { setTimeInterval }] = useTableINC()
  const [, { getINCsByDate, getINC }] = useIncidents()

  const checkTimeIntervalINCs = () => {
    setTimeInterval(value)
    const currentDate = new Date()
    const endDate = currentDate.setDate(currentDate.getDate() - value)
    if (value === 0) {
      getINC()
      return
    }
    getINCsByDate(new Date(endDate))
    setSettingsMenuOpen(false)
  }

  return (
    <MenuItem sx={{ pl: 4 }} onClick={checkTimeIntervalINCs}>
      <ListItemIcon>
        {timeInterval === value && <Check fontSize="small" />}
      </ListItemIcon>
      <ListItemText primary={label} />
    </MenuItem>
  )
}

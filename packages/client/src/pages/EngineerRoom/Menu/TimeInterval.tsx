import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { Check } from '@mui/icons-material'
import { ITimeIntervalEngineerComponent } from '../interfaces'
import { useEngineer } from 'hooks/engineer/useEngineer'
import { useAuth } from 'hooks/auth/useAuth'

export const TimeInterval = ({
  label,
  value,
  setSettingsMenuOpen,
}: ITimeIntervalEngineerComponent) => {
  const [{ timeInterval }, { setTimeInterval, getINCsByFieldEngineer }] =
    useEngineer()
  const [{ user }] = useAuth()

  const checkTimeIntervalINCs = () => {
    setTimeInterval(value)
    const currentDate = new Date()
    const endDate = currentDate.setDate(currentDate.getDate() - value)
    getINCsByFieldEngineer({
      id: user.id as string,
      endDate: new Date(endDate),
    })
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

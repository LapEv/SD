import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { useTableINC } from 'hooks/tableINC/useTableINC'
import { Check } from '@mui/icons-material'
import { INotificationComponent } from '../../interfaces'

export const NotificationsINC = ({
  label,
  name,
  setSettingsMenuOpen,
}: INotificationComponent) => {
  const [{ notificationsINC }, { setNotificationsINC }] = useTableINC()

  const changeNotificationINCData = () => {
    const newNotificationsINC = { ...notificationsINC, [name]: !value }
    setNotificationsINC(newNotificationsINC)
    setSettingsMenuOpen(false)
  }

  const value = notificationsINC[name as keyof typeof notificationsINC]
  return (
    <MenuItem sx={{ pl: 4 }} onClick={changeNotificationINCData}>
      <ListItemIcon>{value && <Check fontSize="small" />}</ListItemIcon>
      <ListItemText primary={label} />
    </MenuItem>
  )
}

import { IconButton, Tooltip } from '@mui/material'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined'
import { useTableINC } from 'hooks/tableINC/useTableINC'

export const NewIncidentBar = () => {
  const [, { setModal }] = useTableINC()

  const newIncident = () => {
    setModal({ active: true, image: 'newIncident' })
  }

  return (
    <Tooltip
      title="Новый инцидент"
      enterDelay={300}
      leaveDelay={100}
      placement="top">
      <IconButton
        id="newIncident-menu-trigger"
        aria-haspopup="true"
        className={'newIncidentIconButton'}
        sx={{ m: 0.5 }}
        onClick={newIncident}>
        <AddCircleOutlinedIcon className={'newIncidentIcon'} />
      </IconButton>
    </Tooltip>
  )
}

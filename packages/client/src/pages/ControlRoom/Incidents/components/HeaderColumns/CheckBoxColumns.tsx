import { Checkbox, Divider, TableCell } from '@mui/material'
import { useIncidents } from 'hooks/incidents/useINC'
import { useTableINC } from 'hooks/tableINC/useTableINC'

export const CheckBoxColumns = () => {
  const [{ selected }, { setSelected }] = useTableINC()
  const [{ incidents }] = useIncidents()

  const onSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = incidents.map(n => n.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  return (
    <TableCell padding="checkbox" sx={{ overflow: 'inherit' }}>
      <Checkbox
        color="primary"
        indeterminate={
          selected.length > 0 && selected.length < incidents.length
        }
        checked={incidents.length > 0 && selected.length === incidents.length}
        onChange={onSelectAllClick}
        size="small"
      />
      <Divider
        orientation="vertical"
        sx={{
          position: 'absolute',
          backgroundColor: 'black',
          right: -1,
          top: '10%',
          height: '80%',
          width: 2,
        }}
      />
    </TableCell>
  )
}

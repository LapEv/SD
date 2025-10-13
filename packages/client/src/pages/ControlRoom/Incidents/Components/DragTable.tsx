import { memo } from 'react'
import { FormControlLabel, Switch, Tooltip } from '@mui/material'
import { IDragTable } from './interfaces'

export const DragTable = memo(({ dragTable, setDragTable }: IDragTable) => {
  return (
    <Tooltip title={'Перемещать столбцы'}>
      <FormControlLabel
        control={
          <Switch
            checked={dragTable}
            onChange={event => setDragTable(event.target.checked)}
            value="dragTable"
            color="primary"
          />
        }
        label="Столбцы"
      />
    </Tooltip>
  )
})

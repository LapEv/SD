import { memo } from 'react'
import IconButton from '@mui/material/IconButton'
import SaveIcon from '@mui/icons-material/Save'
import { ISaveButton } from './interfaces'

export const SaveButton = memo(({ handleClick }: ISaveButton) => {
  return (
    <IconButton onClick={handleClick}>
      <SaveIcon />
    </IconButton>
  )
})

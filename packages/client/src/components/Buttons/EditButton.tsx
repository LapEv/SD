import { memo } from 'react'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import { IEditButton } from './interfaces'

export const EditButton = memo(({ handleClick, size }: IEditButton) => {
  return (
    <IconButton onClick={handleClick}>
      <EditIcon sx={{ fontSize: size }} />
    </IconButton>
  )
})

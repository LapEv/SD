import { memo } from 'react'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { IDeleteButton } from './interfaces'

export const DeleteButton = memo(({ handleClick }: IDeleteButton) => {
  return (
    <IconButton onClick={handleClick}>
      <DeleteIcon />
    </IconButton>
  )
})

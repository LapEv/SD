import { memo } from 'react'
import { ICustomCell } from './interfaces'
import { Box } from '@mui/material'
import { customCell, statusSLATitles } from '../data'

export const StatusSLACell = memo(({ value }: ICustomCell) => {
  const statusSLA = value ? statusSLATitles.yes : statusSLATitles.no
  return <Box sx={{ ...customCell }}>{statusSLA}</Box>
})

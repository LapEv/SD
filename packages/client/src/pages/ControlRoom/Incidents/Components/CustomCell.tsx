import { memo } from 'react'
import { Box } from '@mui/material'
import { customCell } from '../data'
import { ICustomCell } from './interfaces'

export const CustomCell = memo(({ value }: ICustomCell) => {
  return <Box sx={{ ...customCell }}>{value}</Box>
})

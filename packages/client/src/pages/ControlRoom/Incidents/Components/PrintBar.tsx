import { memo } from 'react'
import { IconButton, Tooltip, useTheme } from '@mui/material'
import PrintIcon from '@mui/icons-material/Print'
import { PrintData } from './interfaces'

export const PrintBar = memo(({ onPrint }: PrintData) => {
  const theme = useTheme()

  return (
    <Tooltip title={'Печать'}>
      <IconButton
        onClick={onPrint}
        sx={{
          color: theme.palette.primary.contrastText,
          '&:hover': {
            color: theme.palette.secondary.light,
          },
        }}>
        <PrintIcon />
      </IconButton>
    </Tooltip>
  )
})

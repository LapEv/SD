import { Box } from '@mui/material'
import { Button } from 'components/Buttons'
import { memo } from 'react'
import { HandleSection } from './interfaces'

const props = {
  display: 'flex',
  justifyContent: 'space-around',
  width: '85%',
  mt: 2,
  mb: 2,
}

export const ButtonsSection = memo(
  ({
    btnSecondHandle,
    btnName,
    btnSecondName,
    btnDisabled,
    btnSecondDisabled,
    onClick,
    sx,
  }: HandleSection) => {
    return (
      <Box sx={{ ...props, ...sx }}>
        <Button
          type="submit"
          onClick={onClick}
          sx={{ width: '40%', fontWeight: 'bold' }}
          disabled={btnDisabled ?? true}>
          {btnName ?? 'Изменить'}
        </Button>
        <Button
          sx={{ width: '40%', fontWeight: 'bold' }}
          onClick={btnSecondHandle}
          disabled={btnSecondDisabled ?? true}>
          {btnSecondName ?? ''}
        </Button>
      </Box>
    )
  },
)

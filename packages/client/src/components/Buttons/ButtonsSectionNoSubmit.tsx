import { Box } from '@mui/material'
import { Button } from 'components/Buttons'
import { memo } from 'react'
import { HandleNoSubmit } from './interfaces'

export const ButtonsSectionNoSubmit = memo(
  ({
    btnHandle,
    btnSecondHandle,
    btnName,
    btnSecondName,
    btnDisabled,
    btnSecondDisabled,
  }: HandleNoSubmit) => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '85%',
          mt: 2,
        }}>
        <Button
          onClick={btnHandle}
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
  }
)

import { Box } from '@mui/material'
import { Button } from 'components/Buttons'
import { memo } from 'react'
import { Handle } from './interfaces'

export const ButtonsModalSection = memo(({ closeModal, btnName }: Handle) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        mt: 5,
        width: '100%',
      }}>
      <Button type="submit" sx={{ width: '40%', fontWeight: 'bold' }}>
        {btnName ?? 'Изменить'}
      </Button>
      <Button
        sx={{ width: '40%', fontWeight: 'bold' }}
        onClick={() => closeModal(false)}>
        Отмена
      </Button>
    </Box>
  )
})

import { Button } from 'components/Buttons'
import { memo } from 'react'
import { Handle } from './interfaces'
import { MuiDiv } from 'components/MUI'

export const ButtonsModalSection = memo(
  ({ closeModal, btnName, sx }: Handle) => {
    return (
      <MuiDiv className="buttonsModalSection" sx={sx}>
        <Button type="submit" sx={{ width: '40%', fontWeight: 'bold' }}>
          {btnName ?? 'Изменить'}
        </Button>
        <Button
          sx={{ width: '40%', fontWeight: 'bold' }}
          onClick={() => closeModal(false)}>
          Отмена
        </Button>
      </MuiDiv>
    )
  },
)

import { Button } from 'components/Buttons'
import { memo } from 'react'
import { HandleSection } from './interfaces'
import { MuiDiv } from 'components/MUI'

export const ButtonsSection = memo(
  ({
    btnSecondHandle,
    btnName,
    btnSecondName,
    btnDisabled,
    btnSecondDisabled,
    onClick,
    sx,
    className,
  }: HandleSection) => {
    return (
      <MuiDiv className={`buttonsSectionBox ${className}`} sx={sx}>
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
      </MuiDiv>
    )
  },
)

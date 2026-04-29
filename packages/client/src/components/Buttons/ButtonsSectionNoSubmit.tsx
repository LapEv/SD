import { Button } from 'components/Buttons'
import { memo } from 'react'
import { HandleNoSubmit } from './interfaces'
import { MuiDiv } from 'components/MUI'

export const ButtonsSectionNoSubmit = memo(
  ({
    btnHandle,
    btnSecondHandle,
    btnName,
    btnSecondName,
    btnDisabled,
    btnSecondDisabled,
    containerProps,
    classContainer,
    props,
  }: HandleNoSubmit) => {
    return (
      <MuiDiv
        className={classContainer}
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '85%',
          mt: 2,
          ...containerProps,
        }}>
        <Button
          onClick={btnHandle}
          sx={{ width: '40%', fontWeight: 'bold', ...props }}
          disabled={btnDisabled ?? true}>
          {btnName ?? 'Изменить'}
        </Button>
        <Button
          sx={{ width: '40%', fontWeight: 'bold', ...props }}
          onClick={btnSecondHandle}
          disabled={btnSecondDisabled ?? true}>
          {btnSecondName ?? ''}
        </Button>
      </MuiDiv>
    )
  },
)

import { Button } from 'components/Buttons'
import { memo } from 'react'
import { IButtonsFilterINCs } from './interfaces'
import { MuiDiv } from 'components/MUI'

export const ButtonsFilterINCs = memo(
  ({ btnAddHandle, btnClearHandle, btnOkHandle }: IButtonsFilterINCs) => {
    return (
      <MuiDiv className={'buttonsContainerFilter'}>
        <Button onClick={btnAddHandle}>{'Добавить'}</Button>
        <Button onClick={btnClearHandle}>{'Удалить все'}</Button>
        <Button onClick={btnOkHandle}>{'ОК'}</Button>
      </MuiDiv>
    )
  },
)

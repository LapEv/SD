import React, { ChangeEvent, memo } from 'react'
import { ModalProps } from './interfaces'
import { useState } from 'react'
import { Typography } from '@mui/material'
import { ButtonsSectionNoSubmit } from 'components/Buttons'
import { TextField } from 'components/TextFields'
import { BoxModal, MuiDiv } from 'components/MUI'

export const DeleteUserModal = memo(
  React.forwardRef<unknown, ModalProps>(
    ({ handleModal, title, answerFromModal }: ModalProps, ref) => {
      const [reasonOfDelete, setReason] = useState<string>('')
      const [errSelectedItems, setErrSelectedItems] = useState<string>('')

      const changeData = () => {
        if (!reasonOfDelete.length) {
          setErrSelectedItems('Не указана причина удаления!')
          return
        }
        handleModal(false)
        answerFromModal(true, reasonOfDelete)
      }

      return (
        <BoxModal
          ref={ref}
          tabIndex={-1}
          className={'modalMainContainer'}
          component="form">
          <Typography variant={'h1'} sx={{ textAlign: 'center' }}>
            {title}
          </Typography>
          <MuiDiv className={'container_mt2_pl3_w100'}>
            <TextField
              label="Причина удаления"
              variant="outlined"
              required
              className={'textContainer_w90_mt2'}
              margin="normal"
              value={reasonOfDelete || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setReason(e.target.value ?? '')
              }
            />
          </MuiDiv>
          <MuiDiv className={'modalError'}>{errSelectedItems}</MuiDiv>
          <ButtonsSectionNoSubmit
            btnSecondHandle={() => handleModal(false)}
            btnHandle={changeData}
            btnName="Удалить"
            btnSecondName="Отмена"
            btnDisabled={false}
            btnSecondDisabled={false}
          />
        </BoxModal>
      )
    },
  ),
)

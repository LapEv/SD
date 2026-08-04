import React, { memo } from 'react'
import { Typography } from '@mui/material'
import { ButtonsSectionNoSubmit } from 'components/Buttons'
import { BoxModal } from 'components/MUI'
import { ModalAnswerProps } from '../../interfaces'

export const AnswerModal = memo(
  React.forwardRef<unknown, ModalAnswerProps>(
    (
      { handleModal, title, answerFromModal, type, label }: ModalAnswerProps,
      ref,
    ) => {
      const changeData = () => {
        handleModal(false)
        answerFromModal(type, label, true)
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
          <ButtonsSectionNoSubmit
            btnSecondHandle={() => handleModal(false)}
            btnHandle={changeData}
            btnName="Да"
            btnSecondName="Нет"
            btnDisabled={false}
            btnSecondDisabled={false}
          />
        </BoxModal>
      )
    },
  ),
)

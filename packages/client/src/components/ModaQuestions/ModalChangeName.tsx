import React, { useState, SyntheticEvent, memo, ChangeEvent } from 'react'
import { Typography } from '@mui/material'
import { ButtonsSection } from 'components/Buttons'
import { TextField } from 'components/TextFields'
import { IModalChangeName } from './interface'
import { BoxModal, MuiDiv } from 'components/MUI'

export const ModalChangeName = memo(
  React.forwardRef<unknown, IModalChangeName>(
    ({ handleModal, question, answer, variant }: IModalChangeName, ref) => {
      const [text, setText] = useState<string>('')

      const changeData = (event: SyntheticEvent<EventTarget>) => {
        event.preventDefault()
        handleModal(false)
        answer(true, text)
      }

      return (
        <BoxModal
          ref={ref}
          tabIndex={-1}
          component="form"
          onSubmit={changeData}>
          <Typography
            variant={variant ? variant : 'h1'}
            sx={{ textAlign: 'center' }}>
            {question}
          </Typography>
          <MuiDiv className="container_mt2_pl3_w100">
            <TextField
              label="Введите новое наименование"
              variant="outlined"
              required
              className={'textContainer_mt2'}
              margin="normal"
              value={text || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setText(e.target.value ?? '')
              }
            />
          </MuiDiv>
          <MuiDiv className={'modalError'}></MuiDiv>
          <ButtonsSection
            btnSecondHandle={() => answer(false, '')}
            btnName="Сохранить"
            btnSecondName="Отмена"
            btnDisabled={false}
            btnSecondDisabled={false}
          />
        </BoxModal>
      )
    },
  ),
)

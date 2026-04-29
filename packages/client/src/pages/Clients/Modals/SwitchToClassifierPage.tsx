import React, { memo } from 'react'
import { ChooseModalProps } from './interfaces'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import { ButtonsSection } from 'components/Buttons'
import { BoxModal } from 'components/MUI'

export const SwitchToClassifierPage = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const navigate = useNavigate()

      const changeData = () => {
        handleModal(false)
        navigate('/classifier')
      }

      return (
        <BoxModal className={'modalMainContainer'} ref={ref} tabIndex={-1}>
          <Typography variant={'h1'} sx={{ textAlign: 'center', mt: 1, mb: 2 }}>
            {title}
          </Typography>
          <ButtonsSection
            btnSecondHandle={() => handleModal(false)}
            btnName="Перейти"
            btnSecondName="Отмена"
            btnDisabled={false}
            btnSecondDisabled={false}
            onClick={changeData}
          />
        </BoxModal>
      )
    },
  ),
)

import React, { memo } from 'react'
import { ChooseModalProps } from './interfaces'
import { useNavigate } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { modalStyle } from 'static/styles'
import { ButtonsSection } from 'components/Buttons'

export const SwitchToClassifierPage = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const navigate = useNavigate()

      const changeData = () => {
        handleModal(false)
        navigate('/classifier')
      }

      return (
        <Box sx={{ ...modalStyle, paddingLeft: 5 }} ref={ref} tabIndex={-1}>
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
        </Box>
      )
    },
  ),
)

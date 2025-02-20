import React, { memo } from 'react'
import { ModalProps } from './interfaces'
import { useState } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { modalStyle } from 'static/styles'
import { ButtonsSectionNoSubmit } from 'components/Buttons'
import { TextField } from 'components/TextFields'

export const DeleteUserModal = memo(
  React.forwardRef<unknown, ModalProps>(
    ({ handleModal, title, answerFromModal }: ModalProps, ref) => {
      const [reasonOfDelete, setReason] = useState<string>('')
      const [errSelectedItems, setErrSelectedItems] = useState<string>('')
      const theme = useTheme()

      const changeData = () => {
        if (!reasonOfDelete.length) {
          setErrSelectedItems('Не указана причина удаления!')
          return
        }
        handleModal(false)
        answerFromModal(true, reasonOfDelete)
      }

      return (
        <Box
          ref={ref}
          tabIndex={-1}
          sx={{ ...modalStyle, paddingLeft: 5 }}
          component="form">
          <Typography variant={'h6'} sx={{ textAlign: 'center' }}>
            {title}
          </Typography>
          <Box
            sx={{
              mt: 2,
              width: '100%',
              pl: 3,
            }}>
            <TextField
              label="Причина удаления"
              variant="outlined"
              required
              sx={{ width: '100%', mt: 2, height: 40 }}
              margin="normal"
              value={reasonOfDelete || ''}
              onChange={e => setReason(e.target.value ?? '')}
            />
          </Box>
          <Box sx={{ color: theme.palette.error.main, height: 20 }}>
            {errSelectedItems}
          </Box>
          <ButtonsSectionNoSubmit
            btnSecondHandle={() => answerFromModal(false, reasonOfDelete)}
            btnHandle={changeData}
            btnName="Удалить"
            btnSecondName="Отмена"
            btnDisabled={false}
            btnSecondDisabled={false}
          />
        </Box>
      )
    },
  ),
)

import React, { memo } from 'react'
import { ChooseModalProps, ProfileChangePasswordValues } from './interfaces'
import { Typography } from '@mui/material'
import { ButtonsModalSection } from 'components/Buttons'
import { TextField } from 'components/TextFields'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { MapPasswordInputFields } from '../data'
import { BoxModal } from 'components/MUI'
import { useSystem } from 'hooks/system/useSystem'

export const ChangePassword = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [, { changePasswordSystem }] = useSystem()
      const { handleSubmit, control } = useForm<ProfileChangePasswordValues>({
        mode: 'onBlur',
        defaultValues: {
          list: MapPasswordInputFields,
        },
      })
      const { errors } = useFormState({ control })
      const { fields } = useFieldArray({
        control,
        name: 'list',
      })

      function changePasswordData(data: ProfileChangePasswordValues) {
        changePasswordSystem({
          oldPassword: data.list[0].value,
          newPassword: data.list[1].value,
        })
        handleModal(false)
      }

      return (
        <BoxModal
          ref={ref}
          className={'modalMainContainer'}
          component="form"
          onSubmit={handleSubmit(changePasswordData)}>
          <Typography variant={'h1'}>{title}</Typography>
          {fields.map(({ id, label, validation, type, required }, index) => {
            return (
              <Controller
                key={id}
                control={control}
                name={`list.${index}.value`}
                rules={validation}
                render={({ field }) => (
                  <TextField
                    {...field}
                    inputRef={field.ref}
                    label={label}
                    type={type}
                    variant="outlined"
                    className={'textContainer_w90_mt3'}
                    margin="normal"
                    required={required ?? true}
                    value={field.value || ''}
                    error={!!(errors?.list ?? [])[index]?.value?.message}
                    helperText={(errors?.list ?? [])[index]?.value?.message}
                  />
                )}
              />
            )
          })}
          <ButtonsModalSection
            closeModal={() => handleModal(false)}
            btnName="Сохранить"
          />
        </BoxModal>
      )
    },
  ),
)

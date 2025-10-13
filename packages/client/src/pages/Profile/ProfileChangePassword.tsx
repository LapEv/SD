import { Box, Typography } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { MapPasswordInputFields } from './ProfileFieldsData'
import { TextField } from 'components/TextFields'
import { ButtonsModalSection } from 'components/Buttons'
import {
  ProfileChangePasswordProps,
  ProfileChangePasswordValues,
} from './interfaces'
import { useAuth } from 'hooks/auth/useAuth'
import { modalStyle } from 'static/styles'
import { memo } from 'react'

export const ProfileChangePassword = memo(
  ({ handleModal, userId }: ProfileChangePasswordProps) => {
    const [, { changePassword }] = useAuth()
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
      changePassword({
        oldPassword: data.list[0].value,
        newPassword: data.list[1].value,
        id: userId,
      })
      handleModal(false)
    }

    return (
      <Box
        sx={modalStyle}
        component="form"
        onSubmit={handleSubmit(changePasswordData)}>
        <Typography variant={'h6'}>Смена пароля</Typography>
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
                  sx={{ width: '90%', m: 2, mt: 4, height: 40 }}
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
      </Box>
    )
  }
)

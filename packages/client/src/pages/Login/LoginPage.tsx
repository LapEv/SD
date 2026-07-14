import { Container, Typography } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { useAuth } from 'hooks/auth/useAuth'
import { MapLoginFields } from './LoginData'
import { Button } from 'components/Buttons'
import { TextField } from 'components/TextFields/'
import { LoginValues } from './interfaces'
import { memo } from 'react'
import { BoxModal, MuiDiv } from 'components/MUI'

export const LoginPageData = memo(() => {
  const [, { signin }] = useAuth()

  const { handleSubmit, control } = useForm<LoginValues>({
    mode: 'onBlur',
    defaultValues: {
      list: MapLoginFields,
    },
  })
  const { errors } = useFormState({ control })
  const { fields } = useFieldArray({
    control,
    name: 'list',
  })

  const submitForm = (data: LoginValues) => {
    signin({
      username: data.list[0].value,
      password: data.list[1].value,
    })
  }

  return (
    <Container component="main" maxWidth="sm">
      <MuiDiv className="loginContainer">
        <BoxModal
          className={'loginPaper'}
          component="form"
          onSubmit={handleSubmit(submitForm)}>
          <Typography sx={{ fontWeight: 700, fontSize: 32 }} color="green.64">
            Вход
          </Typography>
          {fields.map(({ id, label, validation, type }, index) => {
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
                    sx={{ width: '68%' }}
                    value={field.value || ''}
                    required
                    error={!!(errors?.list ?? [])[index]?.value?.message}
                    helperText={(errors?.list ?? [])[index]?.value?.message}
                  />
                )}
              />
            )
          })}
          <Button type="submit">Авторизация</Button>
        </BoxModal>
      </MuiDiv>
    </Container>
  )
})

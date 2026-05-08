import { Box, Stack } from '@mui/material'
import { MapProfileInputFields } from './ProfileFieldsData'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { useAuth } from 'hooks/auth/useAuth'
import { ChangeEvent, memo, useEffect } from 'react'
import { TextField } from 'components/TextFields'
import { Button } from 'components/Buttons'
import { ProfileMainProps, ProfileValues } from './interfaces'
import { ProfileAvatar, ProfileAppOptions } from '.'
import { useFiles } from 'hooks/files/useFiles'
import { FilesData } from 'store/slices/files/interfaces'
import { BoxModal } from 'components/MUI'

export const ProfileMain = memo(({ setModal, dataUser }: ProfileMainProps) => {
  const [
    { userData, avatar },
    { updateUserData, deleteAvatar, changeAvatar, setAvatar },
  ] = useAuth()
  const [, { getAvatar }] = useFiles()

  const { control } = useForm<ProfileValues>({
    mode: 'onBlur',
    defaultValues: {
      list: MapProfileInputFields.map(item => ({
        ...item,
        value: dataUser[item.name as keyof typeof dataUser],
      })),
    },
  })
  const { errors } = useFormState({ control })
  const { fields } = useFieldArray({
    control,
    name: 'list',
  })

  useEffect(() => {
    const file = userData?.Files as FilesData[]
    if (!file.length) return
    const pathfile = file[0].path
    getAvatar(pathfile)
  }, [])

  return (
    <BoxModal component="form" className={'pageProfileContainer'}>
      <ProfileAvatar
        id={dataUser.id}
        changeAvatar={changeAvatar}
        deleteAvatar={deleteAvatar}
        setAvatar={setAvatar}
        avatar={avatar.length ? JSON.parse(avatar) : ''}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'center',
          mt: 3,
          width: '95%',
        }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={0}
          sx={{ flexWrap: 'wrap' }}>
          {fields.map(({ id, name, label, validation, type }, index) => {
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
                    disabled={true}
                    sx={{ width: '48%' }}
                    margin="normal"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => (
                      field.onChange(event),
                      updateUserData({
                        ...userData,
                        ...{ [name]: event.target.value },
                      })
                    )}
                    error={!!(errors?.list ?? [])[index]?.value?.message}
                    helperText={(errors?.list ?? [])[index]?.value?.message}
                  />
                )}
              />
            )
          })}
        </Stack>
      </Box>
      <Button onClick={setModal} sx={{ width: '30%' }}>
        Изменить пароль
      </Button>
      <ProfileAppOptions />
    </BoxModal>
  )
})

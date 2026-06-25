import { Stack, Typography } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { ChangeEvent, memo, useState } from 'react'
import { TextFieldFilled } from 'components/TextFields'
import { ButtonsSection } from 'components/Buttons'
import { deepEqual } from 'utils/deepEqual'
import { chooseMapFields } from './data'
import { ISystemData } from './interfaces'
import { useSystem } from 'hooks/system/useSystem'
import { BoxModal, MuiDiv } from 'components/MUI'
import {
  IAdditionalSystem,
  IAuthSystem,
  IEmailServerSystem,
  IGeneralSystem,
  IIncidentSystem,
  ISystem,
  ISystemValues,
} from 'store/slices/system/interfaces'
import { NumberField } from 'components/TextFields/NumberField'

export const SystemData = memo(({ id }: ISystemData) => {
  const [{ system }, { setSystem }] = useSystem()
  const [btnDisabled, setbtnDisabled] = useState<boolean>(true)
  const [systemData, setSystemData] = useState<ISystem>(system)

  const fieldsData = chooseMapFields(id)
  const { handleSubmit, control, reset } = useForm<ISystemValues>({
    mode: 'onBlur',
    defaultValues: {
      list: fieldsData.map(data => {
        const obj = system[id as keyof typeof system]
        return {
          ...data,
          value: obj![data.name as keyof typeof obj],
        }
      }),
    },
  })
  const { errors } = useFormState({ control })
  const { fields } = useFieldArray({
    control,
    name: 'list',
  })

  const changeData = () => {
    setSystem(systemData)
    setbtnDisabled(true)
  }

  const checkForChange = (newData: Record<never, never>) => {
    const obj = systemData[id as keyof typeof systemData] as
      | IGeneralSystem
      | IAuthSystem
      | IAdditionalSystem
      | IEmailServerSystem
      | IIncidentSystem
    const _newData = {
      ...systemData,
      [id]: { ...obj, ...newData },
    }
    setbtnDisabled(deepEqual(_newData, system as Record<never, never>))
    setSystemData(_newData)
  }

  const clearChange = () => {
    setbtnDisabled(true)
    reset({
      list: fieldsData.map(data => {
        const obj = system[id as keyof typeof system]
        return {
          ...data,
          value: obj![data.name as keyof typeof obj],
        }
      }),
    })
  }

  return (
    <BoxModal
      component="form"
      onSubmit={handleSubmit(changeData)}
      className="systemSectionContainer">
      <Stack
        direction={{ xs: 'column', sm: 'column' }}
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{ flexWrap: 'wrap', width: '100%' }}>
        {fields.map(
          ({ id, name, label, validation, type, required }, index) => {
            return (
              <Controller
                key={id}
                control={control}
                name={`list.${index}.value`}
                rules={validation}
                render={({ field }) => (
                  <MuiDiv className="filledContainer">
                    <Typography variant={'subtitle2'}>{label}</Typography>
                    {type === 'number' ? (
                      <NumberField
                        field={field}
                        name={name}
                        type={type}
                        required={required}
                        index={index}
                        errors={errors}
                        checkForChange={checkForChange}
                      />
                    ) : (
                      <TextFieldFilled
                        {...field}
                        inputRef={field.ref}
                        type={type}
                        required={required ?? false}
                        variant="filled"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => (
                          field.onChange(event.target.value),
                          checkForChange({
                            [name]: event.target.value,
                          })
                        )}
                        error={!!(errors?.list ?? [])[index]?.value?.message}
                        helperText={(errors?.list ?? [])[index]?.value?.message}
                      />
                    )}
                  </MuiDiv>
                )}
              />
            )
          },
        )}
      </Stack>
      <ButtonsSection
        btnSecondHandle={clearChange}
        btnName="Сохранить"
        btnDisabled={btnDisabled}
        btnSecondDisabled={btnDisabled}
        btnSecondName="Отменить изменения"
        sx={{ marginTop: 5 }}
      />
    </BoxModal>
  )
})

import React, { memo } from 'react'
import { AddValuesProps, ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import { useRoles } from 'hooks/roles/useRoles'
import { ButtonsModalSection } from 'components/Buttons'
import { DropDown, emptyOptionsDD } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { TextField } from 'components/TextFields'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { MapNewRolesInputFields } from '../data'
import { BoxModal } from 'components/MUI'

export const ChangeNameRole = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ roles }, { getRoles, changeNameRole }] = useRoles()
      const [group, setGroup] = useState<Options[]>([])
      const [selectedGroup, setSelectedGroup] =
        useState<Options>(emptyOptionsDD)

      const { handleSubmit, control, reset } = useForm<AddValuesProps>({
        mode: 'onBlur',
        defaultValues: {
          list: MapNewRolesInputFields,
        },
      })
      const { errors } = useFormState({ control })
      const { fields } = useFieldArray({
        control,
        name: 'list',
      })

      const changeData = ({ list }: AddValuesProps) => {
        changeNameRole({
          id: selectedGroup.id,
          nameRole: list[0].value,
          role: list[1].value,
        })
        handleModal(false)
      }

      const changeGroup = (data: Options) => {
        setSelectedGroup(data)
        reset({
          list: MapNewRolesInputFields.map(item => ({
            ...item,
            value: item.name === 'newRoles' ? data.label : data.descriptionID,
          })),
        })
      }

      useEffect(() => {
        getRoles()
      }, [])

      useEffect(() => {
        setGroup(
          roles.map(({ id, role, nameRole }) => {
            return {
              ['label']: nameRole,
              ['id']: id,
              ['descriptionID']: role,
            }
          }),
        )
      }, [roles])

      return (
        <BoxModal
          ref={ref}
          tabIndex={-1}
          className={'modalMainContainer'}
          component="form"
          onSubmit={handleSubmit(changeData)}>
          <Typography variant={'h1'}>{title}</Typography>
          <DropDown
            data={group}
            className={'dropdown_mt4'}
            props={{ mt: 3, mb: 1 }}
            onChange={data => changeGroup(data)}
            value={selectedGroup.label}
            label="Выберите роль"
            errorLabel="Не выбрана роль!"
          />
          {fields.map(({ id, label, validation, type, required }, index) => {
            return (
              <Controller
                key={`${label}_${id}`}
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
                    required={required ?? true}
                    className="textContainer_w90_mt3"
                    margin="normal"
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
            btnName={'Изменить'}
          />
        </BoxModal>
      )
    },
  ),
)

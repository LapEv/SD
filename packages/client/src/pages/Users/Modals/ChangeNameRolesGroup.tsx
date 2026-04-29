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
import { MapNewRolesGroupInputFields } from '../data'
import { BoxModal } from 'components/MUI'

export const ChangeNameRolesGroup = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ rolesGroup }, { getRolesGroupNotRoles, changeNameRolesGroup }] =
        useRoles()
      const [group, setGroup] = useState<Options[]>([])
      const [selectedGroup, setSelectedGroup] =
        useState<Options>(emptyOptionsDD)

      const { handleSubmit, control, reset } = useForm<AddValuesProps>({
        mode: 'onBlur',
        defaultValues: {
          list: MapNewRolesGroupInputFields,
        },
      })
      const { errors } = useFormState({ control })
      const { fields } = useFieldArray({
        control,
        name: 'list',
      })

      const changeData = ({ list }: AddValuesProps) => {
        changeNameRolesGroup({
          id: selectedGroup.id,
          groupName: list[0].value,
          group: list[1].value,
        })
        handleModal(false)
      }

      const changeGroup = (data: Options) => {
        setSelectedGroup(data)
        reset({
          list: MapNewRolesGroupInputFields.map(item => ({
            ...item,
            value:
              item.name === 'newRolesGroup' ? data.label : data.descriptionID,
          })),
        })
      }

      useEffect(() => {
        getRolesGroupNotRoles()
      }, [])

      useEffect(() => {
        setGroup(
          rolesGroup
            .map(({ id, group, groupName }) => {
              return {
                ['label']: groupName,
                ['id']: id,
                ['descriptionID']: group,
              }
            })
            .filter(item => item.label !== 'SUPERADMIN')
            .filter(item => item.label !== 'ADMIN'),
        )
      }, [rolesGroup])

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
            label="Выберите группу ролей"
            errorLabel="Не выбрана группа ролей!"
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

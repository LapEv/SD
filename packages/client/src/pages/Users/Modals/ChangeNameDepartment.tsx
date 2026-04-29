import React, { memo } from 'react'
import { AddValuesProps, ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
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
import { MapNewDepartmentNameInputFields } from '../data'
import { useStructure } from 'hooks/structure/useStructure'
import { BoxModal } from 'components/MUI'

export const ChangeNameDepartment = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ departaments }, { getDepartments, changeNameDepartment }] =
        useStructure()
      const [group, setGroup] = useState<Options[]>([])
      const [selectedGroup, setSelectedGroup] =
        useState<Options>(emptyOptionsDD)

      const { handleSubmit, control, reset } = useForm<AddValuesProps>({
        mode: 'onBlur',
        defaultValues: {
          list: MapNewDepartmentNameInputFields,
        },
      })
      const { errors } = useFormState({ control })
      const { fields } = useFieldArray({
        control,
        name: 'list',
      })

      const changeData = ({ list }: AddValuesProps) => {
        changeNameDepartment({
          id: selectedGroup.id,
          departmentName: list[0].value,
          department: list[1].value,
        })
        handleModal(false)
      }

      const changeGroup = (data: Options) => {
        setSelectedGroup(data)
        reset({
          list: MapNewDepartmentNameInputFields.map(item => ({
            ...item,
            value:
              item.name === 'newDepartment' ? data.label : data.descriptionID,
          })),
        })
      }

      useEffect(() => {
        getDepartments()
      }, [])

      useEffect(() => {
        setGroup(
          departaments.map(({ id, department, departmentName }) => {
            return {
              ['label']: departmentName,
              ['id']: id as string,
              ['descriptionID']: department,
            }
          }),
        )
      }, [departaments])

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
            label="Выберите отдел"
            errorLabel="Не выбран отдел!"
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

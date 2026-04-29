import React, { useState, useEffect, memo } from 'react'
import { Checkbox, FormControlLabel, Typography } from '@mui/material'
import {
  useForm,
  useFieldArray,
  useFormState,
  Controller,
} from 'react-hook-form'
import { TextField } from 'components/TextFields'
import { ChooseModalProps, AddValuesProps } from './interfaces'
import { MapProfileInputFieldsAdmin } from '../data'
import { ButtonsModalSection } from 'components/Buttons'
import { useStructure } from 'hooks/structure/useStructure'
import { DropDown, emptyOptionsDD } from 'components/DropDown'
import { useRoles } from 'hooks/roles/useRoles'
import { Item } from 'components/CheckBoxGroup'
import { useAuth } from 'hooks/auth/useAuth'
import { DataList } from 'components/CheckBoxGroup/interface'
import { Options } from 'components/DropDown/interface'
import { Department } from 'store/slices/structure/interfaces'
import { BoxModal, MuiDiv } from 'components/MUI'

export const AddUser = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ userStatus }, { getUserStatus, newUser }] = useAuth()
      const [{ divisions }] = useStructure()
      const [{ rolesGroup }, { getRolesGroupNotRoles }] = useRoles()
      const [dataGroup, setDataGroup] = useState<DataList[]>([])
      const [division, setDivision] = useState<Options>(emptyOptionsDD)
      const [listDepartments, setDepartments] = useState<Options[]>([])
      const [department, setDepartment] = useState<Options>(emptyOptionsDD)
      const [id_rolesGroup, setGroup] = useState<string>('')
      const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
      const [chiefDivision, setCheckedCheifDivision] = useState<boolean>(false)
      const [chiefDepartment, setCheckedCheifDepartment] =
        useState<boolean>(false)
      const [statusName, setStatusName] = useState<Options>(emptyOptionsDD)

      const { handleSubmit, control } = useForm<AddValuesProps>({
        mode: 'onBlur',
        defaultValues: {
          list: MapProfileInputFieldsAdmin,
        },
      })

      const { errors } = useFormState({ control })
      const { fields } = useFieldArray({
        control,
        name: 'list',
      })

      function changeData({ list }: AddValuesProps) {
        if (!id_rolesGroup.length) {
          setErrSelectedItems(true)
          return
        }
        const status = userStatus.find(item => item.id === statusName.id)
          ?.category as string
        const newUserData = {
          username: list[3].value,
          firstName: list[1].value,
          lastName: list[0].value,
          middleName: list[2].value,
          email: list[5].value,
          phone: list[6].value,
          password: list[7].value,
          post: list[4].value,
          id_rolesGroup,
          chiefDivision,
          id_division: division.id,
          chiefDepartment,
          id_department: department.id,
          status,
          reasonOfDelete: '',
        }
        newUser(newUserData)
        handleModal(false)
      }

      const setRolesGroup = (checked: boolean, id: string) => {
        if (!checked) {
          setErrSelectedItems(true)
          setGroup('')
          return
        }
        setGroup(id)
        setErrSelectedItems(false)
      }

      const changeDivision = (data: Options) => {
        setDivision(data)
        setDepartment({
          label: '',
          id: '',
        })

        if (!data.id) {
          setDepartments([])
          return
        }
        const list = divisions.filter(({ id }) => data.id === id)[0]
          .Departments as Department[]
        setDepartments(
          list.map(item => {
            return {
              ['label']: item.departmentName as string,
              ['id']: item.id as string,
            }
          }),
        )
      }

      useEffect(() => {
        getRolesGroupNotRoles()
        getUserStatus()
      }, [])

      useEffect(() => {
        const data = rolesGroup.map(item => {
          return {
            id: item.id,
            name: item.groupName,
          }
        })
        setDataGroup(data)
      }, [rolesGroup])

      return (
        <BoxModal
          ref={ref}
          tabIndex={-1}
          className={'modalMainContainer'}
          component="form"
          onSubmit={handleSubmit(changeData)}>
          <Typography variant={'h6'}>{title}</Typography>
          <DropDown
            data={userStatus.map(item => {
              return {
                ['label']: item.categoryName as string,
                ['id']: item.id as string,
              }
            })}
            className={'dropdown_mt4'}
            onChange={setStatusName}
            value={statusName.label}
            label="Выберите статус пользователя"
            errorLabel="Не выбран статус пользователя!"
          />
          <DropDown
            data={divisions.map(item => {
              return {
                ['label']: item.divisionName as string,
                ['id']: item.id as string,
              }
            })}
            className={'dropdown_mt4'}
            onChange={changeDivision}
            value={division.label}
            label="Выберите подразделение"
            errorLabel="Не выбрано подразделение!"
          />
          <FormControlLabel
            className={'checkBoxContainer'}
            name={'Шеф подразделения'}
            label={'Шеф подразделения'}
            control={
              <Checkbox
                checked={chiefDivision}
                onChange={({ target }) =>
                  setCheckedCheifDivision(target.checked)
                }
              />
            }
          />
          <DropDown
            data={listDepartments}
            props={{ mt: 1 }}
            onChange={setDepartment}
            value={department.label}
            label="Выберите отдел"
            errorLabel="Не выбран отдел!"
          />
          <FormControlLabel
            className={'checkBoxContainer'}
            name={'Шеф отдела'}
            label={'Шеф отдела'}
            control={
              <Checkbox
                checked={chiefDepartment}
                onChange={({ target }) =>
                  setCheckedCheifDepartment(target.checked)
                }
              />
            }
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
                    name={field.name}
                    type={type}
                    required={required ?? true}
                    variant="outlined"
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
          <Typography variant={'body1'} sx={{ mt: 1 }}>
            Выберите роль
          </Typography>

          {dataGroup.map(({ name, id, initChecked }) => (
            <Item
              name={name}
              id={`${id}`}
              groupChecked={null}
              onChooseItems={setRolesGroup}
              initChecked={initChecked}
              key={`${name}_${id}`}
              className={'listModalAddUser'}
            />
          ))}
          <MuiDiv className={'modalError'}>
            {errSelectedItems && 'Не выбрана ни одна роль или группа ролей!'}
          </MuiDiv>
          <ButtonsModalSection
            closeModal={() => handleModal(false)}
            btnName="Сохранить"
          />
        </BoxModal>
      )
    },
  ),
)

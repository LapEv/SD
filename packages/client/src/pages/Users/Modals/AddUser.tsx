import React, { useState, useEffect, memo } from 'react'
import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  useTheme,
} from '@mui/material'
import {
  useForm,
  useFieldArray,
  useFormState,
  Controller,
} from 'react-hook-form'
import { TextField } from 'components/TextFields'
import { ChooseModalProps, AddValuesProps } from './interfaces'
import { MapProfileInputFieldsAdmin } from '../data'
import { modalStyle } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import { useStructure } from 'hooks/structure/useStructure'
import { DropDown, emptyValue } from 'components/DropDown'
import { useRoles } from 'hooks/roles/useRoles'
import { Item } from 'components/CheckBoxGroup'
import { useAuth } from 'hooks/auth/useAuth'
import { DataList } from 'components/CheckBoxGroup/interface'
import { Options } from 'components/DropDown/interface'
import { Department } from 'store/slices/structure/interfaces'
import { ITheme } from 'themes/themeConfig'

export const AddUser = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ userStatus }, { getUserStatus, newUser }] = useAuth()
      const [{ divisions }] = useStructure()
      const [{ rolesGroup }, { getRolesGroupNotRoles }] = useRoles()
      const [dataGroup, setDataGroup] = useState<DataList[]>([])
      const [division, setDivision] = useState<Options>(emptyValue)
      const [listDepartments, setDepartments] = useState<Options[]>([])
      const [department, setDepartment] = useState<Options>(emptyValue)
      const [id_rolesGroup, setGroup] = useState<string>('')
      const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
      const [chiefDivision, setCheckedCheifDivision] = useState<boolean>(false)
      const [chiefDepartment, setCheckedCheifDepartment] =
        useState<boolean>(false)
      const [statusName, setStatusName] = useState<Options>(emptyValue)

      const theme = useTheme() as ITheme
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
        <Box
          ref={ref}
          tabIndex={-1}
          sx={modalStyle}
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
            props={{ mt: theme.fontSize === 'small' ? 6 : 4 }}
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
            props={{ mt: theme.fontSize === 'small' ? 6 : 4 }}
            onChange={changeDivision}
            value={division.label}
            label="Выберите подразделение"
            errorLabel="Не выбрано подразделение!"
          />
          <FormControlLabel
            sx={{ width: '85%', mt: 1 }}
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
            // props={{ mt: 1 }}
            onChange={setDepartment}
            value={department.label}
            label="Выберите отдел"
            errorLabel="Не выбран отдел!"
          />
          <FormControlLabel
            sx={{ width: '85%', mt: 1 }}
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
                key={id}
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
                    sx={{
                      width: '90%',
                      height: theme.fontSize === 'small' ? 30 : 40,
                      mt:
                        index === 0
                          ? theme.fontSize === 'small'
                            ? 1
                            : 1
                          : theme.fontSize === 'small'
                            ? 5
                            : 3,
                    }}
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
              key={id}
              props={{ ml: theme.fontSize === 'small' ? 23 : 7, p: 1 }}
            />
          ))}
          <Box sx={{ color: theme.palette.error.main, minHeight: 10, mt: 1 }}>
            {errSelectedItems && 'Не выбрана ни одна роль или группа ролей!'}
          </Box>
          <ButtonsModalSection
            closeModal={() => handleModal(false)}
            btnName="Сохранить"
          />
        </Box>
      )
    },
  ),
)

import React, { memo, useEffect, useState } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { TextField } from 'components/TextFields'
import { ChooseModalProps, AddValuesProps } from './interfaces'
import { MapRoleInputFields } from '../data'
import { modalStyle } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import { useRoles } from 'hooks/roles/useRoles'
import { NewRole } from 'storeRoles/interfaces'
import { DataList } from 'components/CheckBoxGroup/interface'
import { Item } from 'components/CheckBoxGroup'
import { ITheme } from 'themes/themeConfig'

export const AddRole = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ rolesGroup }, { newRole, getRolesGroupNotRoles }] = useRoles()
      const [dataGroup, setDataGroup] = useState<DataList[]>([])
      const [selectedRolesGroups, setSelectedRolesGroups] = useState<string[]>(
        [],
      )
      const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
      const theme = useTheme() as ITheme

      const { handleSubmit, control } = useForm<AddValuesProps>({
        mode: 'onBlur',
        defaultValues: {
          list: MapRoleInputFields,
        },
      })
      const { errors } = useFormState({ control })
      const { fields } = useFieldArray({
        control,
        name: 'list',
      })

      const changeData = ({ list }: AddValuesProps) => {
        if (!selectedRolesGroups.length) {
          setErrSelectedItems(true)
          return
        }

        const data = {
          role: list[1].value,
          nameRole: list[0].value,
          selectedRolesGroups,
        }
        newRole(data as NewRole)
        handleModal(false)
      }

      const checkRolesGroup = (checked: boolean, id: string) => {
        if (!checked) {
          setSelectedRolesGroups(
            selectedRolesGroups.filter(value => value !== id),
          )
          return
        }
        setSelectedRolesGroups([...selectedRolesGroups, id])
        if ([...selectedRolesGroups, id] && errSelectedItems)
          setErrSelectedItems(false)
      }

      useEffect(() => {
        const data = rolesGroup.map(({ groupName, id }) => {
          return {
            name: groupName,
            id: id,
            initChecked: false,
          }
        })
        setDataGroup(data)
      }, [rolesGroup])

      useEffect(() => {
        getRolesGroupNotRoles()
      }, [])

      return (
        <Box
          ref={ref}
          tabIndex={-1}
          sx={modalStyle}
          component="form"
          onSubmit={handleSubmit(changeData)}>
          <Typography variant={'h6'}>{title}</Typography>
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
                    sx={{
                      width: '90%',
                      m: 2,
                      mt: 4,
                      height: theme.fontSize === 'small' ? 30 : 40,
                    }}
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
          <Typography variant={'body1'} sx={{ m: 2 }}>
            Выберите группу для этой роли
          </Typography>

          <Box
            sx={{
              width: '85%',
              pl: 2,
              pt: 1,
              height: 'auto',
              maxHeight: 300,
              overflowY: 'auto',
              overflowX: 'hidden',
            }}>
            {dataGroup.map(({ name, id, initChecked }) => (
              <Item
                name={name}
                id={`${id}`}
                groupChecked={null}
                onChooseItems={checkRolesGroup}
                initChecked={initChecked}
                key={`${id}`}
              />
            ))}
          </Box>
          <Box sx={{ color: theme.palette.error.main, height: 20, mt: 2 }}>
            {errSelectedItems && 'Не выбрана ни одна группа!'}
          </Box>

          <ButtonsModalSection
            closeModal={() => handleModal(false)}
            btnName={'Сохранить'}
          />
        </Box>
      )
    },
  ),
)

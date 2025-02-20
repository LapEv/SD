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
import { MapRolesGroupInputFields } from '../data'
import { boxDataModal, modalStyle } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import { useRoles } from 'hooks/roles/useRoles'
import { NewRolesGroup, Roles } from 'storeRoles/interfaces'
import { Item } from 'components/CheckBoxGroup'
import { ITheme } from 'themes/themeConfig'
import { SearchIconElement } from 'components/Icons'
import { useFilteredData } from 'hooks/useFilteredData'

export const AddRolesGroup = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ roles }, { newRolesGroup, getRolesGroup, getRoles }] = useRoles()
      const theme = useTheme() as ITheme
      const [selectedRoles, setSelectedRoles] = useState<string[]>([])
      const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
      const [filterText, setFilterText] = useState<string>('')
      const filteredObjects = useFilteredData<Roles>(roles, filterText, [
        'nameRole',
      ])
      const { handleSubmit, control } = useForm<AddValuesProps>({
        mode: 'onBlur',
        defaultValues: {
          list: MapRolesGroupInputFields,
        },
      })
      const { errors } = useFormState({ control })
      const { fields } = useFieldArray({
        control,
        name: 'list',
      })

      function changeData({ list }: AddValuesProps) {
        if (!selectedRoles.length) {
          setErrSelectedItems(true)
          return
        }
        const data = {
          group: list[1].value,
          groupName: list[0].value,
          selectedRoles,
        }
        newRolesGroup(data as NewRolesGroup)
        handleModal(false)
      }

      const setRoles = (checked: boolean, id: string) => {
        if (!checked) {
          setSelectedRoles(selectedRoles.filter(value => value !== id))
          return
        }
        setSelectedRoles([...selectedRoles, id])
        if ([...selectedRoles, id] && errSelectedItems)
          setErrSelectedItems(false)
      }

      useEffect(() => {
        getRolesGroup()
        getRoles()
      }, [])

      const setText = (text: string) => {
        setFilterText(text)
      }

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
            Выберите роли
          </Typography>
          <TextField
            variant="outlined"
            sx={{ width: '90%', mt: 2, height: 40 }}
            label="Введите фильтр"
            margin="normal"
            value={filterText || ''}
            onChange={e => setText(e.target.value ?? '')}
            InputProps={{
              endAdornment: <SearchIconElement />,
            }}
          />

          <Box sx={boxDataModal}>
            {filteredObjects.map(item => (
              <Item
                name={item.nameRole}
                id={`${item.id}`}
                onChooseItems={setRoles}
                key={item.id}
              />
            ))}
          </Box>
          <Box sx={{ color: theme.palette.error.main, height: 20 }}>
            {errSelectedItems && 'Не выбрана ни одна роль!'}
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

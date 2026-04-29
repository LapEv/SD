import React, { ChangeEvent, memo, useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { TextField } from 'components/TextFields'
import { ChooseModalProps, AddValuesProps } from './interfaces'
import { MapRolesGroupInputFields } from '../data'
import {
  ButtonsModalSection,
  ClearSearchModalSection,
} from 'components/Buttons'
import { useRoles } from 'hooks/roles/useRoles'
import { NewRolesGroup, Roles } from 'storeRoles/interfaces'
import { Item } from 'components/CheckBoxGroup'
import { useFilteredData } from 'hooks/useFilteredData'
import { BoxModal, MuiDiv } from 'components/MUI'

export const AddRolesGroup = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ roles }, { newRolesGroup, getRolesGroup, getRoles }] = useRoles()
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
        if ([...selectedRoles, id].length && errSelectedItems)
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
        <BoxModal
          ref={ref}
          tabIndex={-1}
          className={'modalMainContainer'}
          component="form"
          onSubmit={handleSubmit(changeData)}>
          <Typography variant={'h1'}>{title}</Typography>
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
                    className="textContainer_w90_mt3"
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
          <Typography variant={'body1'} sx={{ mt: 3 }}>
            Выберите роли
          </Typography>
          <TextField
            variant="outlined"
            className="modalTextContainer"
            label="Введите фильтр"
            margin="normal"
            value={filterText || ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setText(e.target.value ?? '')
            }
            slotProps={{
              input: {
                endAdornment: (
                  <ClearSearchModalSection
                    length={filterText.length}
                    handleClick={() => setFilterText('')}
                  />
                ),
              },
            }}
          />
          <MuiDiv className={'boxDataModal'}>
            {filteredObjects.map(({ nameRole, id }) => (
              <Item
                name={nameRole}
                id={`${id}`}
                onChooseItems={setRoles}
                key={`${nameRole}_${id}`}
              />
            ))}
          </MuiDiv>
          <MuiDiv className={'modalError'}>
            {errSelectedItems && 'Не выбрана ни одна роль!'}
          </MuiDiv>
          <ButtonsModalSection
            closeModal={() => handleModal(false)}
            btnName={'Сохранить'}
          />
        </BoxModal>
      )
    },
  ),
)

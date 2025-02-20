import React, { memo } from 'react'
import { AddValuesProps, ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { modalStyle } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import { DropDown, emptyValue } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { TextField } from 'components/TextFields'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { MapNewDivisionNameInputFields } from '../data'
import { useStructure } from 'hooks/structure/useStructure'
import { ITheme } from 'themes/themeConfig'

export const ChangeNameDivision = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ divisions }, { getDivisions, changeNameDivision }] =
        useStructure()
      const [group, setGroup] = useState<Options[]>([])
      const [selectedGroup, setSelectedGroup] = useState<Options>(emptyValue)
      const theme = useTheme() as ITheme
      const { handleSubmit, control, reset } = useForm<AddValuesProps>({
        mode: 'onBlur',
        defaultValues: {
          list: MapNewDivisionNameInputFields,
        },
      })
      const { errors } = useFormState({ control })
      const { fields } = useFieldArray({
        control,
        name: 'list',
      })

      const changeData = ({ list }: AddValuesProps) => {
        changeNameDivision({
          id: selectedGroup.id,
          divisionName: list[0].value,
          division: list[1].value,
        })
        handleModal(false)
      }

      const changeGroup = (data: Options) => {
        setSelectedGroup(data)
        reset({
          list: MapNewDivisionNameInputFields.map(item => ({
            ...item,
            value:
              item.name === 'newDivision' ? data.label : data.descriptionID,
          })),
        })
      }

      useEffect(() => {
        getDivisions()
      }, [])

      useEffect(() => {
        setGroup(
          divisions.map(({ id, division, divisionName }) => {
            return {
              ['label']: divisionName,
              ['id']: id as string,
              ['descriptionID']: division,
            }
          }),
        )
      }, [divisions])

      return (
        <Box
          ref={ref}
          tabIndex={-1}
          sx={{ ...modalStyle, paddingLeft: 5 }}
          component="form"
          onSubmit={handleSubmit(changeData)}>
          <Typography variant={'h5'}>{title}</Typography>
          <DropDown
            data={group}
            props={{ mt: theme.fontSize === 'small' ? 6 : 4 }}
            onChange={data => changeGroup(data)}
            value={selectedGroup.label}
            label="Выберите дивизион"
            errorLabel="Не выбран дивизион!"
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
                    type={type}
                    variant="outlined"
                    required={required ?? true}
                    sx={{
                      width: '90%',
                      height: theme.fontSize === 'small' ? 30 : 40,
                      mt:
                        index === 0
                          ? theme.fontSize === 'small'
                            ? 7
                            : 4
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
          <ButtonsModalSection
            closeModal={() => handleModal(false)}
            btnName={'Изменить'}
          />
        </Box>
      )
    },
  ),
)

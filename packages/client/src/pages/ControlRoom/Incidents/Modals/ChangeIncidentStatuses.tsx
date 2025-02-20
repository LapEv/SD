import React, { memo } from 'react'
import { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { modalStyle } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import { DropDown, emptyValue } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { TextField } from 'components/TextFields'
import { MapINCStatusInputFields } from '../data'
import { useIncidents } from 'hooks/incidents/useINC'
import { AddValuesProps, ChooseModalProps } from './interfaces'

export const ChangeIncidentStatuses = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ incStatuses }, { changeIncidentStatuses, getIncidentStatuses }] =
        useIncidents()
      const [listIncStatuses, setListIncStatuses] = useState<Options[]>([])
      const [selectedIncStatuses, setSelectedIncStatuses] =
        useState<Options>(emptyValue)
      const [errSelectedItems, setErrSelectedItems] = useState<string>('')
      const theme = useTheme()

      const { handleSubmit, control } = useForm<AddValuesProps>({
        mode: 'onBlur',
        defaultValues: {
          list: MapINCStatusInputFields,
        },
      })
      const { errors } = useFormState({ control })
      const { fields } = useFieldArray({
        control,
        name: 'list',
      })

      const changeData = ({ list }: AddValuesProps) => {
        if (!selectedIncStatuses) {
          setErrSelectedItems('Не выбран статус инцидента')
          setSelectedIncStatuses(emptyValue)
          return
        }
        changeIncidentStatuses({
          statusINC: list[0].value,
          id: selectedIncStatuses.id,
        })
        handleModal(false)
      }

      const changeSelectedIncStatuses = (data: Options) => {
        if (!data) return
        setSelectedIncStatuses(data)
        if (data.id && selectedIncStatuses && errSelectedItems) {
          setErrSelectedItems('')
        }
      }

      const checkIncStatusesValue = (value: string) => {
        const isNew = incStatuses.findIndex(item => item.statusINC === value)
        if (isNew < 0) {
          setSelectedIncStatuses(emptyValue)
        }
      }

      useEffect(() => {
        getIncidentStatuses()
      }, [])

      useEffect(() => {
        setListIncStatuses(
          incStatuses.map(item => {
            return {
              ['label']: item.statusINC as string,
              ['id']: item.id as string,
            }
          }),
        )
      }, [incStatuses])

      return (
        <Box
          ref={ref}
          tabIndex={-1}
          sx={{ ...modalStyle, paddingLeft: 5 }}
          component="form"
          onSubmit={handleSubmit(changeData)}>
          <Typography variant={'h6'}>{title}</Typography>
          <DropDown
            data={listIncStatuses}
            props={{ mt: 4 }}
            onChange={data => changeSelectedIncStatuses(data)}
            value={selectedIncStatuses.label || ''}
            label="Выберите статус инцидента"
            errorLabel="Не выбран статус инцидента!"
            onBlur={text => checkIncStatusesValue(text)}
          />
          <Box sx={{ mt: 2, width: '90%' }}>
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
                      sx={{ width: '100%', mt: 2, height: 40 }}
                      margin="normal"
                      value={field.value || ''}
                      error={!!(errors?.list ?? [])[index]?.value?.message}
                      helperText={(errors?.list ?? [])[index]?.value?.message}
                    />
                  )}
                />
              )
            })}
          </Box>
          <Box
            sx={{
              mt: 2,
              width: '100%',
              pl: 3,
            }}></Box>
          <Box sx={{ color: theme.palette.error.main, height: 20 }}>
            {errSelectedItems}
          </Box>
          <ButtonsModalSection
            closeModal={() => handleModal(false)}
            btnName={'Изменить'}
          />
        </Box>
      )
    },
  ),
)

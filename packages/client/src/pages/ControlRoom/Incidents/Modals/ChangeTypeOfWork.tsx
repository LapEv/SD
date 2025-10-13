import React, { memo } from 'react'
import { AddValuesProps, ChooseModalProps } from './interfaces'
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
import { MapTypesOfWorkInputFields } from '../data'
import { useIncidents } from 'hooks/incidents/useINC'

export const ChangeTypeOfWork = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ typesOfWork }, { getTypesOfWork, changeTypesOfWork }] =
        useIncidents()
      const [listTypesOfWork, setListTypesOfWork] = useState<Options[]>([])
      const [selectedTypesOfWork, setSelectedTypesOfWork] =
        useState<Options>(emptyValue)
      const [errSelectedItems, setErrSelectedItems] = useState<string>('')
      const theme = useTheme()

      const { handleSubmit, control } = useForm<AddValuesProps>({
        mode: 'onBlur',
        defaultValues: {
          list: MapTypesOfWorkInputFields,
        },
      })
      const { errors } = useFormState({ control })
      const { fields } = useFieldArray({
        control,
        name: 'list',
      })

      const changeData = ({ list }: AddValuesProps) => {
        if (!selectedTypesOfWork) {
          setErrSelectedItems('Не выбран тип работ')
          setSelectedTypesOfWork(emptyValue)
          return
        }
        changeTypesOfWork({
          typeOfWork: list[0].value,
          id: selectedTypesOfWork.id,
        })
        handleModal(false)
      }

      const changeSelectedTypesOfWork = (data: Options) => {
        if (!data) return
        setSelectedTypesOfWork(data)
        if (data.id && selectedTypesOfWork && errSelectedItems) {
          setErrSelectedItems('')
        }
      }

      const checkTypesOfWorkValue = (value: string) => {
        const isNew = typesOfWork.findIndex(item => item.typeOfWork === value)
        if (isNew < 0) {
          setSelectedTypesOfWork(emptyValue)
        }
      }

      useEffect(() => {
        getTypesOfWork()
      }, [])

      useEffect(() => {
        setListTypesOfWork(
          typesOfWork.map(item => {
            return {
              ['label']: item.typeOfWork as string,
              ['id']: item.id as string,
            }
          })
        )
      }, [typesOfWork])

      return (
        <Box
          ref={ref}
          tabIndex={-1}
          sx={{ ...modalStyle, paddingLeft: 5 }}
          component="form"
          onSubmit={handleSubmit(changeData)}>
          <Typography variant={'h6'}>{title}</Typography>
          <DropDown
            data={listTypesOfWork}
            props={{ mt: 4 }}
            onChange={data => changeSelectedTypesOfWork(data)}
            value={selectedTypesOfWork.label || ''}
            label="Выберите тип работ"
            errorLabel="Не выбрано ни одного типа работ!"
            onBlur={text => checkTypesOfWorkValue(text)}
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
    }
  )
)

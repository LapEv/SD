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
import { MapTypesCompletedWorkInputFields } from '../data'
import { useIncidents } from 'hooks/incidents/useINC'

export const ChangeTypeCompletedWork = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [
        { typesCompletedWork },
        { getTypesCompletedWork, changeTypesCompletedWork },
      ] = useIncidents()
      const [listTypesCompletedWork, setListTypesCompletedWork] = useState<
        Options[]
      >([])
      const [selectedTypeCompletedWork, setSelectedTypeCompletedWork] =
        useState<Options>(emptyValue)
      const [errSelectedItems, setErrSelectedItems] = useState<string>('')
      const theme = useTheme()

      const { handleSubmit, control } = useForm<AddValuesProps>({
        mode: 'onBlur',
        defaultValues: {
          list: MapTypesCompletedWorkInputFields,
        },
      })
      const { errors } = useFormState({ control })
      const { fields } = useFieldArray({
        control,
        name: 'list',
      })

      const changeData = ({ list }: AddValuesProps) => {
        if (!selectedTypeCompletedWork) {
          setErrSelectedItems('Не выбран тип выполненных работ')
          setSelectedTypeCompletedWork(emptyValue)
          return
        }
        changeTypesCompletedWork({
          typeCompletedWork: list[0].value,
          id: selectedTypeCompletedWork.id,
        })
        handleModal(false)
      }

      const changeSelectedTypesOfWork = (data: Options) => {
        if (!data) return
        setSelectedTypeCompletedWork(data)
        if (data.id && selectedTypeCompletedWork && errSelectedItems) {
          setErrSelectedItems('')
        }
      }

      const checkTypesCompletedWorkValue = (value: string) => {
        const isNew = typesCompletedWork.findIndex(
          item => item.typeCompletedWork === value
        )
        if (isNew < 0) {
          setSelectedTypeCompletedWork(emptyValue)
        }
      }

      useEffect(() => {
        getTypesCompletedWork()
      }, [])

      useEffect(() => {
        setListTypesCompletedWork(
          typesCompletedWork.map(item => {
            return {
              ['label']: item.typeCompletedWork as string,
              ['id']: item.id as string,
            }
          })
        )
      }, [typesCompletedWork])

      return (
        <Box
          ref={ref}
          tabIndex={-1}
          sx={{ ...modalStyle, paddingLeft: 5 }}
          component="form"
          onSubmit={handleSubmit(changeData)}>
          <Typography variant={'h6'}>{title}</Typography>
          <DropDown
            data={listTypesCompletedWork}
            props={{ mt: 4 }}
            onChange={data => changeSelectedTypesOfWork(data)}
            value={selectedTypeCompletedWork.label || ''}
            label="Выберите тип выполненных работ"
            errorLabel="Не выбрано ни одного типа выполненных работ!"
            onBlur={text => checkTypesCompletedWorkValue(text)}
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

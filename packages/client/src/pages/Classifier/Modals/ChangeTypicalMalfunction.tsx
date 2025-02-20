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
import { MapNewTypicalMalfunctionsInputFields } from '../data'
import { useClassifier } from 'hooks/classifier/useClassifier'
import { ITheme } from 'themes/themeConfig'

export const ChangeTypicalMalfunction = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [
        { typicalMalfunctions },
        { getTypicalMalfunctions, changeTypicalMalfunction },
      ] = useClassifier()
      const [listTypicalMalfunctions, setListtypicalMalfunctions] = useState<
        Options[]
      >([])
      const [selectedTypicalMalfunctions, setSelectedTypicalMalfunctions] =
        useState<Options>(emptyValue)
      const [errSelectedItems, setErrSelectedItems] = useState<string>('')
      const theme = useTheme() as ITheme

      const { handleSubmit, control } = useForm<AddValuesProps>({
        mode: 'onBlur',
        defaultValues: {
          list: MapNewTypicalMalfunctionsInputFields,
        },
      })
      const { errors } = useFormState({ control })
      const { fields } = useFieldArray({
        control,
        name: 'list',
      })

      const changeData = ({ list }: AddValuesProps) => {
        if (!selectedTypicalMalfunctions) {
          setErrSelectedItems('Не выбрана ни одна типовая неисправность')
          setSelectedTypicalMalfunctions(emptyValue)
          return
        }
        changeTypicalMalfunction({
          typicalMalfunction: list[0].value,
          id: selectedTypicalMalfunctions.id,
        })
        handleModal(false)
      }

      const changeSelectedTypicalMalfunction = (data: Options) => {
        if (!data) return
        setSelectedTypicalMalfunctions(data)
        if (data.id && selectedTypicalMalfunctions && errSelectedItems) {
          setErrSelectedItems('')
        }
      }

      const checkTypicalMalfunction = (value: string) => {
        const isNew = typicalMalfunctions.findIndex(
          item => item.typicalMalfunction === value,
        )
        if (isNew < 0) {
          setSelectedTypicalMalfunctions(emptyValue)
        }
      }

      useEffect(() => {
        getTypicalMalfunctions()
      }, [])

      useEffect(() => {
        setListtypicalMalfunctions(
          typicalMalfunctions.map(item => {
            return {
              ['label']: item.typicalMalfunction as string,
              ['id']: item.id as string,
            }
          }),
        )
      }, [typicalMalfunctions])

      return (
        <Box
          ref={ref}
          tabIndex={-1}
          sx={{ ...modalStyle, paddingLeft: 5 }}
          component="form"
          onSubmit={handleSubmit(changeData)}>
          <Typography variant={'h6'}>{title}</Typography>
          <DropDown
            data={listTypicalMalfunctions}
            props={{ mt: 4 }}
            onChange={data => changeSelectedTypicalMalfunction(data)}
            value={selectedTypicalMalfunctions.label || ''}
            label="Выберите типовую неисправность"
            errorLabel="Не выбран типовая неисправность!"
            onBlur={text => checkTypicalMalfunction(text)}
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
                      sx={{
                        width: '100%',
                        height: theme.fontSize === 'small' ? 30 : 40,
                        mt:
                          index === 0
                            ? theme.fontSize === 'small'
                              ? 7
                              : 6
                            : 5,
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

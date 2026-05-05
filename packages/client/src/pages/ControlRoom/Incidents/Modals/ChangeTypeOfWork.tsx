import React, { memo } from 'react'
import { AddValuesProps, ChooseModalProps } from '../interfaces'
import { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import { ButtonsModalSection } from 'components/Buttons'
import { DropDown, emptyOptionsDD } from 'components/DropDown'
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
import { BoxModal, MuiDiv } from 'components/MUI'

export const ChangeTypeOfWork = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ typesOfWork }, { getTypesOfWork, changeTypesOfWork }] =
        useIncidents()
      const [listTypesOfWork, setListTypesOfWork] = useState<Options[]>([])
      const [selectedTypesOfWork, setSelectedTypesOfWork] =
        useState<Options>(emptyOptionsDD)
      const [errSelectedItems, setErrSelectedItems] = useState<string>('')

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
          setSelectedTypesOfWork(emptyOptionsDD)
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
          setSelectedTypesOfWork(emptyOptionsDD)
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
          }),
        )
      }, [typesOfWork])

      return (
        <BoxModal
          ref={ref}
          tabIndex={-1}
          className={'modalMainContainer'}
          component="form"
          onSubmit={handleSubmit(changeData)}>
          <Typography variant={'h1'}>{title}</Typography>
          <DropDown
            data={listTypesOfWork}
            props={{ mt: 4 }}
            onChange={data => changeSelectedTypesOfWork(data)}
            value={selectedTypesOfWork.label || ''}
            label="Выберите тип работ"
            errorLabel="Не выбрано ни одного типа работ!"
            onBlur={text => checkTypesOfWorkValue(text)}
          />
          <MuiDiv className={'w90_mt2'}>
            {fields.map(({ id, label, validation, type }, index) => {
              return (
                <Controller
                  key={`${label}${id}`}
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
                      className={'textContainer_mt2'}
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
          </MuiDiv>
          <MuiDiv className={'modalErrorMT2'}>{errSelectedItems}</MuiDiv>
          <ButtonsModalSection
            closeModal={() => handleModal(false)}
            btnName={'Изменить'}
            sx={{ mt: '12px!important' }}
          />
        </BoxModal>
      )
    },
  ),
)

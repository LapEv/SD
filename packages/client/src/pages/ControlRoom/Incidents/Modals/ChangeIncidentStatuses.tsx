import React, { memo } from 'react'
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
import { MapINCStatusInputFields } from '../data'
import { useIncidents } from 'hooks/incidents/useINC'
import { AddValuesProps, ChooseModalProps } from '../interfaces'
import { BoxModal, MuiDiv } from 'components/MUI'

export const ChangeIncidentStatuses = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ incStatuses }, { changeIncidentStatuses, getIncidentStatuses }] =
        useIncidents()
      const [listIncStatuses, setListIncStatuses] = useState<Options[]>([])
      const [selectedIncStatuses, setSelectedIncStatuses] =
        useState<Options>(emptyOptionsDD)
      const [errSelectedItems, setErrSelectedItems] = useState<string>('')

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
          setSelectedIncStatuses(emptyOptionsDD)
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
          setSelectedIncStatuses(emptyOptionsDD)
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
        <BoxModal
          ref={ref}
          tabIndex={-1}
          className={'modalMainContainer'}
          component="form"
          onSubmit={handleSubmit(changeData)}>
          <Typography variant={'h1'}>{title}</Typography>
          <DropDown
            data={listIncStatuses}
            props={{ mt: 4 }}
            onChange={data => changeSelectedIncStatuses(data)}
            value={selectedIncStatuses.label || ''}
            label="Выберите статус инцидента"
            errorLabel="Не выбран статус инцидента!"
            onBlur={text => checkIncStatusesValue(text)}
          />
          <MuiDiv className={'w90_mt1'}>
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
                      required={required ?? true}
                      className={'textContainer_mt2'}
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

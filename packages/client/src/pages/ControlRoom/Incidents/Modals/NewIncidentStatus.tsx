import React, { memo, useEffect } from 'react'
import { Typography } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { TextField } from 'components/TextFields'
import { ButtonsModalSection } from 'components/Buttons'
import { MapINCStatusInputFields } from '../data'
import { useIncidents } from 'hooks/incidents/useINC'
import { AddValuesProps, ChooseModalProps } from '../interfaces'
import { BoxModal } from 'components/MUI'

export const NewIncidentStatus = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ incStatuses }, { newIncidentStatuses, getIncidentStatuses }] =
        useIncidents()
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

      function changeData({ list }: AddValuesProps) {
        newIncidentStatuses({
          statusINC: list[0].value,
          stateNumber: incStatuses.length,
        })
        handleModal(false)
      }

      useEffect(() => {
        getIncidentStatuses()
      }, [])

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
                    className="modalTextContainer"
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
          <ButtonsModalSection
            closeModal={() => handleModal(false)}
            btnName="Сохранить"
          />
        </BoxModal>
      )
    },
  ),
)

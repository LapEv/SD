import React, { memo, useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { TextField } from 'components/TextFields'
import { ChooseModalProps, AddValuesPropsSLA } from './interfaces'
import { MapSLAInputFields } from '../data'
import { modalStyle } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import { useSLA } from 'hooks/sla/useSLA'
import { DropDown, emptyValue } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { useIncidents } from 'hooks/incidents/useINC'

export const NewSLA = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [, { newSLA }] = useSLA()
      const [{ typesOfWork }, { getTypesOfWork }] = useIncidents()
      const [listTypes, setListTypes] = useState<Options[]>([])
      const [selectedType, setSelectedType] = useState<Options>(emptyValue)

      const { handleSubmit: handleSubmitAddSLA, control: controlAddSLA } =
        useForm<AddValuesPropsSLA>({
          mode: 'onBlur',
          defaultValues: {
            listAddSLA: MapSLAInputFields,
          },
        })
      const { errors: errorsAddSLA } = useFormState({ control: controlAddSLA })
      const { fields: fieldsAddSLA } = useFieldArray({
        control: controlAddSLA,
        name: 'listAddSLA',
      })

      function changeData({ listAddSLA }: AddValuesPropsSLA) {
        newSLA({
          sla: listAddSLA[0].value,
          days: listAddSLA[1].value,
          time: listAddSLA[2].value,
          timeStart: listAddSLA[3].value,
          timeEnd: listAddSLA[4].value,
          id_typeOfWork: selectedType.id,
        })
        handleModal(false)
      }

      useEffect(() => {
        const list = typesOfWork.map(({ typeOfWork, id }) => {
          return {
            label: typeOfWork,
            id: id as string,
          }
        })
        setListTypes(list)
      }, [typesOfWork])

      useEffect(() => {
        getTypesOfWork()
      }, [])

      return (
        <Box
          ref={ref}
          tabIndex={-1}
          sx={modalStyle}
          component="form"
          onSubmit={handleSubmitAddSLA(changeData)}>
          <Typography variant={'h6'}>{title}</Typography>
          {fieldsAddSLA.map(
            ({ id, name, label, validation, type, required }, index) => {
              return (
                <Controller
                  key={id}
                  control={controlAddSLA}
                  name={`listAddSLA.${index}.value`}
                  rules={validation}
                  render={({ field }) =>
                    name !== 'TypeOfWork' ? (
                      <TextField
                        {...field}
                        inputRef={field.ref}
                        label={label}
                        type={type}
                        variant="outlined"
                        sx={{
                          width: '90%',
                          mt: 5,
                        }}
                        margin="normal"
                        required={required ?? true}
                        value={field.value ?? ''}
                        error={
                          !!(errorsAddSLA?.listAddSLA ?? [])[index]?.value
                            ?.message
                        }
                        helperText={
                          (errorsAddSLA?.listAddSLA ?? [])[index]?.value
                            ?.message
                        }
                        InputProps={{
                          inputProps: { min: type === 'number' ? 0 : '' },
                        }}
                      />
                    ) : (
                      <DropDown
                        data={listTypes}
                        props={{
                          mt: 5,
                          width: '90%',
                        }}
                        onChange={setSelectedType}
                        value={selectedType.label || ''}
                        label="Выберите тип работ"
                        errorLabel="Не выбрано ни одного типа работ!"
                      />
                    )
                  }
                />
              )
            },
          )}
          <ButtonsModalSection
            closeModal={() => handleModal(false)}
            btnName="Сохранить"
          />
        </Box>
      )
    },
  ),
)

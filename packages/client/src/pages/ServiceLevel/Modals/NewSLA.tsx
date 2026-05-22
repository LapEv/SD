import React, { memo, useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { TextField } from 'components/TextFields'
import { ChooseModalProps, AddValuesPropsSLA } from './interfaces'
import { MapSLAInputFields } from '../data'
import { ButtonsModalSection } from 'components/Buttons'
import { useSLA } from 'hooks/sla/useSLA'
import { DropDown, emptyOptionsDD } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { useIncidents } from 'hooks/incidents/useINC'
import { BoxModal } from 'components/MUI'

export const NewSLA = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [, { newSLA }] = useSLA()
      const [{ typesOfWork }, { getTypesOfWork }] = useIncidents()
      const [listTypes, setListTypes] = useState<Options[]>([])
      const [selectedType, setSelectedType] = useState<Options>(emptyOptionsDD)

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
          sla: listAddSLA[0].value as string,
          days: listAddSLA[1].value as number,
          time: listAddSLA[2].value as string,
          timeStart: listAddSLA[3].value as string,
          timeEnd: listAddSLA[4].value as string,
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
        <BoxModal
          ref={ref}
          tabIndex={-1}
          className={'modalMainContainer'}
          component="form"
          onSubmit={handleSubmitAddSLA(changeData)}>
          <Typography variant={'h1'}>{title}</Typography>
          {fieldsAddSLA.map(
            ({ id, name, label, validation, type, required }, index) => {
              return (
                <Controller
                  key={`${label}_${id}`}
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
                        className="textContainer_mt2"
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
                        slotProps={{
                          input: {
                            inputProps: { min: type === 'number' ? 0 : '' },
                          },
                        }}
                      />
                    ) : (
                      <DropDown
                        data={listTypes}
                        className="dropdownModalList"
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
        </BoxModal>
      )
    },
  ),
)

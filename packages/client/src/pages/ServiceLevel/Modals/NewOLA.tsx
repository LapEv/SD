import React, { memo, useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { TextField } from 'components/TextFields'
import { ChooseModalProps, AddValuesProps } from './interfaces'
import { MapOLAInputFields } from '../data'
import { ButtonsModalSection } from 'components/Buttons'
import { useSLA } from 'hooks/sla/useSLA'
import { DropDown, emptyOptionsDD } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { useIncidents } from 'hooks/incidents/useINC'
import { BoxModal } from 'components/MUI'

export const NewOLA = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [, { newOLA }] = useSLA()
      const [{ typesOfWork }, { getTypesOfWork }] = useIncidents()
      const [listTypes, setListTypes] = useState<Options[]>([])
      const [selectedType, setSelectedType] = useState<Options>(emptyOptionsDD)
      const { handleSubmit, control } = useForm<AddValuesProps>({
        mode: 'onBlur',
        defaultValues: {
          list: MapOLAInputFields,
        },
      })
      const { errors } = useFormState({ control })
      const { fields } = useFieldArray({
        control,
        name: 'list',
      })

      function changeData({ list }: AddValuesProps) {
        newOLA({
          ola: list[0].value as string,
          days: list[1].value as number,
          time: list[3].value as string,
          timeStart: list[4].value as string,
          timeEnd: list[5].value as string,
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
          onSubmit={handleSubmit(changeData)}>
          <Typography variant={'h1'}>{title}</Typography>
          {fields.map(
            ({ name, id, label, validation, type, required }, index) => {
              return (
                <Controller
                  key={`${label}_${id}`}
                  control={control}
                  name={`list.${index}.value`}
                  rules={validation}
                  render={({ field }) =>
                    name !== 'TypeOfWork' ? (
                      <TextField
                        {...field}
                        inputRef={field.ref}
                        label={label}
                        type={type}
                        variant="outlined"
                        className="textContainer_mt3"
                        margin="normal"
                        required={required ?? true}
                        value={field.value ?? ''}
                        error={!!(errors?.list ?? [])[index]?.value?.message}
                        helperText={(errors?.list ?? [])[index]?.value?.message}
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

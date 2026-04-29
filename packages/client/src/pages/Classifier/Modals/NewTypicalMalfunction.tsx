import React, { useState, useEffect, memo } from 'react'
import { Typography } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { TextField } from 'components/TextFields'
import { ChooseModalProps, AddValuesProps } from './interfaces'
import { MapTypMalfunctionInputFields } from '../data'
import { ButtonsModalSection } from 'components/Buttons'
import { DropDown, emptyOptionsDD } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { useClassifier } from 'hooks/classifier/useClassifier'
import { Item } from 'components/CheckBoxGroup'
import { ClassifierModels } from 'store/slices/classifier/interfaces'
import { BoxModal, MuiDiv } from 'components/MUI'

export const NewTypicalMalfunction = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ equipments }, { newTypicalMalfunction, resetModels }] =
        useClassifier()
      const [equipment, setEquipment] = useState<Options>(emptyOptionsDD)
      const [selectedModels, setSelectedModels] = useState<string[]>([])
      const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
      const [models, setModels] = useState<ClassifierModels[]>([])

      const { handleSubmit, control } = useForm<AddValuesProps>({
        mode: 'onBlur',
        defaultValues: {
          list: MapTypMalfunctionInputFields,
        },
      })
      const { errors } = useFormState({ control })
      const { fields } = useFieldArray({
        control,
        name: 'list',
      })

      function changeData({ list }: AddValuesProps) {
        newTypicalMalfunction({
          id_equipment: equipment.id,
          typicalMalfunction: list[0].value,
          selectedModels,
        })
        handleModal(false)
      }

      const chooseClassifierEquipment = (data: Options) => {
        const newModel = equipments.filter(({ id }) => id === data.id)[0]
          .ClassifierModels as ClassifierModels[]
        setModels(newModel)
        setEquipment(data)
      }

      const onChooseItems = (checked: boolean, id: string) => {
        if (!checked) {
          setSelectedModels(selectedModels.filter(value => value !== id))
          return
        }
        setSelectedModels([...selectedModels, id])
        if ([...selectedModels, id].length && errSelectedItems)
          setErrSelectedItems(false)
      }

      useEffect(() => {
        resetModels()
      }, [])

      useEffect(() => {
        setSelectedModels(models.map(item => item.id as string))
      }, [models])

      return (
        <BoxModal
          ref={ref}
          tabIndex={-1}
          className={'modalMainContainer'}
          component="form"
          onSubmit={handleSubmit(changeData)}>
          <Typography variant={'h1'}>{title}</Typography>
          <DropDown
            data={equipments.map(item => {
              return {
                ['label']: item.equipment as string,
                ['id']: item.id as string,
              }
            })}
            props={{ mt: 3 }}
            onChange={chooseClassifierEquipment}
            value={equipment.label}
            label="Выберите классификатор оборудования"
            errorLabel="Не выбран классификатор оборудования!"
          />
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
                    className="textContainer_w90"
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
          <Typography variant={'body1'} sx={{ mt: 2, width: '90%' }}>
            Выберите модели для этой типовой неисправности:
          </Typography>
          <MuiDiv className={'boxDataModal'}>
            {models.map(({ model, id }) => (
              <Item
                name={model}
                id={`${id}`}
                groupChecked={false}
                onChooseItems={onChooseItems}
                initChecked={true}
                key={id}
              />
            ))}
          </MuiDiv>

          <ButtonsModalSection
            closeModal={() => handleModal(false)}
            btnName="Сохранить"
          />
        </BoxModal>
      )
    },
  ),
)

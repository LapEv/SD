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
import { MapModelsInputFields } from '../data'
import { ButtonsModalSection } from 'components/Buttons'
import { useClassifier } from 'hooks/classifier/useClassifier'
import { DropDown, emptyOptionsDD } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { Item } from 'components/CheckBoxGroup'
import { TypicalMalfunctions } from 'store/slices/classifier/interfaces'
import { BoxModal, MuiDiv } from 'components/MUI'

export const NewClassifierModel = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ equipments }, { newClassifierModel, resetTypicalMalfunction }] =
        useClassifier()
      const [equipment, setEquipment] = useState<Options>(emptyOptionsDD)
      const [typicalMalfunctions, setTypicalMalfunctions] = useState<
        TypicalMalfunctions[]
      >([])
      const [selectedTypicalMalfunctions, setGroup] = useState<string[]>([])
      const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
      const [noTypical, setNoTypical] = useState<boolean>(false)

      const { handleSubmit, control } = useForm<AddValuesProps>({
        mode: 'onBlur',
        defaultValues: {
          list: MapModelsInputFields,
        },
      })
      const { errors } = useFormState({ control })
      const { fields } = useFieldArray({
        control,
        name: 'list',
      })

      function changeData({ list }: AddValuesProps) {
        newClassifierModel({
          id_equipment: equipment.id,
          model: list[0].value,
          selectedTypicalMalfunctions,
        })
        handleModal(false)
      }

      const chooseClassifierEquipment = (data: Options) => {
        const typical = equipments.filter(({ id }) => id === data.id)[0]
          .TypicalMalfunctions as TypicalMalfunctions[]
        setTypicalMalfunctions(typical)
        setEquipment(data)
      }

      const onChooseItems = (checked: boolean, id: string) => {
        if (!checked) {
          setGroup(selectedTypicalMalfunctions.filter(value => value !== id))
          return
        }
        setGroup([...selectedTypicalMalfunctions, id])
        if ([...selectedTypicalMalfunctions, id].length && errSelectedItems)
          setErrSelectedItems(false)
      }

      useEffect(() => {
        resetTypicalMalfunction()
      }, [])

      useEffect(() => {
        if (
          (!typicalMalfunctions || !typicalMalfunctions.length) &&
          equipment.id
        ) {
          setNoTypical(true)
          return
        }
        setNoTypical(false)
      }, [typicalMalfunctions])

      return (
        <BoxModal
          ref={ref}
          tabIndex={-1}
          className={'modalMainContainer modalMainContainerMH8'}
          onSubmit={handleSubmit(changeData)}>
          <Typography variant={'h1'}>{title}</Typography>
          <DropDown
            data={equipments.map(item => {
              return {
                ['label']: item.equipment as string,
                ['id']: item.id as string,
              }
            })}
            props={{ mt: 4 }}
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
            Выберите типовые неисправности для этой модели:
          </Typography>
          {noTypical && (
            <Typography
              variant={'subtitle2'}
              sx={{ mt: 2, width: '85%', height: 40 }}>
              Для этого классификатора нет типовых неисправностей. Необходимо
              сначала их внести!
            </Typography>
          )}
          <MuiDiv className={'boxDataModal mt0 h35Vh'}>
            {typicalMalfunctions.map(({ typicalMalfunction, id }) => (
              <Item
                name={typicalMalfunction}
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

import React, { useState, useEffect, memo } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { TextField } from 'components/TextFields'
import { ChooseModalProps, AddValuesProps } from './interfaces'
import { MapModelsInputFields } from '../data'
import { modalStyle, boxDataModal } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import { useClassifier } from 'hooks/classifier/useClassifier'
import { DropDown, emptyValue } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { Item } from 'components/CheckBoxGroup'
import { TypicalMalfunctions } from 'store/slices/classifier/interfaces'
import { ITheme } from 'themes/themeConfig'

export const NewClassifierModel = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ equipments }, { newClassifierModel, resetTypicalMalfunction }] =
        useClassifier()
      const [equipment, setEquipment] = useState<Options>(emptyValue)
      const [typicalMalfunctions, setTypicalMalfunctions] = useState<
        TypicalMalfunctions[]
      >([])
      const [selectedTypicalMalfunctions, setGroup] = useState<string[]>([])
      const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
      const [noTypical, setNoTypical] = useState<boolean>(false)
      const theme = useTheme() as ITheme

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

      console.log('equipments new model = ', equipments)

      return (
        <Box
          ref={ref}
          tabIndex={-1}
          sx={{ ...modalStyle, minHeight: 300 }}
          component="form"
          onSubmit={handleSubmit(changeData)}>
          <Typography variant={'h6'}>{title}</Typography>
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
                    sx={{
                      width: '90%',
                      height: theme.fontSize === 'small' ? 30 : 40,
                      mt:
                        index === 0 ? (theme.fontSize === 'small' ? 7 : 6) : 5,
                    }}
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
          {noTypical ? (
            <Typography
              variant={'subtitle1'}
              sx={{ mt: 2, width: '85%', height: 40 }}>
              Для этого классификатора нет типовых неисправностей. Необходимо
              сначала их внести!
            </Typography>
          ) : (
            <Typography
              variant={'h3'}
              sx={{
                mt: 2,
                width: '85%',
                height: 10,
              }}></Typography>
          )}
          <Box
            sx={{
              ...boxDataModal,
              mt: 0,
            }}>
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
          </Box>
          <ButtonsModalSection
            closeModal={() => handleModal(false)}
            btnName="Сохранить"
          />
        </Box>
      )
    },
  ),
)

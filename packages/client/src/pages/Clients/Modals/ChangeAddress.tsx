import React, { memo } from 'react'
import { AddValuesProps, ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import { ButtonsModalSection } from 'components/Buttons'
import { DropDown, emptyOptionsDD } from 'components/DropDown'
import { useAddresses } from 'hooks/addresses/useAddresses'
import { Options } from 'components/DropDown/interface'
import { Addresses } from 'store/slices/addresses/interfaces'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { TextField } from 'components/TextFields'
import { MapNewAddressInputFields } from './data'
import { BoxModal, MuiDiv } from 'components/MUI'

export const ChangeAddress = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [
        { addresses, regions },
        { getAddresses, getRegions, changeAddress },
      ] = useAddresses()
      const [listAddresses, setListAddresses] = useState<Options[]>([])
      const [listRegions, setListRegions] = useState<Options[]>([])
      const [selectedAddresses, setSelectedAddresses] =
        useState<Options>(emptyOptionsDD)
      const [selectedRegions, setSelectedRegions] =
        useState<Options>(emptyOptionsDD)
      const [errSelectedItems, setErrSelectedItems] = useState<string>('')

      const { handleSubmit, control } = useForm<AddValuesProps>({
        mode: 'onBlur',
        defaultValues: {
          list: MapNewAddressInputFields,
        },
      })
      const { errors } = useFormState({ control })
      const { fields } = useFieldArray({
        control,
        name: 'list',
      })

      const changeData = ({ list }: AddValuesProps) => {
        if (!selectedAddresses) {
          setErrSelectedItems('Не выбран адрес')
          return
        }
        if (!selectedRegions) {
          setErrSelectedItems('Не выбран регион')
          setSelectedRegions(emptyOptionsDD)
          return
        }
        changeAddress(
          {
            address: list[0].value,
            coordinates: list[1].value,
            id_region: selectedRegions.id,
            active: true,
          },
          selectedAddresses.id,
        )
        handleModal(false)
      }

      const changeSelectedAddresses = (data: Options) => {
        if (!data) return
        setSelectedAddresses(data)
        if (data.id && selectedRegions && errSelectedItems) {
          setErrSelectedItems('')
        }
        const newAddress = addresses.find(
          item => item.id === data.id,
        ) as Addresses
        setSelectedRegions({
          label: newAddress?.Region?.region as string,
          id: newAddress.id_region,
        })
      }

      const changeSelectedRegions = (data: Options) => {
        if (!data) return
        setSelectedRegions(data)
        if (data.id && selectedAddresses && errSelectedItems) {
          setErrSelectedItems('')
        }
      }

      const checkAddressValue = (value: string) => {
        const isNew = addresses.findIndex(item => item.address === value)
        if (isNew < 0) {
          setSelectedAddresses(emptyOptionsDD)
        }
      }

      const checkRegionValue = (value: string) => {
        const isNew = regions.findIndex(item => item.region === value)
        if (isNew < 0) {
          setSelectedRegions(emptyOptionsDD)
        }
      }

      useEffect(() => {
        getAddresses()
        getRegions()
      }, [])

      useEffect(() => {
        setListAddresses(
          addresses.map(item => {
            return {
              ['label']: item.address as string,
              ['id']: item.id as string,
            }
          }),
        )
      }, [addresses])

      useEffect(() => {
        setListRegions(
          regions.map(item => {
            return {
              ['label']: item.region as string,
              ['id']: item.id as string,
            }
          }),
        )
      }, [regions])

      return (
        <BoxModal
          ref={ref}
          tabIndex={-1}
          className={'modalMainContainer'}
          component="form"
          onSubmit={handleSubmit(changeData)}>
          <Typography variant={'h1'}>{title}</Typography>
          <DropDown
            data={listAddresses}
            props={{ mt: 4 }}
            onChange={data => changeSelectedAddresses(data)}
            value={selectedAddresses.label || ''}
            label="Выберите адрес"
            errorLabel="Не выбран адрес!"
            onBlur={text => checkAddressValue(text)}
          />
          <DropDown
            data={listRegions}
            props={{ mt: 4, mb: 1 }}
            onChange={data => changeSelectedRegions(data)}
            value={selectedRegions.label || ''}
            label="Выберите регион"
            errorLabel="Не выбран регион!"
            onBlur={text => checkRegionValue(text)}
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
                    required={required ?? true}
                    className={'textContainer_w90_mt3'}
                    margin="normal"
                    value={field.value || ''}
                    error={!!(errors?.list ?? [])[index]?.value?.message}
                    helperText={(errors?.list ?? [])[index]?.value?.message}
                  />
                )}
              />
            )
          })}
          <MuiDiv className={'modalErrorMT2'}>{errSelectedItems}</MuiDiv>
          <ButtonsModalSection
            closeModal={() => handleModal(false)}
            btnName={'Изменить'}
          />
        </BoxModal>
      )
    },
  ),
)

import React, { memo } from 'react'
import { AddValuesProps, ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { modalStyle } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import { DropDown, emptyValue } from 'components/DropDown'
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
import { MapNewObjectInputFields } from './data'
import { useObjects } from 'hooks/objects/useObjects'
import { Objects } from 'store/slices/objects/interfaces'
import { useClients } from 'hooks/clients/useClients'
import { deepEqual } from 'utils/deepEqual'
import { useMessage } from 'hooks/message/useMessage'
import { ITheme } from 'themes/themeConfig'

export const ChangeObject = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [, { setMessage }] = useMessage()
      const [{ addresses, regions }, { getAddresses, getRegions }] =
        useAddresses()
      const [{ clients }, { getClients }] = useClients()
      const [{ objects }, { getObjects, changeObject }] = useObjects()
      const [listObjects, setListObjects] = useState<Options[]>([])
      const [listAddresses, setListAddresses] = useState<Options[]>([])
      const [listRegions, setListRegions] = useState<Options[]>([])
      const [listClients, setListClients] = useState<Options[]>([])
      const [selectedObjects, setSelectedObjects] =
        useState<Options>(emptyValue)
      const [selectedClients, setSelectedClients] =
        useState<Options>(emptyValue)
      const [selectedAddresses, setSelectedAddresses] =
        useState<Options>(emptyValue)
      const [selectedRegions, setSelectedRegions] =
        useState<Options>(emptyValue)
      const [errSelectedItems, setErrSelectedItems] = useState<string>('')
      const theme = useTheme() as ITheme

      const { handleSubmit, control, reset } = useForm<AddValuesProps>({
        mode: 'onBlur',
        defaultValues: {
          list: MapNewObjectInputFields,
        },
      })
      const { errors } = useFormState({ control })
      const { fields } = useFieldArray({
        control,
        name: 'list',
      })

      const changeData = ({ list }: AddValuesProps) => {
        if (!selectedObjects) {
          setErrSelectedItems('Не выбран объект')
          return
        }
        if (!selectedAddresses) {
          setErrSelectedItems('Не выбран адрес')
          return
        }
        if (!selectedRegions) {
          setErrSelectedItems('Не выбран регион')
          setSelectedRegions(emptyValue)
          return
        }
        const newObject = {
          object: list[0].value,
          internalClientID: list[1].value,
          internalClientName: list[2].value,
          id_client: selectedClients.id,
          id_address: selectedAddresses.id,
          id_region: selectedRegions.id,
          active: true,
        }
        const isExistObject = objects.filter(item => {
          const newitem = {
            object: item.object,
            id_client: item.id_client,
            id_address: item.id_address,
            id_region: item.id_region,
            internalClientID: item.internalClientID,
            internalClientName: item.internalClientName,
            active: item.active,
          }
          return deepEqual(newitem, newObject)
        })
        if (isExistObject.length) {
          setMessage({
            text: 'Нет изменений! Такой объект уже существуeт!',
            type: 'error',
          })
          return
        }
        const id = selectedObjects.id
        changeObject({ ...newObject, id })
        handleModal(false)
      }

      const changeSelectedObject = (data: Options) => {
        if (!data) return
        setSelectedObjects(data)
        if (
          data.id &&
          selectedRegions &&
          selectedAddresses &&
          selectedClients &&
          errSelectedItems
        ) {
          setErrSelectedItems('')
        }
        const newObject = objects.find(item => item.id === data.id) as Objects
        setSelectedAddresses({
          label: newObject?.Address?.address as string,
          id: newObject.id_address,
        })
        setSelectedRegions({
          label: newObject?.Region?.region as string,
          id: newObject.id_region,
        })
        setSelectedClients({
          label: newObject?.Client?.client as string,
          id: newObject.id_client,
        })
        reset({
          list: MapNewObjectInputFields.map(data => {
            if (data.name === 'object')
              return { ...data, value: newObject.object }
            if (data.name === 'internalClientID')
              return { ...data, value: newObject.internalClientID }
            if (data.name === 'internalClientName')
              return { ...data, value: newObject.internalClientName }
            return data
          }),
        })
      }

      const changeSelectedClients = (data: Options) => {
        if (!data) return
        setSelectedClients(data)
        if (
          data.id &&
          selectedRegions &&
          selectedObjects &&
          selectedAddresses &&
          errSelectedItems
        ) {
          setErrSelectedItems('')
        }
      }

      const changeSelectedAddresses = (data: Options) => {
        if (!data) return
        setSelectedAddresses(data)
        if (
          data.id &&
          selectedRegions &&
          selectedObjects &&
          selectedClients &&
          errSelectedItems
        ) {
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
        if (
          data.id &&
          selectedAddresses &&
          selectedObjects &&
          selectedClients &&
          errSelectedItems
        ) {
          setErrSelectedItems('')
        }
      }

      const checkObjectValue = (value: string) => {
        const isNew = objects.findIndex(item => item.object === value)
        if (isNew < 0) {
          setSelectedAddresses(emptyValue)
        }
      }

      const checkClientValue = (value: string) => {
        const isNew = clients.findIndex(item => item.client === value)
        if (isNew < 0) {
          setSelectedClients(emptyValue)
        }
      }

      const checkAddressValue = (value: string) => {
        const isNew = addresses.findIndex(item => item.address === value)
        if (isNew < 0) {
          setSelectedAddresses(emptyValue)
        }
      }

      const checkRegionValue = (value: string) => {
        const isNew = regions.findIndex(item => item.region === value)
        if (isNew < 0) {
          setSelectedRegions(emptyValue)
        }
      }

      useEffect(() => {
        getObjects()
        getAddresses()
        getRegions()
        getClients()
      }, [])

      useEffect(() => {
        setListObjects(
          objects.map(item => {
            return {
              ['label']: item.object as string,
              ['id']: item.id as string,
            }
          }),
        )
      }, [objects])

      useEffect(() => {
        setListClients(
          clients.map(item => {
            return {
              ['label']: item.client as string,
              ['id']: item.id as string,
            }
          }),
        )
      }, [clients])

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
        <Box
          ref={ref}
          tabIndex={-1}
          sx={{ ...modalStyle, paddingLeft: 5 }}
          component="form"
          onSubmit={handleSubmit(changeData)}>
          <Typography variant={'h6'}>{title}</Typography>
          <DropDown
            data={listObjects}
            props={{ mt: theme.fontSize === 'small' ? 6 : 4 }}
            onChange={data => changeSelectedObject(data)}
            value={selectedObjects.label || ''}
            label="Выберите объект"
            errorLabel="Не выбран объект!"
            onBlur={text => checkObjectValue(text)}
          />
          <DropDown
            data={listClients}
            props={{ mt: theme.fontSize === 'small' ? 6 : 4 }}
            onChange={data => changeSelectedClients(data)}
            value={selectedClients.label || ''}
            label="Выберите клиента"
            errorLabel="Не выбран клиент!"
            onBlur={text => checkClientValue(text)}
          />
          <DropDown
            data={listAddresses}
            props={{ mt: theme.fontSize === 'small' ? 6 : 4 }}
            onChange={data => changeSelectedAddresses(data)}
            value={selectedAddresses.label || ''}
            label="Выберите адрес"
            errorLabel="Не выбран адрес!"
            onBlur={text => checkAddressValue(text)}
          />
          <DropDown
            data={listRegions}
            props={{ mt: theme.fontSize === 'small' ? 6 : 4 }}
            onChange={data => changeSelectedRegions(data)}
            value={selectedRegions.label || ''}
            label="Выберите регион"
            errorLabel="Не выбран регион!"
            onBlur={text => checkRegionValue(text)}
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
                    required={required ?? true}
                    sx={{
                      width: '90%',
                      height: theme.fontSize === 'small' ? 30 : 40,
                      mt:
                        index === 0
                          ? theme.fontSize === 'small'
                            ? 6
                            : 4
                          : theme.fontSize === 'small'
                            ? 5
                            : 3,
                    }}
                    margin="normal"
                    value={field.value || ''}
                    error={!!(errors?.list ?? [])[index]?.value?.message}
                    helperText={(errors?.list ?? [])[index]?.value?.message}
                  />
                )}
              />
            )
          })}
          <Box
            sx={{
              mt: 2,
              width: '100%',
              pl: 3,
            }}></Box>
          <Box sx={{ color: theme.palette.error.main, height: 20 }}>
            {errSelectedItems}
          </Box>
          <ButtonsModalSection
            closeModal={() => handleModal(false)}
            btnName={'Изменить'}
          />
        </Box>
      )
    },
  ),
)

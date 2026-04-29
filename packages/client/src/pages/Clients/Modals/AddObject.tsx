import React, { useState, useEffect, memo } from 'react'
import { Modal, Typography } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { TextField } from 'components/TextFields'
import {
  ChooseModalProps,
  AddValuesProps,
  answerModalAddAddressInObject,
} from './interfaces'
import { MapObjectInputFields } from '../data'
import { ButtonsModalSection } from 'components/Buttons'
import { DropDown, emptyOptionsDD } from 'components/DropDown'
import { useAddresses } from 'hooks/addresses/useAddresses'
import { useMessage } from 'hooks/message/useMessage'
import { Options } from 'components/DropDown/interface'
import { useObjects } from 'hooks/objects/useObjects'
import { useClients } from 'hooks/clients/useClients'
import { ModalAddAddressInObject } from './'
import { BoxModal } from 'components/MUI'

export const AddObject = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [, { setMessage }] = useMessage()
      const [{ clients }, { getClients }] = useClients()
      const [{ regions, addresses }, { getRegions, getAddresses, addAddress }] =
        useAddresses()
      const [{ objects }, { getObjects, newObject }] = useObjects()
      const [client, setClient] = useState<Options>(emptyOptionsDD)
      const [region, setRegion] = useState<Options>(emptyOptionsDD)
      const [errRegion, setErrRegion] = useState<boolean>(false)
      const [address, setAddress] = useState<Options>(emptyOptionsDD)
      const [errAddress, setErrAddress] = useState<boolean>(false)
      const [newAddressName, setNewAddress] = useState<string>('')
      const [modal, setModal] = useState<boolean>(false)
      const modalAddRef = React.createRef()

      const { handleSubmit, control } = useForm<AddValuesProps>({
        mode: 'onBlur',
        defaultValues: {
          list: MapObjectInputFields,
        },
      })
      const { errors } = useFormState({ control })
      const { fields } = useFieldArray({
        control,
        name: 'list',
      })

      const changeData = ({ list }: AddValuesProps) => {
        const isExistObject = objects.find(
          item => item.object === list[0].value,
        )
        if (isExistObject) {
          setMessage({
            text: 'Такой объект уже существуeт',
            type: 'error',
          })
          return
        }
        const isExistIntNumber = objects.find(
          item => item.internalClientID === list[1].value,
        )
        if (isExistIntNumber) {
          setMessage({
            text: 'Такой клиентский номер уже существуeт',
            type: 'error',
          })
          return
        }
        const isExistInt = objects.find(
          item => item.internalClientName === list[2].value,
        )
        if (isExistInt) {
          setMessage({
            text: 'Такое клиентское название уже существуeт',
            type: 'error',
          })
          return
        }
        newObject({
          object: list[0].value,
          internalClientID: list[1].value,
          internalClientName: list[2].value,
          id_client: client.id,
          id_address: address.id,
          id_region: region.id,
        })
        handleModal(false)
      }

      useEffect(() => {
        getClients()
        getObjects()
        getAddresses()
        getRegions()
      }, [])

      const checkAddress = (text: string) => {
        const isAddress = addresses.find(item => item.address === text)
        if (isAddress || text === '') return
        setNewAddress(text)
        setErrRegion(true)
        setErrAddress(true)
        setModal(true)
      }

      const setModalNewAddress = ({
        state,
        region,
        address,
        coordinates,
      }: answerModalAddAddressInObject) => {
        if (state) {
          setRegion(region)
          setErrRegion(false)
          setAddress(address)
          setErrAddress(false)
          addAddress({
            address: address.label,
            id_region: region.id,
            coordinates,
          })
        }
        getAddresses()
        setModal(false)
      }

      useEffect(() => {
        if (!address.id && address.label) {
          const isAddress = addresses.find(
            item => item.address === address.label,
          )
          if (isAddress) {
            setAddress({
              label: address.label,
              id: isAddress.id as string,
            })
          }
        }
      }, [addresses])

      console.log('modal = ', modal)

      return (
        <BoxModal ref={ref} tabIndex={-1}>
          <Modal
            open={modal}
            onClose={() => setModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <ModalAddAddressInObject
              handleModal={setModalNewAddress}
              ref={modalAddRef}
              question={`Вы дествительно создать новый адрес: "${newAddressName}"`}
              address={newAddressName}
            />
          </Modal>
          <BoxModal
            className={'modalMainContainer'}
            component="form"
            onSubmit={handleSubmit(changeData)}>
            <Typography variant={'h1'}>{title}</Typography>
            <DropDown
              data={clients.map(item => {
                return {
                  ['label']: item.client as string,
                  ['id']: item.id as string,
                }
              })}
              props={{ mt: 2, mb: 1 }}
              onChange={setClient}
              value={client.label}
              label="Выберите клиента"
              errorLabel="Не выбран клиент!"
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
            <DropDown
              data={addresses.map(item => {
                return {
                  ['label']: item.address as string,
                  ['id']: item.id as string,
                }
              })}
              props={{ mt: 3 }}
              onBlur={checkAddress}
              onChange={setAddress}
              value={address.label}
              label="Выберите адрес"
              errorLabel="Не выбран адрес!"
              error={errAddress}
            />
            <DropDown
              data={regions.map(item => {
                return {
                  ['label']: item.region as string,
                  ['id']: item.id as string,
                }
              })}
              props={{ mt: 4, mb: 2 }}
              onChange={setRegion}
              value={region.label}
              label="Выберите регион"
              errorLabel="Не выбран регион!"
              error={errRegion}
            />
            <ButtonsModalSection
              closeModal={() => handleModal(false)}
              btnName="Сохранить"
            />
          </BoxModal>
        </BoxModal>
      )
    },
  ),
)

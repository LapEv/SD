import React, { useState, useEffect, memo } from 'react'
import { Box, Typography } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { TextField } from 'components/TextFields'
import { AddValuesPropsTwoForms, IModalAddAddressInObject } from './interfaces'
import { MapNewAddressModalInputFields } from '../data'
import { modalStyle } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import { DropDown, emptyValue } from 'components/DropDown'
import { useAddresses } from 'hooks/addresses/useAddresses'
import { Options } from 'components/DropDown/interface'

export const ModalAddAddressInObject = memo(
  React.forwardRef<unknown, IModalAddAddressInObject>(
    ({ handleModal, question, address }: IModalAddAddressInObject, ref) => {
      const [{ regions }, { getRegions, newAddress }] = useAddresses()

      MapNewAddressModalInputFields[0].value = address
      const [region, setRegion] = useState<Options>(emptyValue)
      const { control: controlADD, handleSubmit: handleSubmitAddAddress } =
        useForm<AddValuesPropsTwoForms>({
          mode: 'onBlur',
          defaultValues: {
            list2: MapNewAddressModalInputFields,
          },
        })
      const { errors: errorsModal } = useFormState({ control: controlADD })
      const { fields: filedsModal } = useFieldArray({
        control: controlADD,
        name: 'list2',
      })

      const AddAddress = ({ list2 }: AddValuesPropsTwoForms) => {
        newAddress({
          address: list2[0].value,
          coordinates: list2[1].value,
          id_region: region.id,
        })
        handleModal({
          state: true,
          region,
          address: { label: address, id: '' },
          coordinates: list2[1].value,
        })
      }

      useEffect(() => {
        getRegions()
      }, [])

      return (
        <Box
          ref={ref}
          tabIndex={-1}
          sx={modalStyle}
          component="form"
          key={2}
          onSubmit={handleSubmitAddAddress(AddAddress)}>
          <Typography variant={'h6'}>{question}</Typography>
          <DropDown
            data={regions.map(item => {
              return {
                ['label']: item.region as string,
                ['id']: item.id as string,
              }
            })}
            props={{ mt: 3 }}
            onChange={setRegion}
            value={region.label}
            label="Выберите регион"
            errorLabel="Не выбран регион!"
          />
          <Box sx={{ mt: 2, width: '90%' }}>
            {filedsModal.map(
              ({ id, label, validation, type, required }, index) => {
                return (
                  <Controller
                    key={id}
                    control={controlADD}
                    name={`list2.${index}.value`}
                    // {...registerADD(`list2.${index}.value`)}
                    rules={validation}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        inputRef={field.ref}
                        label={label}
                        type={type}
                        variant="outlined"
                        required={required ?? true}
                        sx={{ width: '100%', mt: 2, height: 40 }}
                        margin="normal"
                        value={field.value || ''}
                        error={
                          !!(errorsModal?.list2 ?? [])[index]?.value?.message
                        }
                        helperText={
                          (errorsModal?.list2 ?? [])[index]?.value?.message
                        }
                      />
                    )}
                  />
                )
              }
            )}
          </Box>
          <ButtonsModalSection
            closeModal={() =>
              handleModal({
                state: false,
                region,
                address: { label: address, id: '' },
                coordinates: '',
              })
            }
            btnName="Сохранить"
          />
        </Box>
      )
    }
  )
)

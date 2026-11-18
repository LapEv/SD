import React, { memo } from 'react'
import { Typography } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { MultiTextField, TextField } from 'components/TextFields'
import { AddValuesProps, ChooseModalPropsContacts } from './interfaces'
import { EmptyContact, MapClientGeneralNewContactsInputFields } from '../data'
import { ButtonsModalSection } from 'components/Buttons'
import { BoxModal } from 'components/MUI'
import { useClients } from 'hooks/clients/useClients'

export const NewContact = memo(
  React.forwardRef<unknown, ChooseModalPropsContacts>(
    ({ handleModal, title, id_client }: ChooseModalPropsContacts, ref) => {
      const [, { newContact }] = useClients()

      const { handleSubmit, control } = useForm<AddValuesProps>({
        mode: 'onBlur',
        defaultValues: {
          list: MapClientGeneralNewContactsInputFields.map(data => ({
            ...data,
            value: EmptyContact[data.name as keyof typeof EmptyContact],
          })),
        },
      })
      const { errors } = useFormState({ control: control })
      const { fields } = useFieldArray({
        control: control,
        name: 'list',
      })

      const saveContact = ({ list }: AddValuesProps) => {
        newContact({
          lastName: list[0].value,
          firstName: list[1].value,
          middleName: list[2].value,
          post: list[3].value,
          phone: list[4].value,
          email: list[5].value,
          comment: list[6].value,
          id_client,
        })
        handleModal(false)
      }

      return (
        <BoxModal
          ref={ref}
          tabIndex={-1}
          className={'modalMainContainer'}
          component="form"
          onSubmit={handleSubmit(saveContact)}>
          <Typography variant={'h1'}>{title}</Typography>
          {fields.map(
            ({ id, name, label, validation, type, required }, index) => {
              return (
                <Controller
                  key={`${label}_${id}`}
                  control={control}
                  name={`list.${index}.value`}
                  rules={validation}
                  render={({ field }) =>
                    name === 'comment' ? (
                      <MultiTextField
                        {...field}
                        inputRef={field.ref}
                        label={label}
                        type={type}
                        required={required ?? true}
                        variant="outlined"
                        className={'textMultiCellsCommentContact'}
                        margin="normal"
                        multiline
                        maxRows={3}
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
